export type EnglishLevel = 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate';
export type StudentLevel = EnglishLevel;

export type LearningGoal =
  | 'speaking'
  | 'grammar'
  | 'vocabulary'
  | 'communication_skills'
  | 'interview'
  | 'presentation'
  | 'university_english'
  | 'general_english';
export type StudentGoal = LearningGoal;

export type ExplanationLanguage = 'urdu' | 'english' | 'both';

export type DailyTargetMinutes = number;

export type CorrectionFrequency = 'minimal' | 'normal' | 'detailed';

export type AppTheme = 'light' | 'dark' | 'system';

export type ActiveTab = 'home' | 'speak' | 'practice' | 'vocabulary' | 'progress' | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  isDemo?: boolean;
  level: EnglishLevel;
  goal: LearningGoal;
  explanationLang: ExplanationLanguage;
  dailyTarget: DailyTargetMinutes;
  voiceSpeed: number; // 0.8, 1.0, 1.2
  autoPlayVoice: boolean;
  correctionFrequency: CorrectionFrequency;
  theme: AppTheme;
  createdAt: number;
}

export interface PracticeStreak {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  minutesToday: number;
  sessionsCompletedToday: number;
  dailyHistory: Record<string, number>; // date string -> minutes spent
}

export interface VocabularyWord {
  id: string;
  word: string;
  urduMeaning: string;
  definition: string;
  example: string;
  pronunciation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isLearned: boolean;
  needsReview: boolean;
  reviewCount: number;
  lastReviewedAt?: number;
  userCreated?: boolean;
}

export interface MistakeRecord {
  id: string;
  originalText: string;
  correctedText: string;
  explanationUrdu: string;
  topic: string;
  count: number;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'tutor';
  text: string;
  correction?: string;
  explanationUrdu?: string;
  timestamp: number;
}
export type ConversationMessage = ChatMessage;

export interface RoleplayScenario {
  id: string;
  title: string;
  studentRole: string;
  aiRole: string;
  setting: string;
  systemPromptAddon: string;
  firstAiMessage: string;
  urduTip: string;
}

export interface SessionFeedback {
  praise: string;
  grammarReview: string[];
  vocabularySuggestions: string[];
  urduSummary: string;
  scoreIndicator: string; // e.g. "Solid effort • 4 new words used"
}

export interface ConversationSession {
  id: string;
  title: string;
  scenario: string;
  roleplay?: string;
  messages: ChatMessage[];
  feedback?: SessionFeedback;
  durationSeconds: number;
  timestamp: number;
}

export interface TranslationExercise {
  id: string;
  direction: 'urdu_to_english' | 'english_to_urdu';
  sourceText: string;
  expectedAnswer: string;
  alternatives: string[];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanationUrdu: string;
  hintUrdu?: string;
}

export interface GrammarLesson {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: EnglishLevel;
  summaryUrdu: string;
  explanation: string;
  rules: { rule: string; explanationUrdu: string }[];
  examples: { en: string; ur: string }[];
  commonMistakes: {
    wrong: string;
    right: string;
    explanationUrdu: string;
  }[];
  quiz: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanationUrdu: string;
  }[];
  practicePrompts: string[];
}

export interface CommunicationLesson {
  id: string;
  order: number;
  title: string;
  summary: string;
  explanationUrdu: string;
  keyTechniques: string[];
  realWorldScenarios: {
    situation: string;
    goodPhrase: string;
    avoidPhrase: string;
    urduTip: string;
  }[];
  speakingTask: {
    prompt: string;
    outline: string[];
    sampleResponse: string;
  };
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationUrdu: string;
  };
}

export interface PresentationTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  suggestedDuration: string;
  outline: string[];
  usefulPhrases: { en: string; ur: string }[];
}

export interface InterviewScenario {
  id: string;
  type: 'university' | 'internship' | 'job' | 'scholarship';
  title: string;
  description: string;
  questions: string[];
  tipsUrdu: string[];
}

export interface AIQuotaStatus {
  requestsUsedToday: number;
  dailyBudget: number; // e.g. 100 requests application safety limit
  isWarning: boolean;
  isCritical: boolean;
  isLimitReached: boolean;
  percent: number;
}
