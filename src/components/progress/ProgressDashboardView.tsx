import React, { useState } from 'react';
import {
  BarChart3,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Calendar,
  MessageSquare,
  Award,
  ChevronDown,
  ChevronUp,
  Trash2,
} from 'lucide-react';
import { UserProfile, PracticeStreak, MistakeRecord, ConversationSession } from '../../types';
import { storageService } from '../../services/storageService';
import { speechService } from '../../services/speechService';

interface ProgressDashboardViewProps {
  profile: UserProfile;
  streak: PracticeStreak;
}

export const ProgressDashboardView: React.FC<ProgressDashboardViewProps> = ({
  profile,
  streak,
}) => {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(storageService.getMistakes());
  const [sessions, setSessions] = useState<ConversationSession[]>(storageService.getSessions());
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const vocab = storageService.getVocabulary();
  const learnedCount = vocab.filter((w) => w.isLearned).length;

  // Last 7 days history
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
    const minutes = streak.dailyHistory[dateStr] || 0;
    return { dateStr, dayLabel, minutes };
  });

  const maxDailyMinutes = Math.max(...last7Days.map((d) => d.minutes), profile.dailyTarget, 40);

  const handleDeleteMistake = (id: string) => {
    const updated = mistakes.filter((m) => m.id !== id);
    setMistakes(updated);
    storageService.saveMistakes(updated);
  };

  return (
    <div className="space-y-5 pb-12 animate-fade-in">
      {/* Progress Header Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-700 to-slate-900 text-white shadow-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
              Personal Learning Analytics
            </span>
            <h3 className="text-xl font-black">{profile.name}'s Growth</h3>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md flex items-center gap-1.5 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{streak.currentStreak} Days Streak</span>
          </div>
        </div>

        {/* 4 Primary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-emerald-200">Practice Today</div>
            <div className="text-lg font-black mt-0.5">
              {streak.minutesToday} <span className="text-xs font-normal">/ {profile.dailyTarget}m</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-emerald-200">Best Streak</div>
            <div className="text-lg font-black mt-0.5">{streak.bestStreak} Days</div>
          </div>
          <div className="p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-emerald-200">Mastered Words</div>
            <div className="text-lg font-black mt-0.5">{learnedCount} Words</div>
          </div>
          <div className="p-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
            <div className="text-[10px] text-emerald-200">Speaking Sessions</div>
            <div className="text-lg font-black mt-0.5">{sessions.length} Completed</div>
          </div>
        </div>
      </div>

      {/* 7-Day Activity Chart */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              7-Day Practice Minutes
            </h4>
            <p className="text-[10px] text-slate-400">
              Daily target: {profile.dailyTarget} minutes
            </p>
          </div>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>

        {/* Bar chart representation */}
        <div className="flex items-end justify-between gap-2 h-32 pt-4 px-2">
          {last7Days.map((day) => {
            const heightPercent = Math.min(100, Math.round((day.minutes / maxDailyMinutes) * 100));
            const isToday = day.dateStr === new Date().toISOString().split('T')[0];

            return (
              <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-500">
                  {day.minutes > 0 ? `${day.minutes}m` : ''}
                </span>
                <div className="w-full max-w-[28px] bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden h-24 flex items-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50'
                        : day.minutes >= profile.dailyTarget
                        ? 'bg-teal-600'
                        : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                    style={{ height: `${Math.max(8, heightPercent)}%` }}
                  />
                </div>
                <span className={`text-[10px] font-semibold ${isToday ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                  {day.dayLabel}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Mistakes & Personal Weak Areas */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Personal Weak Areas & Saved Mistakes ({mistakes.length})
              </h4>
              <p className="text-[10px] text-slate-400">
                Patterns identified during conversations to prevent repeating in exams.
              </p>
            </div>
          </div>
        </div>

        {mistakes.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">
            No mistakes recorded yet! Practice speaking or use the "Correct My English" tool to save weak points here.
          </div>
        ) : (
          <div className="space-y-2.5">
            {mistakes.map((m) => (
              <div
                key={m.id}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      Topic: {m.topic} • Repeated {m.count}x
                    </div>
                    <div className="text-rose-600 dark:text-rose-400 line-through">
                      "{m.originalText}"
                    </div>
                    <div className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1.5">
                      <span>✓ "{m.correctedText}"</span>
                      <button
                        onClick={() => speechService.speak(m.correctedText, { rate: profile.voiceSpeed })}
                        className="p-1 hover:text-emerald-500"
                        title="Pronounce"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteMistake(m.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove from list"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 font-urdu text-[11px] text-slate-800 dark:text-slate-200">
                  💡 {m.explanationUrdu}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conversation History */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Speaking Practice History ({sessions.length})
          </h4>
        </div>

        <div className="space-y-2">
          {sessions.map((sess) => {
            const isExpanded = expandedSessionId === sess.id;
            return (
              <div
                key={sess.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs"
              >
                <div
                  onClick={() => setExpandedSessionId(isExpanded ? null : sess.id)}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {sess.title}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {new Date(sess.timestamp).toLocaleDateString()} • {Math.round(sess.durationSeconds / 60)} min • {sess.messages.length} messages
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>

                {isExpanded && sess.feedback && (
                  <div className="p-3.5 space-y-2.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                      <strong>Praise:</strong> {sess.feedback.praise}
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-urdu text-[11px] text-slate-800 dark:text-slate-200">
                      {sess.feedback.urduSummary}
                    </div>

                    {sess.feedback.grammarReview?.length > 0 && (
                      <div>
                        <div className="font-bold text-[11px] text-slate-700 dark:text-slate-300 mb-1">
                          Grammar Notes:
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-400">
                          {sess.feedback.grammarReview.map((pt: string, idx: number) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Formative learning indicator disclaimer */}
      <p className="text-[11px] text-slate-400 text-center max-w-sm mx-auto">
        * Note: All progress scores and percentages serve as approximate formative learning guides to motivate daily practice, not accredited proficiency test scores.
      </p>
    </div>
  );
};
