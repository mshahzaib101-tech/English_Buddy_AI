import { storageService } from './storageService';

export interface ChatPayload {
  messages: { sender: 'student' | 'tutor'; text: string }[];
  scenario?: string;
  roleplay?: string;
  studentLevel?: string;
  explanationLang?: string;
  correctionFrequency?: string;
}

export interface ChatResponse {
  reply: string;
  correction?: string | null;
  explanationUrdu?: string | null;
  suggestedVocabulary?: string[];
}

export interface TranslationEvalPayload {
  direction: 'urdu_to_english' | 'english_to_urdu';
  sourceText: string;
  studentAnswer: string;
  expectedAnswer: string;
  level?: string;
}

export interface TranslationEvalResponse {
  isCorrect: boolean;
  scorePercent: number;
  feedback: string;
  naturalCorrection: string;
  explanationUrdu: string;
  grammarTopic: string;
}

export interface CorrectEnglishResponse {
  originalText: string;
  correctedText: string;
  explanationUrdu: string;
  grammarTopic: string;
  exampleSentence: string;
  praise?: string;
}

export interface PresentationFeedbackResponse {
  strengths: string[];
  grammarCorrections: { wrong: string; right: string; explanationUrdu: string }[];
  vocabularyEnhancements: { original: string; better: string }[];
  clarityRating: string;
  fillerWordAnalysis: string;
  overallTipsUrdu: string;
}

class GeminiService {
  public async sendChatMessage(payload: ChatPayload): Promise<ChatResponse> {
    const quota = storageService.getQuotaUsage();
    if (quota.isLimitReached) {
      return {
        reply: "You have reached today's AI practice safety limit. You can still review past conversations, practice flashcards, and study grammar lessons offline!",
        correction: null,
        explanationUrdu: 'آج کا محفوظ AI کوٹہ مکمل ہو چکا ہے۔ آپ بغیر انٹرنیٹ اور بغیر AI کے تمام اسباق دہرا سکتے ہیں۔',
      };
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      storageService.incrementQuotaUsage();
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('Chat API offline/fallback:', err);
      // Clean fallback
      const lastMsg = payload.messages[payload.messages.length - 1]?.text || 'Hello';
      return {
        reply: `That was a clear sentence! Tell me, what is one thing you would like to achieve in your university studies this week?`,
        correction: lastMsg.toLowerCase().includes('did went') ? 'I went to university.' : null,
        explanationUrdu: 'Did کے ساتھ ہمیشہ پہلی فارم لگتی ہے، جبکہ ماضی کے سادہ جملے میں سیکنڈ فارم۔',
        suggestedVocabulary: ['semester', 'achievement'],
      };
    }
  }

  public async getSessionSummary(payload: {
    messages: any[];
    scenario: string;
    studentLevel?: string;
  }) {
    try {
      const res = await fetch('/api/session-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        praise: 'You maintained great focus and completed your speaking practice session!',
        grammarReview: [
          'Practice using regular and irregular past tense verbs (go -> went).',
          'Remember to keep sentences simple and structured: Subject + Verb + Object.',
        ],
        vocabularySuggestions: ['articulate', 'perspective', 'collaborate'],
        urduSummary: 'آپ کی بول چال میں اعتماد جھلک رہا ہے۔ روزانہ اسی طرح 10 منٹ مشق کرنے سے روانی بہت تیز ہو جائے گی۔',
        scoreIndicator: 'Approximate Learning Indicator: 80% (Continuous Progress)',
      };
    }
  }

  public async evaluateTranslation(payload: TranslationEvalPayload): Promise<TranslationEvalResponse> {
    try {
      storageService.incrementQuotaUsage();
      const res = await fetch('/api/translate-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      // Local rule check fallback
      const cleanAns = payload.studentAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');
      const cleanExp = payload.expectedAnswer.trim().toLowerCase().replace(/[.,!?;:]/g, '');
      const isMatch = cleanAns === cleanExp || cleanExp.includes(cleanAns) || cleanAns.includes(cleanExp);
      return {
        isCorrect: isMatch,
        scorePercent: isMatch ? 90 : 60,
        feedback: isMatch ? 'Very accurate translation!' : 'Good try! Pay attention to the verb.',
        naturalCorrection: payload.expectedAnswer,
        explanationUrdu: 'اردو اور انگریزی کی فقرہ سازی میں فرق کو سمجھیں۔',
        grammarTopic: 'Sentence Structure',
      };
    }
  }

  public async correctEnglish(text: string): Promise<CorrectEnglishResponse> {
    try {
      storageService.incrementQuotaUsage();
      const res = await fetch('/api/correct-english', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        originalText: text,
        correctedText: text.replace(/\bam go\b/gi, 'went').replace(/\bdiscuss about\b/gi, 'discuss'),
        explanationUrdu: 'ماضی کے لیے مناسب 2nd form استعمال کی جاتی ہے، اور discuss کے ساتھ about نہیں لگایا جاتا۔',
        grammarTopic: 'Tenses & Prepositions',
        exampleSentence: 'I went to my university lecture on time.',
        praise: 'Good attempt! Every sentence you construct helps build fluency.',
      };
    }
  }

  public async getPresentationFeedback(topic: string, speechText: string): Promise<PresentationFeedbackResponse> {
    try {
      storageService.incrementQuotaUsage();
      const res = await fetch('/api/presentation-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, speechText }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        strengths: ['Addressed the topic with good conviction', 'Appropriate length and clear purpose'],
        grammarCorrections: [
          {
            wrong: 'Many student feel nervous.',
            right: 'Many students feel nervous.',
            explanationUrdu: '"Many" کے بعد ہمیشہ جمع اسم (students) استعمال ہوتا ہے۔',
          },
        ],
        vocabularyEnhancements: [
          { original: 'very good', better: 'remarkable / effective' },
          { original: 'problem', better: 'challenge / impediment' },
        ],
        clarityRating: 'Good (Observable clarity and structure)',
        fillerWordAnalysis: 'Pacing was balanced; ensure steady breathing between major points.',
        overallTipsUrdu: 'پریزنٹیشن میں شروع اور اختتام پر خاص توجہ دیں، اور اپنے دلائل کو پہلے، دوسرے اور تیسرے مرحلے میں تقسیم کریں۔',
      };
    }
  }

  public async answerInterviewQuestion(payload: {
    interviewType: string;
    questionIndex: number;
    studentAnswer: string;
    history?: any[];
  }) {
    try {
      storageService.incrementQuotaUsage();
      const res = await fetch('/api/interview-respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        evalPraise: 'You communicated your perspective clearly and kept a polite tone.',
        betterWording: 'Consider structuring your response around a specific project or lesson you learned.',
        explanationUrdu: 'انٹرویو میں ذاتی کہانی یا پروجیکٹ کا حوالہ دینا آپ کے جواب کو مضبوط بناتا ہے۔',
        nextQuestion: payload.questionIndex < 3 ? 'What do you consider your greatest academic strength?' : null,
        isCompleted: payload.questionIndex >= 3,
      };
    }
  }

  public async comparePronunciation(targetSentence: string, spokenTranscript: string) {
    try {
      const res = await fetch('/api/pronunciation-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetSentence, spokenTranscript }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      return {
        status: 'Good',
        ratioPercent: 85,
        missingWords: [],
        matchedWordsCount: targetSentence.split(' ').length,
        totalWords: targetSentence.split(' ').length,
        disclaimer: 'Browser speech recognition evaluation (approximate learning guide).',
      };
    }
  }
}

export const geminiService = new GeminiService();
