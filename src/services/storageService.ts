import {
  UserProfile,
  PracticeStreak,
  VocabularyWord,
  MistakeRecord,
  ConversationSession,
  AIQuotaStatus,
} from '../types';
import { INITIAL_VOCABULARY } from '../data/vocabularyData';

const STORAGE_PREFIX = 'english_buddy_';

export const DEFAULT_PROFILE: UserProfile = {
  id: 'demo-student-1',
  name: 'Usman Ali',
  email: 'usman.student@university.edu.pk',
  isDemo: true,
  level: 'beginner',
  goal: 'communication_skills',
  explanationLang: 'both',
  dailyTarget: 30,
  voiceSpeed: 0.9,
  autoPlayVoice: true,
  correctionFrequency: 'normal',
  theme: 'system',
  createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
};

const DEFAULT_STREAK: PracticeStreak = {
  currentStreak: 4,
  bestStreak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  minutesToday: 18,
  sessionsCompletedToday: 2,
  dailyHistory: {
    [new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0]]: 25,
    [new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0]]: 30,
    [new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0]]: 20,
    [new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0]]: 35,
    [new Date().toISOString().split('T')[0]]: 18,
  },
};

const DEFAULT_MISTAKES: MistakeRecord[] = [
  {
    id: 'm1',
    originalText: 'Yesterday I am go to university library.',
    correctedText: 'Yesterday I went to the university library.',
    explanationUrdu: 'ماضی کے وقت (Yesterday) کے ساتھ "am go" کے بجائے 2nd form "went" استعمال ہوگی۔',
    topic: 'Past Simple Tense',
    count: 3,
    timestamp: Date.now() - 86400000,
  },
  {
    id: 'm2',
    originalText: 'We will discuss about the semester presentation.',
    correctedText: 'We will discuss the semester presentation.',
    explanationUrdu: '"Discuss" کے ساتھ "about" لگانا غلط ہے کیونکہ اس کا مطلب خود "کے بارے میں گفتگو" ہے۔',
    topic: 'Preposition Errors',
    count: 2,
    timestamp: Date.now() - 2 * 86400000,
  },
  {
    id: 'm3',
    originalText: 'Does he has his university identity card?',
    correctedText: 'Does he have his university identity card?',
    explanationUrdu: 'جب جملے میں "Does" آ جائے تو اس کے بعد ہمیشہ بیس فارم "have" آتی ہے، "has" نہیں۔',
    topic: 'Auxiliary Verbs (Does/Have)',
    count: 2,
    timestamp: Date.now() - 3 * 86400000,
  },
];

const DEFAULT_SESSIONS: ConversationSession[] = [
  {
    id: 'sess-1',
    title: 'Introducing Yourself to Teacher',
    scenario: 'Introducing Yourself in Class',
    roleplay: 'Student & Professor',
    durationSeconds: 195,
    timestamp: Date.now() - 86400000,
    messages: [
      {
        id: 'msg-1',
        sender: 'tutor',
        text: 'Good day! Come on in and have a seat. How can I assist you with your studies today?',
        timestamp: Date.now() - 86400000,
      },
      {
        id: 'msg-2',
        sender: 'student',
        text: 'Hello professor, my name is Usman. I want to ask advice for my midterm exam.',
        timestamp: Date.now() - 86400000 + 30000,
      },
      {
        id: 'msg-3',
        sender: 'tutor',
        text: 'Nice to meet you, Usman! You expressed that very clearly. Which specific topic in the midterm are you finding difficult?',
        correction: 'I want to ask for advice on my midterm exam.',
        explanationUrdu: '"Advice" سے پہلے "ask for" کہنا اور امتحان کے لیے "on" یا "regarding" لگانا زیادہ قدرتی ہے۔',
        timestamp: Date.now() - 86400000 + 60000,
      },
    ],
    feedback: {
      praise: 'Great confidence and polite tone with the professor! You introduced yourself smoothly.',
      grammarReview: ['Remember to use "ask for advice" instead of just "ask advice".'],
      vocabularySuggestions: ['regarding', 'clarification', 'curriculum'],
      urduSummary: 'آپ نے بہت شائستہ انداز میں بات کی۔ چند چھوٹے پریپوزیشنز کی مشق سے آپ کی گفتگو مزید نکھر جائے گی۔',
      scoreIndicator: 'Good Progress • 3 Turns completed',
    },
  },
];

class StorageService {
  private getKey(key: string, userId?: string): string {
    const uid = userId || this.getCurrentUserId();
    return `${STORAGE_PREFIX}${uid}_${key}`;
  }

  public getCurrentUserId(): string {
    return localStorage.getItem(`${STORAGE_PREFIX}current_user`) || 'demo-student-1';
  }

  public setCurrentUserId(id: string): void {
    localStorage.setItem(`${STORAGE_PREFIX}current_user`, id);
  }

