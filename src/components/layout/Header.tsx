import React from 'react';
import { Sparkles, Flame, Search, Sun, Moon, Laptop, ShieldAlert } from 'lucide-react';
import { UserProfile, PracticeStreak, AIQuotaStatus, AppTheme } from '../../types';

interface HeaderProps {
  profile: UserProfile;
  streak: PracticeStreak;
  quota: AIQuotaStatus;
  onOpenSearch: () => void;
  onThemeChange: (theme: AppTheme) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  streak,
  quota,
  onOpenSearch,
  onThemeChange,
  onOpenProfile,
}) => {
  const getNextTheme = (): AppTheme => {
    if (profile.theme === 'light') return 'dark';
    if (profile.theme === 'dark') return 'system';
    return 'light';
  };

  const getThemeIcon = () => {
    if (profile.theme === 'light') return <Sun className="w-4 h-4 text-amber-500" />;
    if (profile.theme === 'dark') return <Moon className="w-4 h-4 text-sky-400" />;
    return <Laptop className="w-4 h-4 text-slate-500" />;
  };

  return (
    <header className="sticky top-0 z-30 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-2.5 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Branding & Level */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20 font-bold text-lg">
            EB
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                English Buddy
              </h1>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize flex items-center gap-1">
              <span>{profile.level.replace('_', ' ')}</span>
              {profile.isDemo && (
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1 rounded">
                  Demo
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Right: Streak, AI quota, Search, Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Streak badge */}
          <div
            className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-2 py-1 rounded-full text-xs font-semibold text-amber-700 dark:text-amber-400 cursor-pointer"
            onClick={onOpenProfile}
            title="Daily Practice Streak"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{streak.currentStreak}d</span>
          </div>

          {/* AI Usage Badge */}
          <div
            className={`hidden xs:flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border cursor-pointer ${
              quota.isCritical || quota.isLimitReached
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
                : quota.isWarning
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
            }`}
            onClick={onOpenProfile}
            title="Application AI Usage Safety Budget"
          >
            {quota.isCritical ? (
              <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            )}
            <span>{quota.requestsUsedToday}/{quota.dailyBudget}</span>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Search vocabulary, grammar and lessons"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={() => onThemeChange(getNextTheme())}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Current theme: ${profile.theme}. Click to switch.`}
            aria-label="Toggle Theme"
          >
            {getThemeIcon()}
          </button>
        </div>
      </div>
    </header>
  );
};
