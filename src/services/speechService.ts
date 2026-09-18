// Browser speech recognition and synthesis service with transparent capability detection

// Type declaration for webkit speech recognition
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export type MicState = 'Ready' | 'Listening' | 'Processing' | 'AI Speaking' | 'Paused' | 'Error';

class SpeechService {
  private recognition: any = null;
  private isListening: boolean = false;
  private audioCtx: AudioContext | null = null;

  public isRecognitionSupported(): boolean {
    const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
    return !!(win && (win.SpeechRecognition || win.webkitSpeechRecognition));
  }

  public isSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public initRecognition(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.isRecognitionSupported()) {
      return false;
    }

    const win = window as unknown as IWindow;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const text = finalTranscript || interimTranscript;
        if (text) {
          onResult(text.trim(), !!finalTranscript);
        }
      };

      this.recognition.onerror = (event: any) => {
        let msg = 'Microphone or speech recognition error.';
        if (event.error === 'not-allowed') {
          msg = 'Microphone permission was denied. Please allow microphone access in browser settings.';
        } else if (event.error === 'no-speech') {
          msg = 'No speech was detected. Please try speaking closer to the microphone.';
        } else if (event.error === 'network') {
          msg = 'Network error occurred during speech recognition.';
        }
        onError(msg);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      return true;
    } catch (e: any) {
      onError('Failed to initialize speech recognition: ' + (e.message || 'unknown error'));
      return false;
    }
  }

  public startListening(): boolean {
    if (!this.recognition) return false;
    try {
      this.playChime(520, 0.1);
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (e) {
      console.warn('Speech recognition start failed or already running', e);
      return false;
    }
  }

  public stopListening(): void {
    if (!this.recognition) return;
    try {
      this.recognition.stop();
      this.playChime(380, 0.1);
      this.isListening = false;
    } catch (e) {
      console.warn('Speech recognition stop error', e);
    }
  }

  public speak(
    text: string,
    options: {
      rate?: number;
      pitch?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): void {
    if (!this.isSynthesisSupported()) {
      if (options.onEnd) options.onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // cancel prior speech

      // Strip out markdown or formatting for clean pronunciation
      const cleanText = text
        .replace(/[*_#`~]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = options.rate ?? 0.9; // gently paced for language learners
      utterance.pitch = options.pitch ?? 1.0;
      utterance.lang = 'en-US';

      // Pick high quality English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) && !v.name.includes('Google')
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        if (options.onStart) options.onStart();
      };

      utterance.onend = () => {
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error', e);
        if (options.onError) options.onError(e);
        if (options.onEnd) options.onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis exception', e);
      if (options.onError) options.onError(e);
      if (options.onEnd) options.onEnd();
    }
  }

  public stopSpeaking(): void {
    if (this.isSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  }

  // Subtle web audio chime for mic feedback
  public playChime(frequency: number = 440, duration: number = 0.12): void {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {}
  }
}

export const speechService = new SpeechService();