  // Profile
  public getProfile(): UserProfile {
    const raw = localStorage.getItem(this.getKey('profile'));
    if (!raw) {
      this.saveProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  public saveProfile(profile: UserProfile): void {
    localStorage.setItem(this.getKey('profile', profile.id), JSON.stringify(profile));
    this.setCurrentUserId(profile.id);
  }

  // Streak & Activity
  public getStreak(): PracticeStreak {
    const raw = localStorage.getItem(this.getKey('streak'));
    if (!raw) {
      this.saveStreak(DEFAULT_STREAK);
      return DEFAULT_STREAK;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_STREAK;
    }
  }

  public saveStreak(streak: PracticeStreak): void {
    localStorage.setItem(this.getKey('streak'), JSON.stringify(streak));
  }

  public addPracticeTime(minutes: number): PracticeStreak {
    const streak = this.getStreak();
    const today = new Date().toISOString().split('T')[0];
    
    if (streak.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (streak.lastActiveDate === yesterday) {
        streak.currentStreak += 1;
      } else {
        streak.currentStreak = 1;
      }
      if (streak.currentStreak > streak.bestStreak) {
        streak.bestStreak = streak.currentStreak;
      }
      streak.lastActiveDate = today;
      streak.minutesToday = 0;
      streak.sessionsCompletedToday = 0;
    }

    streak.minutesToday += minutes;
    streak.sessionsCompletedToday += 1;
    streak.dailyHistory[today] = (streak.dailyHistory[today] || 0) + minutes;

    this.saveStreak(streak);
    return streak;
  }

  // Vocabulary
  public getVocabulary(): VocabularyWord[] {
    const raw = localStorage.getItem(this.getKey('vocabulary'));
    if (!raw) {
      this.saveVocabulary(INITIAL_VOCABULARY);
      return INITIAL_VOCABULARY;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_VOCABULARY;
    }
  }

  public saveVocabulary(vocab: VocabularyWord[]): void {
    localStorage.setItem(this.getKey('vocabulary'), JSON.stringify(vocab));
  }

  public toggleWordLearned(id: string): VocabularyWord[] {
    const list = this.getVocabulary();
    const updated = list.map((w) =>
      w.id === id
        ? {
            ...w,
            isLearned: !w.isLearned,
            needsReview: w.isLearned,
            reviewCount: w.reviewCount + 1,
            lastReviewedAt: Date.now(),
          }
        : w
    );
    this.saveVocabulary(updated);
    return updated;
  }

  public addWord(word: Omit<VocabularyWord, 'id' | 'reviewCount'>): VocabularyWord {
    const list = this.getVocabulary();
    const newWord: VocabularyWord = {
      ...word,
      id: 'v_custom_' + Date.now(),
      reviewCount: 0,
      userCreated: true,
    };
    list.unshift(newWord);
    this.saveVocabulary(list);
    return newWord;
  }

  public removeWord(id: string): VocabularyWord[] {
    const list = this.getVocabulary().filter((w) => w.id !== id);
    this.saveVocabulary(list);
    return list;
  }

  // Mistakes
  public getMistakes(): MistakeRecord[] {
    const raw = localStorage.getItem(this.getKey('mistakes'));
    if (!raw) {
      this.saveMistakes(DEFAULT_MISTAKES);
      return DEFAULT_MISTAKES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_MISTAKES;
    }
  }

  public saveMistakes(mistakes: MistakeRecord[]): void {
    localStorage.setItem(this.getKey('mistakes'), JSON.stringify(mistakes));
  }

  public recordMistake(mistake: { originalText: string; correctedText: string; explanationUrdu: string; topic: string }): MistakeRecord[] {
    const list = this.getMistakes();
    const existingIndex = list.findIndex(
      (m) => m.topic.toLowerCase() === mistake.topic.toLowerCase() || m.originalText.toLowerCase() === mistake.originalText.toLowerCase()
    );
    if (existingIndex > -1) {
      list[existingIndex].count += 1;
      list[existingIndex].timestamp = Date.now();
      list[existingIndex].originalText = mistake.originalText;
      list[existingIndex].correctedText = mistake.correctedText;
      list[existingIndex].explanationUrdu = mistake.explanationUrdu;
    } else {
      list.unshift({
        id: 'm_' + Date.now(),
        ...mistake,
        count: 1,
        timestamp: Date.now(),
      });
    }
    this.saveMistakes(list);
    return list;
  }

  // Conversation Sessions
  public getSessions(): ConversationSession[] {
    const raw = localStorage.getItem(this.getKey('sessions'));
    if (!raw) {
      this.saveSessions(DEFAULT_SESSIONS);
      return DEFAULT_SESSIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_SESSIONS;
    }
  }

  public saveSessions(sessions: ConversationSession[]): void {
    localStorage.setItem(this.getKey('sessions'), JSON.stringify(sessions));
  }

  public addSession(session: ConversationSession): void {
    const list = this.getSessions();
    list.unshift(session);
    this.saveSessions(list);
    this.addPracticeTime(Math.max(1, Math.round(session.durationSeconds / 60)));
  }

  // Quota & Safety Usage
  public getQuotaUsage(): AIQuotaStatus {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(this.getKey('quota_usage'));
    let requestsUsed = 8; // default demo usage
    let date = today;
    const dailyBudget = 100;

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.date === today) {
          requestsUsed = parsed.requestsUsed;
        } else {
          requestsUsed = 0;
        }
      } catch {}
    }

    const percent = Math.min(100, Math.round((requestsUsed / dailyBudget) * 100));

    return {
      requestsUsedToday: requestsUsed,
      dailyBudget,
      isWarning: percent >= 70 && percent < 90,
      isCritical: percent >= 90 && percent < 100,
      isLimitReached: percent >= 100,
      percent,
    };
  }

  public incrementQuotaUsage(): AIQuotaStatus {
    const current = this.getQuotaUsage();
    const today = new Date().toISOString().split('T')[0];
    const newCount = current.requestsUsedToday + 1;
    localStorage.setItem(
      this.getKey('quota_usage'),
      JSON.stringify({ date: today, requestsUsed: newCount })
    );
    return this.getQuotaUsage();
  }

  // Clear data / Privacy
  public clearAllData(): void {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  }
}

export const storageService = new StorageService();
