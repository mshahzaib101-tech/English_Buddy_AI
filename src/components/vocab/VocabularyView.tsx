import React, { useState } from 'react';
import {
  BookMarked,
  Search,
  Volume2,
  Check,
  RotateCw,
  Plus,
  Filter,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { UserProfile, VocabularyWord } from '../../types';
import { storageService } from '../../services/storageService';
import { speechService } from '../../services/speechService';

interface VocabularyViewProps {
  profile: UserProfile;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({ profile }) => {
  const [words, setWords] = useState<VocabularyWord[]>(storageService.getVocabulary());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'needs_review' | 'learned'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFlashcardMode, setIsFlashcardMode] = useState<boolean>(false);
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Add word modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newWord, setNewWord] = useState('');
  const [newUrdu, setNewUrdu] = useState('');
  const [newDef, setNewDef] = useState('');
  const [newEx, setNewEx] = useState('');

  const categories = Array.from(new Set(words.map((w) => w.category)));

  const filteredWords = words.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.urduMeaning.includes(searchQuery) ||
      w.definition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterMode === 'all'
        ? true
        : filterMode === 'learned'
        ? w.isLearned
        : w.needsReview || !w.isLearned;

    const matchesCat = selectedCategory === 'all' || w.category === selectedCategory;

    return matchesSearch && matchesFilter && matchesCat;
  });

  const handleToggleLearned = (id: string) => {
    const updated = storageService.toggleWordLearned(id);
    setWords(updated);
  };

  const handleDeleteWord = (id: string) => {
    const updated = storageService.removeWord(id);
    setWords(updated);
  };

  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newUrdu.trim()) return;

    storageService.addWord({
      word: newWord.trim(),
      urduMeaning: newUrdu.trim(),
      definition: newDef.trim() || 'Custom student vocabulary item.',
      example: newEx.trim() || `I practiced using "${newWord.trim()}" in class today.`,
      pronunciation: `/${newWord.trim().toLowerCase()}/`,
      difficulty: 'medium',
      category: 'My Saved Words',
      isLearned: false,
      needsReview: true,
    });

    setWords(storageService.getVocabulary());
    setIsAddModalOpen(false);
    setNewWord('');
    setNewUrdu('');
    setNewDef('');
    setNewEx('');
  };

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  return (
    <div className="space-y-4 pb-12 animate-fade-in">
      {/* Header with Stats & Flashcard Mode Toggle */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-800 text-white shadow-sm flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-base font-bold">University Vocabulary Bank</h3>
          <p className="text-xs text-purple-200 mt-0.5">
            {words.filter((w) => w.isLearned).length} mastered • {words.length} total words
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Word</span>
          </button>
          <button
            onClick={() => {
              setIsFlashcardMode(!isFlashcardMode);
              setIsFlipped(false);
              setFlashcardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isFlashcardMode
                ? 'bg-amber-400 text-slate-900'
                : 'bg-white text-purple-950 hover:bg-purple-50'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlashcardMode ? 'Exit Flashcards' : 'Flashcard Mode'}</span>
          </button>
        </div>
      </div>

      {/* Flashcard View */}
      {isFlashcardMode && currentFlashcard && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 relative">
          <span className="text-[10px] font-bold text-slate-400 absolute top-4 left-4">
            Card {flashcardIndex + 1} of {filteredWords.length}
          </span>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer w-full py-6 transition-all"
          >
            {!isFlipped ? (
              <div className="space-y-2">
                <h4 className="text-2xl font-black text-slate-900 dark:text-white capitalize">
                  {currentFlashcard.word}
                </h4>
                <div className="text-xs text-slate-400 font-mono">
                  {currentFlashcard.pronunciation}
                </div>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-medium pt-2">
                  (Tap card to reveal Urdu meaning & example)
                </div>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 font-urdu">
                  {currentFlashcard.urduMeaning}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  {currentFlashcard.definition}
                </p>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 italic max-w-sm mx-auto">
                  "{currentFlashcard.example}"
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() =>
                speechService.speak(currentFlashcard.word, { rate: profile.voiceSpeed })
              }
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              title="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                handleToggleLearned(currentFlashcard.id);
                setFlashcardIndex((prev) => (prev + 1) % filteredWords.length);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                currentFlashcard.isLearned
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{currentFlashcard.isLearned ? 'Mastered' : 'Mark Mastered'}</span>
            </button>
            <button
              onClick={() => {
                setFlashcardIndex((prev) => (prev + 1) % filteredWords.length);
                setIsFlipped(false);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
            >
              Next Word →
            </button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search English word or Urdu meaning..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
          <div className="flex gap-1.5">
            {[
              { id: 'all', label: 'All Words' },
              { id: 'needs_review', label: 'Needs Practice' },
              { id: 'learned', label: 'Learned' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterMode(f.id as any)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                  filterMode === f.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-lg border-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredWords.map((word) => (
          <div
            key={word.id}
            className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
              word.isLearned
                ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white capitalize">
                    {word.word}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {word.pronunciation}
                  </span>
                  <button
                    onClick={() => speechService.speak(word.word, { rate: profile.voiceSpeed })}
                    className="p-1 text-slate-400 hover:text-purple-600"
                    title="Pronounce"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 font-urdu mt-0.5">
                  {word.urduMeaning}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleLearned(word.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    word.isLearned
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-600'
                  }`}
                  title={word.isLearned ? 'Mark as needing review' : 'Mark as learned'}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                {word.userCreated && (
                  <button
                    onClick={() => handleDeleteWord(word.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete custom word"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
              {word.definition}
            </p>

            <div className="mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 italic">
              "{word.example}"
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
              <span>{word.category}</span>
              <span>Reviewed: {word.reviewCount} times</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Word Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-5 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Add New Custom Vocabulary
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Add words you encounter in lectures or books to your personal review list.
            </p>

            <form onSubmit={handleCreateWord} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">English Word:</label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. prerequisite"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Urdu Meaning (اردو معنی):</label>
                <input
                  type="text"
                  required
                  value={newUrdu}
                  onChange={(e) => setNewUrdu(e.target.value)}
                  placeholder="e.g. بنیادی شرط / لازمی ضرورت"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-urdu"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Definition / Explanation:</label>
                <input
                  type="text"
                  value={newDef}
                  onChange={(e) => setNewDef(e.target.value)}
                  placeholder="Short simple meaning"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Example Sentence:</label>
                <input
                  type="text"
                  value={newEx}
                  onChange={(e) => setNewEx(e.target.value)}
                  placeholder="How it is used in a sentence"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold"
                >
                  Save Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
