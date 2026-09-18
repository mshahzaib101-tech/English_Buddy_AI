import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, BookOpen, MessageSquare, Award, Clock } from 'lucide-react';
import { UserProfile, StudentLevel, StudentGoal, LearningGoal, ExplanationLanguage } from '../../types';

interface OnboardingModalProps {
  initialProfile: UserProfile;
  isOpen: boolean;
  onComplete: (updated: UserProfile) => void;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  initialProfile,
  isOpen,
  onComplete,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState(initialProfile.name);
  const [level, setLevel] = useState<StudentLevel>(initialProfile.level);
  const [goal, setGoal] = useState<StudentGoal>(initialProfile.goal);
  const [explanationLang, setExplanationLang] = useState<ExplanationLanguage>(initialProfile.explanationLang);
  const [dailyTarget, setDailyTarget] = useState<number>(initialProfile.dailyTarget);

  if (!isOpen) return null;

  const handleFinish = () => {
    const updated: UserProfile = {
      ...initialProfile,
      name: name.trim() || 'University Student',
      level,
      goal,
      explanationLang,
      dailyTarget,
    };
    onComplete(updated);
  };

  const levelOptions: { id: StudentLevel; title: string; desc: string; urduDesc: string }[] = [
    {
      id: 'beginner',
      title: 'Beginner (بنیادی)',
      desc: 'Can understand basic words but struggle to form complete sentences.',
      urduDesc: 'جملے بنانے میں مشکل ہوتی ہے، آسان الفاظ میں مدد درکار ہے۔',
    },
    {
      id: 'elementary',
      title: 'Elementary (ابتدائی)',
      desc: 'Can speak simple sentences but feel shy and make grammar mistakes.',
      urduDesc: 'تھوڑا بہت بول سکتا ہوں لیکن جھجھک اور گرائمر کی غلطیاں ہوتی ہیں۔',
    },
    {
      id: 'intermediate',
      title: 'Intermediate (درمیانی)',
      desc: 'Can hold casual conversations; want to polish presentation and academic fluency.',
      urduDesc: 'بات چیت ہو جاتی ہے، اب پریزنٹیشن اور روانی بہتر کرنی ہے۔',
    },
    {
      id: 'upper_intermediate',
      title: 'Upper Intermediate (اعلیٰ)',
      desc: 'Fluent in daily talk; aiming for job interviews and professional excellence.',
      urduDesc: 'انٹرویو اور پروفیشنل کمیونیکیشن میں کمال حاصل کرنا ہے۔',
    },
  ];

  const goalOptions: { id: StudentGoal; title: string; icon: any; urduDesc: string }[] = [
    {
      id: 'communication_skills',
      title: 'University Communication Skills',
      icon: Award,
      urduDesc: 'یونیورسٹی کے کورس اور کلاس روم میں پراعتماد گفتگو',
    },
    {
      id: 'speaking' as LearningGoal,
      title: 'Spoken English Fluency',
      icon: MessageSquare,
      urduDesc: 'بغیر ہچکچاہٹ اور روانی سے انگریزی بولنا',
    },
    {
      id: 'presentation' as LearningGoal,
      title: 'Class Presentations',
      icon: Sparkles,
      urduDesc: 'سلائیڈز اور اسٹیج پر کلاس کے سامنے بولنے کی مشق',
    },
    {
      id: 'interview' as LearningGoal,
      title: 'Job & Internship Interview',
      icon: BookOpen,
      urduDesc: 'نوکری، انٹرن شپ اور ویوا کے سوالات کی تیاری',
    },
    {
      id: 'grammar' as LearningGoal,
      title: 'Grammar & Sentence Structure',
      icon: BookOpen,
      urduDesc: 'ٹینسز، پریپوزیشنز اور جملوں کی درست ساخت',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header with progress */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs">
                {step}/4
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Customize Your Learning Plan
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
            >
              Skip
            </button>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                  What is your name?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  Your AI tutor Alex will address you politely by this name.
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Usman Ali"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>خوش آمدید!</strong> انگلش بڈی خاص طور پر ان یونیورسٹی طلبہ کے لیے بنایا گیا ہے جو بولتے وقت ہچکچاہٹ محسوس کرتے ہیں۔
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                Select your current English speaking level
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Don't worry about being perfect! Alex will adjust vocabulary to match you.
              </p>

              <div className="space-y-2.5">
                {levelOptions.map((opt) => {
                  const isSelected = level === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setLevel(opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">
                          {opt.title}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                        {opt.desc}
                      </p>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-urdu">
                        {opt.urduDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                What is your primary learning goal?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Choose the focus area that matters most for this semester.
              </p>

              <div className="space-y-2">
                {goalOptions.map((opt) => {
                  const isSelected = goal === opt.id;
                  const Icon = opt.icon;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setGoal(opt.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white">
                            {opt.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu">
                            {opt.urduDesc}
                          </div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                  Explanation Language
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                  How should difficult grammar & vocabulary be explained?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'both', label: 'Urdu + English', sub: 'سب سے بہتر' },
                    { id: 'urdu', label: 'Urdu Only', sub: 'مکمل اردو' },
                    { id: 'english', label: 'Simple English', sub: 'صرف آسان انگلش' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setExplanationLang(item.id as ExplanationLanguage)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        explanationLang === item.id
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-medium">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-urdu mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                  Daily Speaking Practice Target
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                  Consistent daily practice is key to speaking without fear.
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDailyTarget(mins)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        dailyTarget === mins
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 mx-auto mb-1 opacity-70" />
                      <div className="text-xs">{mins}m/day</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 rounded-xl"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
            >
              <span>Start Learning</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
