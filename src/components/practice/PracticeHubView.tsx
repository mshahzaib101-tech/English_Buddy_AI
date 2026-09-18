import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Languages,
  CheckSquare,
  Briefcase,
  Sparkles,
  Volume2,
  CheckCircle,
  XCircle,
  HelpCircle,
  ArrowRight,
  Send,
  BookmarkPlus,
  RefreshCw,
} from 'lucide-react';
import {
  UserProfile,
  CommunicationLesson,
  GrammarLesson,
  TranslationExercise,
} from '../../types';
import { COMMUNICATION_LESSONS } from '../../data/communicationLessons';
import { GRAMMAR_LESSONS } from '../../data/grammarLessons';
import { TRANSLATION_EXERCISES } from '../../data/translationExercises';
import { PRESENTATION_TOPICS, INTERVIEW_SCENARIOS } from '../../data/scenarios';
import { geminiService } from '../../services/geminiService';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storageService';

type PracticeSubTab = 'comm-skills' | 'grammar' | 'translation' | 'correct' | 'presentation' | 'interview';

interface PracticeHubViewProps {
  profile: UserProfile;
  initialSubTab?: PracticeSubTab;
}

export const PracticeHubView: React.FC<PracticeHubViewProps> = ({
  profile,
  initialSubTab = 'comm-skills',
}) => {
  const [subTab, setSubTab] = useState<PracticeSubTab>(initialSubTab);

  // Communication Skills state
  const [selectedCommLesson, setSelectedCommLesson] = useState<CommunicationLesson | null>(null);
  const [commQuizAnswer, setCommQuizAnswer] = useState<number | null>(null);

  // Grammar state
  const [selectedGrammarLesson, setSelectedGrammarLesson] = useState<GrammarLesson | null>(null);
  const [grammarQuizAnswer, setGrammarQuizAnswer] = useState<number | null>(null);

  // Translation state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [translationInput, setTranslationInput] = useState<string>('');
  const [translationResult, setTranslationResult] = useState<any | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Correct English state
  const [correctTextInput, setCorrectTextInput] = useState<string>('');
  const [correctResult, setCorrectResult] = useState<any | null>(null);
  const [isCorrecting, setIsCorrecting] = useState<boolean>(false);

  // Presentation state
  const [selectedTopic, setSelectedTopic] = useState(PRESENTATION_TOPICS[0]);
  const [presentationSpeech, setPresentationSpeech] = useState<string>('');
  const [presentationFeedback, setPresentationFeedback] = useState<any | null>(null);
  const [isAnalyzingPresentation, setIsAnalyzingPresentation] = useState<boolean>(false);

  // Interview state
  const [selectedInterview, setSelectedInterview] = useState(INTERVIEW_SCENARIOS[0]);
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState<number>(0);
  const [interviewAnswerInput, setInterviewAnswerInput] = useState<string>('');
  const [interviewFeedback, setInterviewFeedback] = useState<any | null>(null);
  const [isInterviewing, setIsInterviewing] = useState<boolean>(false);

  const currentExercise = TRANSLATION_EXERCISES[currentExerciseIndex] || TRANSLATION_EXERCISES[0];

  // Evaluate translation
  const handleEvaluateTranslation = async () => {
    if (!translationInput.trim() || isTranslating) return;
    setIsTranslating(true);
    setTranslationResult(null);

    try {
      const res = await geminiService.evaluateTranslation({
        direction: currentExercise.direction,
        sourceText: currentExercise.sourceText,
        studentAnswer: translationInput.trim(),
        expectedAnswer: currentExercise.expectedAnswer,
        level: profile.level,
      });
      setTranslationResult(res);
      storageService.addPracticeTime(2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTranslating(false);
    }
  };

  // Correct English
  const handleCorrectEnglish = async () => {
    if (!correctTextInput.trim() || isCorrecting) return;
    setIsCorrecting(true);
    setCorrectResult(null);

    try {
      const res = await geminiService.correctEnglish(correctTextInput.trim());
      setCorrectResult(res);
      storageService.addPracticeTime(1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCorrecting(false);
    }
  };

  // Submit presentation
  const handleAnalyzePresentation = async () => {
    if (!presentationSpeech.trim() || isAnalyzingPresentation) return;
    setIsAnalyzingPresentation(true);
    setPresentationFeedback(null);

    try {
      const res = await geminiService.getPresentationFeedback(
        selectedTopic.title,
        presentationSpeech.trim()
      );
      setPresentationFeedback(res);
      storageService.addPracticeTime(4);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingPresentation(false);
    }
  };

  // Submit interview answer
  const handleAnswerInterviewQuestion = async () => {
    if (!interviewAnswerInput.trim() || isInterviewing) return;
    setIsInterviewing(true);

    try {
      const res = await geminiService.answerInterviewQuestion({
        interviewType: selectedInterview.title,
        questionIndex: interviewQuestionIndex,
        studentAnswer: interviewAnswerInput.trim(),
      });
      setInterviewFeedback(res);
      storageService.addPracticeTime(2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsInterviewing(false);
    }
  };

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      {/* Sub tabs navigation */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {[
          { id: 'comm-skills' as PracticeSubTab, label: 'Communication Skills', icon: Award },
          { id: 'grammar' as PracticeSubTab, label: 'Grammar', icon: BookOpen },
          { id: 'translation' as PracticeSubTab, label: 'Urdu ↔ English', icon: Languages },
          { id: 'correct' as PracticeSubTab, label: 'Correct My English', icon: CheckSquare },
          { id: 'presentation' as PracticeSubTab, label: 'Presentations', icon: Sparkles },
          { id: 'interview' as PracticeSubTab, label: 'Interview Prep', icon: Briefcase },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSubTab(tab.id);
                setSelectedCommLesson(null);
                setSelectedGrammarLesson(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. Communication Skills (14 Lessons) */}
      {subTab === 'comm-skills' && (
        <div className="space-y-4">
          {!selectedCommLesson ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-indigo-700 text-white shadow-sm">
                <h3 className="text-base font-bold">University Communication Skills</h3>
                <p className="text-xs text-indigo-200 mt-0.5">
                  14 curriculum modules covering introductions, group discussion, emails, and viva.
                </p>
                <div className="text-[11px] text-indigo-100 mt-1 font-medium">
                  Complete university communication curriculum with guided examples, speaking tasks, and quizzes.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMMUNICATION_LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setSelectedCommLesson(lesson);
                      setCommQuizAnswer(null);
                    }}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 cursor-pointer transition-all shadow-xs flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-black">
                        {lesson.order}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {lesson.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {lesson.summary}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Selected Lesson Detail */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <button
                  onClick={() => setSelectedCommLesson(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  ← All Lessons
                </button>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded">
                  Lesson {selectedCommLesson.order} of 14
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {selectedCommLesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {selectedCommLesson.summary}
                </p>
              </div>

              {/* Urdu Explanation */}
              <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 font-urdu text-xs text-indigo-950 dark:text-indigo-200 leading-relaxed">
                {selectedCommLesson.explanationUrdu}
              </div>

              {/* Key Techniques */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Key Principles & Techniques:
                </h4>
                <div className="space-y-1.5">
                  {selectedCommLesson.keyTechniques.map((tech, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real World Scenarios: Good vs Avoid */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Classroom & Interview Comparison:
                </h4>
                <div className="space-y-2.5">
                  {selectedCommLesson.realWorldScenarios.map((sc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-1.5 text-xs">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        Situation: {sc.situation}
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span><strong>Say this:</strong> "{sc.goodPhrase}"</span>
                      </div>
                      <div className="text-rose-600 dark:text-rose-400 flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span><strong>Avoid this:</strong> "{sc.avoidPhrase}"</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu mt-1">
                        💡 {sc.urduTip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speaking Task */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Practical Speaking Task
                  </h4>
                  <button
                    onClick={() =>
                      speechService.speak(selectedCommLesson.speakingTask.sampleResponse, {
                        rate: profile.voiceSpeed,
                      })
                    }
                    className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    Hear Sample
                  </button>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  {selectedCommLesson.speakingTask.prompt}
                </p>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 italic border border-emerald-200/60 dark:border-emerald-900/40">
                  "{selectedCommLesson.speakingTask.sampleResponse}"
                </div>
              </div>

              {/* Quiz */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Knowledge Check Quiz:
                  </h4>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {selectedCommLesson.quiz.question}
                </p>

                <div className="space-y-1.5">
                  {selectedCommLesson.quiz.options.map((opt, optIdx) => {
                    const isSelected = commQuizAnswer === optIdx;
                    const isCorrect = optIdx === selectedCommLesson.quiz.correctIndex;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => setCommQuizAnswer(optIdx)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                          commQuizAnswer !== null
                            ? isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : isSelected
                              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200'
                              : 'opacity-60 border-slate-200 dark:border-slate-800'
                            : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {commQuizAnswer !== null && (
                  <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/50 font-urdu text-[11px] text-indigo-900 dark:text-indigo-200">
                    💡 {selectedCommLesson.quiz.explanationUrdu}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Grammar & Tenses (10 Lessons) */}
      {subTab === 'grammar' && (
        <div className="space-y-4">
          {!selectedGrammarLesson ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-800 to-amber-600 text-white shadow-sm">
                <h3 className="text-base font-bold">Grammar Curriculum for University Students</h3>
                <p className="text-xs text-amber-100 mt-0.5">
                  Simple explanations in Urdu with formula structures, examples, and quizzes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GRAMMAR_LESSONS.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      setSelectedGrammarLesson(lesson);
                      setGrammarQuizAnswer(null);
                    }}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all shadow-xs flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                          {lesson.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 font-urdu">
                          {lesson.summaryUrdu}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Selected Grammar Lesson */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <button
                  onClick={() => setSelectedGrammarLesson(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  ← All Grammar Topics
                </button>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/80 px-2 py-0.5 rounded">
                  {selectedGrammarLesson.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {selectedGrammarLesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {selectedGrammarLesson.explanation}
                </p>
              </div>

              {/* Urdu Explanation */}
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 font-urdu text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                {selectedGrammarLesson.summaryUrdu}
              </div>

              {/* Grammar Rules Box */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Key Grammar Rules:
                </span>
                {selectedGrammarLesson.rules.map((r, rIdx) => (
                  <div key={rIdx} className="text-xs text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-amber-700 dark:text-amber-400">• {r.rule}</span>
                    <div className="text-[11px] font-urdu text-slate-500 dark:text-slate-400 pl-3">
                      {r.explanationUrdu}
                    </div>
                  </div>
                ))}
              </div>

              {/* Examples */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  Practical University Examples:
                </h4>
                <div className="space-y-2">
                  {selectedGrammarLesson.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {ex.en}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu mt-0.5">
                          {ex.ur}
                        </div>
                      </div>
                      <button
                        onClick={() => speechService.speak(ex.en, { rate: profile.voiceSpeed })}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Student Mistakes */}
              {selectedGrammarLesson.commonMistakes.length > 0 && (
                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 text-xs space-y-2">
                  <div className="font-bold text-rose-900 dark:text-rose-200">
                    ⚠️ Common Student Mistakes:
                  </div>
                  {selectedGrammarLesson.commonMistakes.map((cm, cIdx) => (
                    <div key={cIdx} className="space-y-0.5">
                      <div className="line-through text-rose-600 dark:text-rose-400">
                        {cm.wrong}
                      </div>
                      <div className="text-emerald-700 dark:text-emerald-300 font-semibold">
                        ✓ {cm.right}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-urdu">
                        💡 {cm.explanationUrdu}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quiz */}
              {selectedGrammarLesson.quiz.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Topic Quiz:
                  </h4>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {selectedGrammarLesson.quiz[0].question}
                  </p>

                  <div className="space-y-1.5">
                    {selectedGrammarLesson.quiz[0].options.map((opt: string, optIdx: number) => {
                      const isSelected = grammarQuizAnswer === optIdx;
                      const isCorrect = optIdx === selectedGrammarLesson.quiz[0].correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => setGrammarQuizAnswer(optIdx)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all ${
                            grammarQuizAnswer !== null
                              ? isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                                : isSelected
                                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200'
                                : 'opacity-60 border-slate-200 dark:border-slate-800'
                              : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {grammarQuizAnswer !== null && (
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/50 font-urdu text-[11px] text-amber-900 dark:text-amber-200">
                      💡 {selectedGrammarLesson.quiz[0].explanationUrdu}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Urdu <-> English Translation */}
      {subTab === 'translation' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/80 px-2 py-0.5 rounded">
              {currentExercise.direction === 'urdu_to_english' ? 'Urdu to English' : 'English to Urdu'}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                Exercise {currentExerciseIndex + 1} of {TRANSLATION_EXERCISES.length}
              </span>
              <button
                onClick={() => {
                  setCurrentExerciseIndex((prev) => (prev + 1) % TRANSLATION_EXERCISES.length);
                  setTranslationInput('');
                  setTranslationResult(null);
                  setShowHint(false);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                title="Next Sentence"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div>
            <span className="text-[11px] uppercase font-bold text-slate-400">
              Translate this sentence:
            </span>
            <div className={`text-base font-bold text-slate-900 dark:text-white mt-1 ${currentExercise.direction === 'urdu_to_english' ? 'font-urdu' : ''}`}>
              "{currentExercise.sourceText}"
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Topic: {currentExercise.topic} • Level: {currentExercise.difficulty}
            </div>
          </div>

          {/* Hint button */}
          {currentExercise.hintUrdu && (
            <div>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-sky-600 dark:text-sky-400 font-semibold inline-flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Show Hint (مدد)'}</span>
              </button>
              {showHint && (
                <div className="mt-1.5 p-2 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-[11px] text-sky-900 dark:text-sky-200 font-urdu">
                  💡 {currentExercise.hintUrdu}
                </div>
              )}
            </div>
          )}

          {/* Answer input */}
          <div className="space-y-2">
            <textarea
              rows={3}
              value={translationInput}
              onChange={(e) => setTranslationInput(e.target.value)}
              placeholder={currentExercise.direction === 'urdu_to_english' ? 'Type the English translation...' : 'اردو ترجمہ یہاں لکھیں...'}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleEvaluateTranslation}
              disabled={!translationInput.trim() || isTranslating}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTranslating ? 'Evaluating...' : 'Check Translation'}</span>
            </button>
          </div>

          {/* Translation Result Card */}
          {translationResult && (
            <div className={`p-4 rounded-xl border space-y-2 text-xs animate-fade-in ${
              translationResult.isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`font-bold flex items-center gap-1.5 ${
                  translationResult.isCorrect ? 'text-emerald-800 dark:text-emerald-300' : 'text-amber-800 dark:text-amber-300'
                }`}>
                  {translationResult.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
                  {translationResult.feedback}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-inherit">
                  Score: {translationResult.scorePercent}%
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Natural Reference:</span>
                <p className="font-semibold text-slate-900 dark:text-white">
                  "{translationResult.naturalCorrection}"
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 font-urdu text-[11px] text-slate-800 dark:text-slate-200">
                💡 {translationResult.explanationUrdu}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Correct My English Mode */}
      {subTab === 'correct' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              "Correct My English" Diagnostic Tool
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Paste or write any sentence you wrote for an assignment, email, or chat. Alex will correct it gently with Urdu explanation.
            </p>
          </div>

          <div className="space-y-2">
            <textarea
              rows={3}
              value={correctTextInput}
              onChange={(e) => setCorrectTextInput(e.target.value)}
              placeholder="e.g. Yesterday I am go to university and discuss about project..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleCorrectEnglish}
              disabled={!correctTextInput.trim() || isCorrecting}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isCorrecting ? 'Analyzing...' : 'Gently Correct & Explain'}</span>
            </button>
          </div>

          {correctResult && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs animate-fade-in">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Original Sentence:</span>
                <p className="text-rose-600 dark:text-rose-400 line-through">
                  "{correctResult.originalText}"
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Natural Corrected Version:</span>
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold">
                  <span>"{correctResult.correctedText}"</span>
                  <button
                    onClick={() => speechService.speak(correctResult.correctedText, { rate: profile.voiceSpeed })}
                    className="p-1 hover:text-emerald-700"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-urdu text-[11px] text-indigo-950 dark:text-indigo-200 leading-relaxed">
                💡 {correctResult.explanationUrdu}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Example Sentence:</span>
                <p className="text-slate-700 dark:text-slate-300 italic mt-0.5">
                  "{correctResult.exampleSentence}"
                </p>
              </div>

              <button
                onClick={() => {
                  storageService.recordMistake({
                    originalText: correctResult.originalText,
                    correctedText: correctResult.correctedText,
                    explanationUrdu: correctResult.explanationUrdu,
                    topic: correctResult.grammarTopic || 'Sentence Structure',
                  });
                  alert('Added to your Saved Mistakes list for future review!');
                }}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-1"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Save to My Weak Areas List</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Presentation Practice */}
      {subTab === 'presentation' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Classroom Presentation Simulator
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Practice delivering short 1-2 minute academic speeches. Get feedback on clarity, structure, and vocabulary.
            </p>
          </div>

          {/* Topic selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {PRESENTATION_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic);
                  setPresentationFeedback(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTopic.id === topic.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          {/* Topic Guide */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white">
              Outline for "{selectedTopic.title}":
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-300">
              {selectedTopic.outline.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Useful signpost: </span>
              <span className="italic text-emerald-700 dark:text-emerald-400">"{selectedTopic.usefulPhrases[0]?.en}"</span>
            </div>
          </div>

          {/* Speech text input */}
          <div className="space-y-2">
            <textarea
              rows={4}
              value={presentationSpeech}
              onChange={(e) => setPresentationSpeech(e.target.value)}
              placeholder="Type your presentation speech here, or dictate it..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleAnalyzePresentation}
              disabled={!presentationSpeech.trim() || isAnalyzingPresentation}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzingPresentation ? 'Analyzing Delivery...' : 'Get Presentation Feedback'}</span>
            </button>
          </div>

          {/* Presentation Feedback Card */}
          {presentationFeedback && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs animate-fade-in">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Clarity & Organization:</span>
                <p className="font-bold text-emerald-700 dark:text-emerald-400">
                  {presentationFeedback.clarityRating}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Key Strengths:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 mt-0.5">
                  {presentationFeedback.strengths.map((str: string, idx: number) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              {presentationFeedback.vocabularyEnhancements?.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Vocabulary Upgrades:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {presentationFeedback.vocabularyEnhancements.map((v: any, idx: number) => (
                      <span key={idx} className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200">
                        "{v.original}" → <strong>"{v.better}"</strong>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 font-urdu text-[11px] text-slate-800 dark:text-slate-200 leading-relaxed">
                💡 {presentationFeedback.overallTipsUrdu}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Interview & Viva Prep */}
      {subTab === 'interview' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Job, Internship & Viva Mock Interview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Practice answering real interview questions step-by-step with constructive feedback.
            </p>
          </div>

          {/* Scenario tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {INTERVIEW_SCENARIOS.map((int) => (
              <button
                key={int.id}
                onClick={() => {
                  setSelectedInterview(int);
                  setInterviewQuestionIndex(0);
                  setInterviewFeedback(null);
                  setInterviewAnswerInput('');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedInterview.id === int.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {int.title}
              </button>
            ))}
          </div>

          {/* Current Question */}
          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400">
                Question {interviewQuestionIndex + 1} of {selectedInterview.questions.length}
              </span>
              <button
                onClick={() =>
                  speechService.speak(selectedInterview.questions[interviewQuestionIndex], {
                    rate: profile.voiceSpeed,
                  })
                }
                className="text-xs text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen
              </button>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              "{selectedInterview.questions[interviewQuestionIndex]}"
            </p>
          </div>

          {/* Answer Input */}
          <div className="space-y-2">
            <textarea
              rows={3}
              value={interviewAnswerInput}
              onChange={(e) => setInterviewAnswerInput(e.target.value)}
              placeholder="Speak or type your answer to the interviewer..."
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              onClick={handleAnswerInterviewQuestion}
              disabled={!interviewAnswerInput.trim() || isInterviewing}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isInterviewing ? 'Evaluating Answer...' : 'Submit Answer'}</span>
            </button>
          </div>

          {/* Interview Feedback */}
          {interviewFeedback && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs animate-fade-in">
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong>Feedback:</strong> {interviewFeedback.evalPraise}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Professional Wording:</span>
                <p className="font-semibold text-slate-900 dark:text-white mt-0.5">
                  "{interviewFeedback.betterWording}"
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 font-urdu text-[11px] text-indigo-900 dark:text-indigo-200">
                💡 {interviewFeedback.explanationUrdu}
              </div>

              {interviewQuestionIndex < selectedInterview.questions.length - 1 ? (
                <button
                  onClick={() => {
                    setInterviewQuestionIndex((prev) => prev + 1);
                    setInterviewAnswerInput('');
                    setInterviewFeedback(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="p-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  🎉 All interview questions completed! Great practice!
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
