import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  HelpCircle,
  Plus,
  Flame,
} from 'lucide-react';
import {
  UserProfile,
  ConversationMessage,
  ConversationSession,
  RoleplayScenario,
} from '../../types';
import { speechService, MicState } from '../../services/speechService';
import { geminiService } from '../../services/geminiService';
import { storageService } from '../../services/storageService';
import { CONVERSATION_SCENARIOS, ROLEPLAY_SCENARIOS } from '../../data/scenarios';

interface VoiceConversationViewProps {
  profile: UserProfile;
  initialScenarioId?: string;
  onSessionEnded: () => void;
}

export const VoiceConversationView: React.FC<VoiceConversationViewProps> = ({
  profile,
  initialScenarioId,
  onSessionEnded,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    initialScenarioId || 'sc-uni-1'
  );
  const [isRoleplay, setIsRoleplay] = useState<boolean>(false);
  const [selectedRoleplayId, setSelectedRoleplayId] = useState<string>('rp-1');

  // Conversation state
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [interimText, setInterimText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [micState, setMicState] = useState<MicState>('Ready');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState<boolean>(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState<boolean>(profile.autoPlayVoice);
  const [audioSpeed, setAudioSpeed] = useState<number>(profile.voiceSpeed || 0.9);

  // Session duration timer
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [sessionFeedback, setSessionFeedback] = useState<any | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<any>(null);

  const currentScenario = CONVERSATION_SCENARIOS.find((s) => s.id === selectedScenarioId);
  const currentRoleplay = ROLEPLAY_SCENARIOS.find((r) => r.id === selectedRoleplayId);

  // Check speech recognition capability on mount
  useEffect(() => {
    const supported = speechService.isRecognitionSupported();
    setIsSpeechSupported(supported);

    // Initialize initial greeting
    startNewConversation(selectedScenarioId, isRoleplay, selectedRoleplayId);

    return () => {
      speechService.stopListening();
      speechService.stopSpeaking();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer for session duration
  useEffect(() => {
    if (sessionActive) {
      timerRef.current = setInterval(() => {
        setSessionDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [sessionActive]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimText, isProcessing]);

  const startNewConversation = (scenarioId: string, roleplayMode: boolean, roleplayId: string) => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setMicState('Ready');
    setSessionDuration(0);
    setSessionActive(true);
    setSessionFeedback(null);
    setShowFeedbackModal(false);

    let initialMsg: ConversationMessage;

    if (roleplayMode) {
      const rp = ROLEPLAY_SCENARIOS.find((r) => r.id === roleplayId) || ROLEPLAY_SCENARIOS[0];
      initialMsg = {
        id: 'msg-start',
        sender: 'tutor',
        text: rp.firstAiMessage,
        timestamp: Date.now(),
      };
    } else {
      const sc = CONVERSATION_SCENARIOS.find((s) => s.id === scenarioId) || CONVERSATION_SCENARIOS[0];
      initialMsg = {
        id: 'msg-start',
        sender: 'tutor',
        text: sc.starterPrompt,
        timestamp: Date.now(),
      };
    }

    setMessages([initialMsg]);

    if (autoPlayAudio) {
      speechService.speak(initialMsg.text, {
        rate: audioSpeed,
        onStart: () => setMicState('AI Speaking'),
        onEnd: () => setMicState('Ready'),
      });
    }
  };

  // Toggle Mic
  const handleToggleMic = () => {
    if (micState === 'Listening') {
      speechService.stopListening();
      setMicState('Ready');
      if (interimText.trim()) {
        handleSendMessage(interimText.trim());
        setInterimText('');
      }
      return;
    }

    if (micState === 'AI Speaking') {
      speechService.stopSpeaking();
      setMicState('Ready');
    }

    setSpeechError(null);
    const initialized = speechService.initRecognition(
      (transcript, isFinal) => {
        setInterimText(transcript);
        if (isFinal && transcript.trim().length > 2) {
          speechService.stopListening();
          setMicState('Processing');
          handleSendMessage(transcript.trim());
          setInterimText('');
        }
      },
      (errorMsg) => {
        setSpeechError(errorMsg);
        setMicState('Error');
      },
      () => {
        setMicState((prev) => (prev === 'Listening' ? 'Ready' : prev));
      }
    );

    if (initialized) {
      const started = speechService.startListening();
      if (started) {
        setMicState('Listening');
      }
    } else {
      setSpeechError('Microphone not supported in this browser environment. You can type freely!');
      setMicState('Error');
    }
  };

  // Send message to Gemini
  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isProcessing) return;

    speechService.stopSpeaking();

    const studentMessage: ConversationMessage = {
      id: 'student-' + Date.now(),
      sender: 'student',
      text: userText.trim(),
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, studentMessage];
    setMessages(updatedHistory);
    setInputText('');
    setInterimText('');
    setIsProcessing(true);
    setMicState('Processing');

    try {
      const res = await geminiService.sendChatMessage({
        messages: updatedHistory.map((m) => ({ sender: m.sender, text: m.text })),
        scenario: isRoleplay ? currentRoleplay?.title : currentScenario?.title,
        roleplay: isRoleplay ? currentRoleplay?.systemPromptAddon : undefined,
        studentLevel: profile.level,
        explanationLang: profile.explanationLang,
        correctionFrequency: profile.correctionFrequency,
      });

      const tutorMessage: ConversationMessage = {
        id: 'tutor-' + Date.now(),
        sender: 'tutor',
        text: res.reply,
        correction: res.correction || undefined,
        explanationUrdu: res.explanationUrdu || undefined,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, tutorMessage]);

      // If there was a correction, auto-record in student's mistakes log
      if (res.correction && res.explanationUrdu) {
        storageService.recordMistake({
          originalText: userText,
          correctedText: res.correction,
          explanationUrdu: res.explanationUrdu,
          topic: isRoleplay ? currentRoleplay?.title || 'Speaking' : currentScenario?.title || 'Conversation',
        });
      }

      if (autoPlayAudio) {
        speechService.speak(res.reply, {
          rate: audioSpeed,
          onStart: () => setMicState('AI Speaking'),
          onEnd: () => setMicState('Ready'),
        });
      } else {
        setMicState('Ready');
      }
    } catch (err) {
      console.error(err);
      setMicState('Ready');
    } finally {
      setIsProcessing(false);
    }
  };

  // End Session & Generate Feedback
  const handleEndSession = async () => {
    speechService.stopSpeaking();
    speechService.stopListening();
    setSessionActive(false);
    setIsProcessing(true);

    try {
      const summary = await geminiService.getSessionSummary({
        messages,
        scenario: isRoleplay ? currentRoleplay?.title || 'Roleplay' : currentScenario?.title || 'Speaking',
        studentLevel: profile.level,
      });

      setSessionFeedback(summary);
      setShowFeedbackModal(true);

      // Save session to storage
      const sessionObj: ConversationSession = {
        id: 'sess-' + Date.now(),
        title: isRoleplay ? currentRoleplay?.title || 'Roleplay' : currentScenario?.title || 'Speaking Session',
        scenario: currentScenario?.title || 'General',
        roleplay: isRoleplay ? currentRoleplay?.title : undefined,
        durationSeconds: Math.max(20, sessionDuration),
        timestamp: Date.now(),
        messages,
        feedback: summary,
      };

      storageService.addSession(sessionObj);
      onSessionEnded();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-135px)] max-h-[850px] bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Top Bar: Scenario Selector & Session Stats */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          {/* Mode Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setIsRoleplay(false);
                startNewConversation(selectedScenarioId, false, selectedRoleplayId);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                !isRoleplay
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Scenarios
            </button>
            <button
              onClick={() => {
                setIsRoleplay(true);
                startNewConversation(selectedScenarioId, true, selectedRoleplayId);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                isRoleplay
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Roleplay
            </button>
          </div>

          {/* Dropdown for Scenarios or Roleplays */}
          {!isRoleplay ? (
            <select
              value={selectedScenarioId}
              onChange={(e) => {
                setSelectedScenarioId(e.target.value);
                startNewConversation(e.target.value, false, selectedRoleplayId);
              }}
              className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1.5 rounded-xl border-none focus:ring-1 focus:ring-emerald-500 truncate max-w-[170px] sm:max-w-xs"
            >
              {CONVERSATION_SCENARIOS.map((sc) => (
                <option key={sc.id} value={sc.id}>
                  {sc.title} ({sc.category})
                </option>
              ))}
            </select>
          ) : (
            <select
              value={selectedRoleplayId}
              onChange={(e) => {
                setSelectedRoleplayId(e.target.value);
                startNewConversation(selectedScenarioId, true, e.target.value);
              }}
              className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1.5 rounded-xl border-none focus:ring-1 focus:ring-emerald-500 truncate max-w-[170px] sm:max-w-xs"
            >
              {ROLEPLAY_SCENARIOS.map((rp) => (
                <option key={rp.id} value={rp.id}>
                  {rp.title} ({rp.aiRole})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Right side controls: Audio toggle, Speed, Timer & End Session */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={() => {
              setAutoPlayAudio(!autoPlayAudio);
              if (autoPlayAudio) speechService.stopSpeaking();
            }}
            className={`p-1.5 rounded-lg border text-xs transition-colors ${
              autoPlayAudio
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={autoPlayAudio ? 'Voice is ON' : 'Voice is Muted'}
          >
            {autoPlayAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Speed selector */}
          <select
            value={audioSpeed}
            onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
            className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-1 rounded-lg border-none focus:ring-0"
            title="Speech Speed"
          >
            <option value={0.75}>0.75x (Slow)</option>
            <option value={0.9}>0.9x (Natural)</option>
            <option value={1.0}>1.0x (Normal)</option>
            <option value={1.15}>1.15x (Fast)</option>
          </select>

          {/* Timer */}
          <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
            {formatTime(sessionDuration)}
          </div>

          {/* Finish button */}
          <button
            onClick={handleEndSession}
            disabled={messages.length <= 1 || isProcessing}
            className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
          >
            End
          </button>
        </div>
      </div>

      {/* Context banner with Urdu tip */}
      <div className="px-4 py-2 bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="truncate">
            {isRoleplay ? currentRoleplay?.setting : currentScenario?.contextUrdu}
          </span>
        </div>
        <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-urdu whitespace-nowrap ml-2">
          {isRoleplay ? currentRoleplay?.urduTip : 'آرام سے بولیں، غلطی سے نہ ڈریں!'}
        </div>
      </div>

      {/* Chat messages viewport */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isStudent = msg.sender === 'student';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'} max-w-full`}
            >
              <div
                className={`rounded-2xl px-4 py-3 max-w-[88%] sm:max-w-[80%] shadow-sm ${
                  isStudent
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1 opacity-75 text-[10px]">
                  <span>{isStudent ? 'You' : isRoleplay ? currentRoleplay?.aiRole : 'Alex (AI Tutor)'}</span>
                  {!isStudent && (
                    <button
                      onClick={() =>
                        speechService.speak(msg.text, {
                          rate: audioSpeed,
                          onStart: () => setMicState('AI Speaking'),
                          onEnd: () => setMicState('Ready'),
                        })
                      }
                      className="p-1 hover:text-emerald-600 dark:hover:text-emerald-400"
                      title="Listen again"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* Gentle Correction Card (if available for tutor response) */}
              {msg.correction && (
                <div className="mt-2 max-w-[90%] sm:max-w-[85%] rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 shadow-xs animate-fade-in text-xs">
                  <div className="flex items-center justify-between gap-2 text-amber-900 dark:text-amber-300 font-bold mb-1">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Helpful Rephrase (بہتر انداز)
                    </span>
                    <button
                      onClick={() =>
                        speechService.speak(msg.correction!, { rate: audioSpeed })
                      }
                      className="text-[10px] font-semibold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      Listen
                    </button>
                  </div>

                  <div className="p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/40 text-slate-800 dark:text-slate-100 font-medium">
                    "{msg.correction}"
                  </div>

                  {msg.explanationUrdu && (
                    <div className="mt-1.5 text-[11px] text-amber-800 dark:text-amber-300 font-urdu leading-normal">
                      💡 {msg.explanationUrdu}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Interim / In-progress speech preview */}
        {interimText && (
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-br-none px-4 py-2.5 bg-emerald-100/70 dark:bg-emerald-950/50 border border-emerald-300/60 text-emerald-900 dark:text-emerald-100 text-xs italic">
              Listening: "{interimText}"...
            </div>
          </div>
        )}

        {/* Processing animation */}
        {isProcessing && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>Alex is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Speech capability notice or error */}
      {speechError && (
        <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/50 border-t border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{speechError}</span>
          </div>
          <button
            onClick={() => setSpeechError(null)}
            className="text-[10px] font-bold underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Interactive Bottom Control Section */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
        {/* State Indicator */}
        <div className="flex items-center justify-between text-[11px] px-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                micState === 'Listening'
                  ? 'bg-rose-500 animate-ping'
                  : micState === 'AI Speaking'
                  ? 'bg-teal-500 animate-pulse'
                  : micState === 'Processing'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
              }`}
            />
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Status: {micState}
            </span>
          </div>

          <span className="text-slate-400 font-urdu text-[10px]">
            {micState === 'Listening'
              ? 'مائیک فعال ہے، بولیں...'
              : micState === 'AI Speaking'
              ? 'الیکس بول رہا ہے...'
              : 'مائیک دبائیں یا ٹائپ کریں'}
          </span>
        </div>

        {/* Input Bar with Mic button & text send */}
        <div className="flex items-center gap-2">
          {/* Big Circular Mic Button */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 shadow-sm ${
              micState === 'Listening'
                ? 'bg-rose-600 text-white animate-pulse shadow-rose-500/40 ring-4 ring-rose-200 dark:ring-rose-950'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 shadow-emerald-500/30'
            }`}
            title={micState === 'Listening' ? 'Click to stop listening' : 'Click to speak'}
          >
            {micState === 'Listening' ? (
              <Square className="w-5 h-5 fill-current" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          {/* Text input with send button */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(inputText);
                }
              }}
              placeholder="Or type your English response here..."
              disabled={isProcessing}
              className="w-full pl-3.5 pr-10 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim() || isProcessing}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Session Feedback & Progress Modal */}
      {showFeedbackModal && sessionFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Speaking Session Summary
                </h3>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-full">
                {sessionFeedback.scoreIndicator}
              </div>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {/* Encouragement */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Well Done!</strong> {sessionFeedback.praise}
              </div>

              {/* Urdu summary */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-urdu text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {sessionFeedback.urduSummary}
              </div>

              {/* Grammar Points to Remember */}
              {sessionFeedback.grammarReview && sessionFeedback.grammarReview.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Key Grammar Points from this Conversation:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {sessionFeedback.grammarReview.map((pt: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Vocabulary to Remember */}
              {sessionFeedback.vocabularySuggestions && sessionFeedback.vocabularySuggestions.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Suggested Words to Adopt:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionFeedback.vocabularySuggestions.map((w: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold"
                      >
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  startNewConversation(selectedScenarioId, isRoleplay, selectedRoleplayId);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Practice Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
