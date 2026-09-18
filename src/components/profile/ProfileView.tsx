import React, { useState } from 'react';
import {
  User,
  Settings,
  Shield,
  Trash2,
  RotateCcw,
  Sparkles,
  Volume2,
  Check,
  AlertTriangle,
  Flame,
  Info,
} from 'lucide-react';
import { UserProfile, AIQuotaStatus, StudentLevel, ExplanationLanguage } from '../../types';
import { storageService } from '../../services/storageService';
import { speechService } from '../../services/speechService';

interface ProfileViewProps {
  profile: UserProfile;
  quota: AIQuotaStatus;
  onUpdateProfile: (updated: UserProfile) => void;
  onReopenOnboarding: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  quota,
  onUpdateProfile,
  onReopenOnboarding,
}) => {
  const [name, setName] = useState(profile.name);
  const [level, setLevel] = useState<StudentLevel>(profile.level);
  const [explanationLang, setExplanationLang] = useState<ExplanationLanguage>(profile.explanationLang);
  const [dailyTarget, setDailyTarget] = useState<number>(profile.dailyTarget);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(profile.voiceSpeed);
  const [autoPlayVoice, setAutoPlayVoice] = useState<boolean>(profile.autoPlayVoice);
  const [correctionFrequency, setCorrectionFrequency] = useState<string>(profile.correctionFrequency);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Student',
      level,
      explanationLang,
      dailyTarget,
      voiceSpeed,
      autoPlayVoice,
      correctionFrequency: correctionFrequency as any,
    };
    storageService.saveProfile(updated);
    onUpdateProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleClearData = () => {
    storageService.clearAllData();
    window.location.reload();
  };

  const testVoice = () => {
    speechService.speak("Hello! I am your English tutor Alex. How is your university study going?", {
      rate: voiceSpeed,
    });
  };

  return (
    <div className="space-y-5 pb-12 animate-fade-in max-w-2xl mx-auto">
      {/* Student Profile Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-500/20">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {profile.level.replace('_', ' ')} • University Student
            </p>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
              English & Urdu Communication Mentorship
            </div>
          </div>
        </div>

        <button
          onClick={onReopenOnboarding}
          className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          Re-run Setup
        </button>
      </div>

      {/* AI Usage & Protection Card */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
              Daily AI Usage Safety Budget
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
            {quota.requestsUsedToday} / {quota.dailyBudget} requests
          </span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              quota.isCritical ? 'bg-rose-500' : quota.isWarning ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${quota.percent}%` }}
          />
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Your daily limit protects the app from unexpected API spikes. When reached, all grammar curricula, translation sets, and vocabulary flashcards continue to function smoothly offline.
        </p>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSaveSettings} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Preferences & Voice Controls
        </h4>

        {/* Name input */}
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Your Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
          />
        </div>

        {/* English Level */}
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">English Speaking Level:</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as StudentLevel)}
            className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="beginner">Beginner (بنیادی - آسان الفاظ)</option>
            <option value="elementary">Elementary (ابتدائی)</option>
            <option value="intermediate">Intermediate (درمیانی)</option>
            <option value="upper_intermediate">Upper Intermediate (اعلیٰ)</option>
          </select>
        </div>

        {/* Explanation Language */}
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Explanation Language:</label>
          <select
            value={explanationLang}
            onChange={(e) => setExplanationLang(e.target.value as ExplanationLanguage)}
            className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="both">Urdu + English (تجویز کردہ)</option>
            <option value="urdu">Urdu Only (صرف اردو)</option>
            <option value="english">Simple English Only</option>
          </select>
        </div>

        {/* Voice Speed */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Voice Playback Speed:</label>
            <button
              type="button"
              onClick={testVoice}
              className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Test Voice
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0.75, 0.9, 1.0, 1.15].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => setVoiceSpeed(spd)}
                className={`py-2 rounded-xl border font-bold text-center transition-all ${
                  voiceSpeed === spd
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {spd}x {spd === 0.9 ? '(Optimal)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Auto play toggle */}
        <div className="flex items-center justify-between py-1">
          <div>
            <div className="font-bold text-slate-700 dark:text-slate-300">Auto-play Voice Responses</div>
            <div className="text-[11px] text-slate-400">Speak AI responses automatically</div>
          </div>
          <button
            type="button"
            onClick={() => setAutoPlayVoice(!autoPlayVoice)}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              autoPlayVoice ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                autoPlayVoice ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Daily Target */}
        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300">Daily Speaking Target:</label>
          <div className="grid grid-cols-4 gap-2 mt-1">
            {[15, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDailyTarget(mins)}
                className={`py-2 rounded-xl border font-bold text-center transition-all ${
                  dailyTarget === mins
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {mins} mins
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          {isSaved ? <Check className="w-4 h-4" /> : null}
          <span>{isSaved ? 'Preferences Saved!' : 'Save Preferences'}</span>
        </button>
      </form>

      {/* Privacy & Reset Card */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          Student Privacy & Data Retention
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Your spoken audio is recognized on-device by your browser. Your practice streaks, vocabulary, and mistake journals are stored locally in your browser so you retain full ownership of your data.
        </p>

        {!showClearConfirm ? (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1.5 pt-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset All Progress & Clear Data</span>
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 space-y-2">
            <div className="text-rose-900 dark:text-rose-200 font-bold">
              Are you sure? This will reset all streaks, saved mistakes, and custom words.
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClearData}
                className="px-3 py-1.5 bg-rose-600 text-white font-bold rounded-lg"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 font-bold rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
