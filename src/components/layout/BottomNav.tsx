import React from 'react';
import { Home, Mic, Dumbbell, BookMarked, BarChart3, User } from 'lucide-react';
import { ActiveTab } from '../../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'home' as ActiveTab, label: 'Home', icon: Home },
    { id: 'speak' as ActiveTab, label: 'Speak', icon: Mic, highlight: true },
    { id: 'practice' as ActiveTab, label: 'Practice', icon: Dumbbell },
    { id: 'vocabulary' as ActiveTab, label: 'Vocab', icon: BookMarked },
    { id: 'progress' as ActiveTab, label: 'Progress', icon: BarChart3 },
    { id: 'profile' as ActiveTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 safe-area-bottom shadow-lg transition-colors">
      <div className="max-w-md mx-auto grid grid-cols-6 px-1 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              style={{ minHeight: '52px' }}
            >
              {tab.highlight ? (
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center -mt-2 transition-transform shadow-sm ${
                    isActive
                      ? 'bg-emerald-600 text-white scale-105 shadow-emerald-500/30'
                      : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              ) : (
                <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              )}
              <span className="text-[10px] tracking-tight leading-none truncate max-w-full">
                {tab.label}
              </span>
              {isActive && !tab.highlight && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
