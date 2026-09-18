import React from 'react';
import {
  Mic,
  Award,
  BookOpen,
  Languages,
  BookMarked,
  Briefcase,
  Flame,
  Volume2,
  AlertCircle,
  Play,
} from 'lucide-react';
import { UserProfile, PracticeStreak, ActiveTab } from '../../types';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storageService';

interface HomeViewProps {
  profile: UserProfile;
  streak: PracticeStreak;
  onNavigate: (tab: ActiveTab, subSection?: string) => void;
  onStartScenario: (scenarioId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  streak,
  onNavigate,
  onStartScenario,
}) => {
  const mistakes = storageService.getMistakes();
  const vocab = storageService.getVocabulary();
  const wordOfTheDay = vocab[0] || {
    word: 'articulate',
    urduMeaning: 'واضح طور پر بیان کرنا',
    definition: 'Expressing an idea or feeling fluently and coherently.',
    example: 'She was able to articulate her thesis arguments with great confidence.',
    pronunciation: '/ɑːrˈtɪkjʊleɪt/',
  };

  const minutesProgress = Math.min(100, Math.round((streak.minutesToday / profile.dailyTarget) * 100));

  const playWordAudio = () => {
    speechService.speak(`${wordOfTheDay.word}. ${wordOfTheDay.example}`, {
      rate: profile.voiceSpeed,
    });
  };

  return (
    <div className="space-y-5 pb-8 animate-fade-in">
      {/* Welcome Banner & Daily Progress */}
      <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white p-5 shadow-lg shadow-emerald-700/15 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-12 -top-8 w-24 h-24 rounded-full bg-teal-300/20 blur-lg pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wide mb-2">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>Day {streak.currentStreak} Streak • Keep it up!</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Hello, {profile.name}!
            </h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-sm">
              Today's focus: speak English naturally without fear. Every sentence counts.
            </p>
          </div>

          {/* Circular / Pill progress */}
          <div className="flex flex-col items-end">
            <div className="text-right">
              <div className="text-2xl font-black">{streak.minutesToday}<span className="text-xs font-normal opacity-80">/{profile.dailyTarget}m</span></div>
              <div className="text-[10px] text-emerald-100">Daily Target</div>
            </div>
            <div className="w-20 bg-black/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${minutesProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div className="mt-4 pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
          <div className="text-[11px] text-emerald-100 font-medium">
            Daily Goal: Practice speaking English for at least 10 minutes today.
          </div>
          <button
            onClick={() => onNavigate('speak')}
            className="px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/20 active:scale-95 transition-all"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-600" />
            <span>Start Speaking Practice</span>
          </button>
        </div>
      </div>

      {/* Primary Action Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Learning Pathways
          </h3>
          <span className="text-xs text-slate-400 font-medium">Core Academic Areas</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Module 1: Communication Skills */}
          <div
            onClick={() => onNavigate('practice', 'comm-skills')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Communication Skills
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              14 university syllabus lessons: Introductions, presentations & emails.
            </p>
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1.5">
              University Syllabus Modules
            </div>
          </div>

          {/* Module 2: Voice Conversation */}
          <div
            onClick={() => onNavigate('speak')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Voice Tutor Alex
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Speak naturally via microphone with gentle, supportive feedback.
            </p>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">
              Live Spoken English Practice
            </div>
          </div>

          {/* Module 3: Grammar Lessons */}
          <div
            onClick={() => onNavigate('practice', 'grammar')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Grammar & Tenses
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Present, Past, Modals & quizzes with simple rules & examples.
            </p>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-1.5">
              Sentence Structure & Tenses
            </div>
          </div>

          {/* Module 4: Urdu <-> English Translation */}
          <div
            onClick={() => onNavigate('practice', 'translation')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Languages className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Urdu ↔ English
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Translate real university sentences with instant AI evaluation.
            </p>
            <div className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold mt-1.5">
              Bilingual Translation Practice
            </div>
          </div>

          {/* Module 5: Vocabulary Flashcards */}
          <div
            onClick={() => onNavigate('vocabulary')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <BookMarked className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Vocabulary & Idioms
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              High-utility university words with Urdu meanings & audio.
            </p>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold mt-1.5">
              Academic Vocabulary Bank
            </div>
          </div>

          {/* Module 6: Interview & Viva Prep */}
          <div
            onClick={() => onNavigate('practice', 'interview')}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Interview & Viva
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Practice mock university admissions, internships & job interviews.
            </p>
            <div className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-1.5">
              Interview & Viva Preparation
            </div>
          </div>
        </div>
      </div>

      {/* Word of the Day */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
            Word of the Day • Daily Vocabulary
          </span>
          <button
            onClick={playWordAudio}
            className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 transition-colors"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-baseline gap-2 mb-1">
          <h4 className="text-lg font-extrabold text-slate-900 dark:text-white capitalize">
            {wordOfTheDay.word}
          </h4>
          <span className="text-xs text-slate-400 font-mono">
            {wordOfTheDay.pronunciation}
          </span>
          <span className="text-xs font-urdu text-emerald-700 dark:text-emerald-300 font-semibold ml-auto">
            {wordOfTheDay.urduMeaning}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
          {wordOfTheDay.definition}
        </p>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 italic">
          "{wordOfTheDay.example}"
        </div>
      </div>

      {/* Student Mistakes Review Banner (if any recorded) */}
      {mistakes.length > 0 && (
        <div className="rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex-shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Personal Weak Area Reminder ({mistakes.length} items)
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-0.5">
                Top issue: <strong>{mistakes[0].topic}</strong>. Review your past mistakes to prevent repeating them in exams or presentations.
              </p>
              <button
                onClick={() => onNavigate('progress')}
                className="mt-2 text-xs font-bold text-amber-900 dark:text-amber-200 underline hover:no-underline inline-flex items-center gap-1"
              >
                <span>Review Saved Mistakes</span>
                <Play className="w-2.5 h-2.5 fill-current" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Scenario Launchers */}
      <div>
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            Popular Conversation Scenarios
          </h3>
          <span className="text-xs text-slate-400 font-urdu">مقبول موضوعات</span>
        </div>

        <div className="space-y-2">
          {[
            {
              id: 'sc-uni-1',
              title: 'Introducing Yourself in Class',
              category: 'University',
              urdu: 'کلاس میں اپنا تعارف کروانا',
            },
            {
              id: 'sc-prof-1',
              title: 'Job Interview Practice',
              category: 'Career',
              urdu: 'نوکری کے انٹرویو کا پہلا مرحلہ',
            },
            {
              id: 'sc-dl-1',
              title: 'Morning Routine & Daily Life',
              category: 'Daily Life',
              urdu: 'روزمرہ کے معمول پر بات چیت',
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => onStartScenario(item.id)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 flex items-center justify-between cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu">
                    {item.urdu}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                Start
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
