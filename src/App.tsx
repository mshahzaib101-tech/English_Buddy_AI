import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/home/HomeView';
import { VoiceConversationView } from './components/speak/VoiceConversationView';
import { PracticeHubView } from './components/practice/PracticeHubView';
import { VocabularyView } from './components/vocab/VocabularyView';
import { ProgressDashboardView } from './components/progress/ProgressDashboardView';
import { ProfileView } from './components/profile/ProfileView';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { SearchModal } from './components/common/SearchModal';
import { UserProfile, PracticeStreak, AIQuotaStatus, ActiveTab, AppTheme } from './types';
import { storageService } from './services/storageService';

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(storageService.getProfile());
  const [streak, setStreak] = useState<PracticeStreak>(storageService.getStreak());
  const [quota, setQuota] = useState<AIQuotaStatus>(storageService.getQuotaUsage());
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [practiceSubTab, setPracticeSubTab] = useState<any>('comm-skills');
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>(undefined);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Apply theme to document element
  useEffect(() => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effectiveDark =
      profile.theme === 'dark' || (profile.theme === 'system' && prefersDark);

    if (effectiveDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [profile.theme]);

  // Refresh quota status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setQuota(storageService.getQuotaUsage());
      setStreak(storageService.getStreak());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    storageService.saveProfile(updated);
  };

  const handleThemeChange = (newTheme: AppTheme) => {
    const updated = { ...profile, theme: newTheme };
    handleUpdateProfile(updated);
  };

  const handleNavigate = (tab: ActiveTab, subSection?: string) => {
    setActiveTab(tab);
    if (subSection) {
      setPracticeSubTab(subSection);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScenario = (scenarioId: string) => {
    setActiveScenarioId(scenarioId);
    setActiveTab('speak');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Header */}
      <Header
        profile={profile}
        streak={streak}
        quota={quota}
        onOpenSearch={() => setIsSearchOpen(true)}
        onThemeChange={handleThemeChange}
        onOpenProfile={() => setActiveTab('profile')}
      />

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-3 sm:px-4 pt-3.5 pb-20">
        {activeTab === 'home' && (
          <HomeView
            profile={profile}
            streak={streak}
            onNavigate={handleNavigate}
            onStartScenario={handleStartScenario}
          />
        )}

        {activeTab === 'speak' && (
          <VoiceConversationView
            profile={profile}
            initialScenarioId={activeScenarioId}
            onSessionEnded={() => {
              setStreak(storageService.getStreak());
              setQuota(storageService.getQuotaUsage());
            }}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeHubView
            profile={profile}
            initialSubTab={practiceSubTab}
          />
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyView profile={profile} />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboardView profile={profile} streak={streak} />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            quota={quota}
            onUpdateProfile={handleUpdateProfile}
            onReopenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={handleNavigate} />

      {/* Global Modals */}
      <OnboardingModal
        initialProfile={profile}
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(updated) => {
          handleUpdateProfile(updated);
          setIsOnboardingOpen(false);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
