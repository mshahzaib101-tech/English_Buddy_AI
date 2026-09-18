import React, { useState } from 'react';
import { Search, X, BookOpen, Award, BookMarked, Mic, ArrowRight } from 'lucide-react';
import { COMMUNICATION_LESSONS } from '../../data/communicationLessons';
import { GRAMMAR_LESSONS } from '../../data/grammarLessons';
import { INITIAL_VOCABULARY } from '../../data/vocabularyData';
import { CONVERSATION_SCENARIOS } from '../../data/scenarios';
import { ActiveTab } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab, subSection?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedComm = q
    ? COMMUNICATION_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.explanationUrdu.includes(q)
      )
    : [];

  const matchedGrammar = q
    ? GRAMMAR_LESSONS.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.summaryUrdu.includes(q) ||
          g.explanation.toLowerCase().includes(q)
      )
    : [];

  const matchedVocab = q
    ? INITIAL_VOCABULARY.filter(
        (v) =>
          v.word.toLowerCase().includes(q) ||
          v.urduMeaning.includes(q) ||
          v.definition.toLowerCase().includes(q)
      )
    : [];

  const matchedScenarios = q
    ? CONVERSATION_SCENARIOS.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.contextUrdu.includes(q)
      )
    : [];

  const hasResults =
    matchedComm.length > 0 ||
    matchedGrammar.length > 0 ||
    matchedVocab.length > 0 ||
    matchedScenarios.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Search Bar */}
        <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, grammar, vocabulary, Urdu words..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!q && (
            <div className="text-center py-8 text-xs text-slate-400 space-y-1">
              <p>Type anything to search across English Buddy AI.</p>
              <p className="font-urdu">سبق، گرائمر، الفاظ یا موضوعات تلاش کریں۔</p>
            </div>
          )}

          {q && !hasResults && (
            <div className="text-center py-8 text-xs text-slate-400">
              No matching lessons or words found for "{query}".
            </div>
          )}

          {/* Communication Lessons */}
          {matchedComm.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                Communication Skills ({matchedComm.length})
              </div>
              {matchedComm.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('practice', 'comm-skills');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer flex items-center justify-between transition-colors text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu">
                      {item.explanationUrdu.slice(0, 70)}...
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Grammar */}
          {matchedGrammar.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                Grammar Topics ({matchedGrammar.length})
              </div>
              {matchedGrammar.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('practice', 'grammar');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 cursor-pointer flex items-center justify-between transition-colors text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu">
                      {item.summaryUrdu.slice(0, 70)}...
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Vocabulary */}
          {matchedVocab.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1">
                <BookMarked className="w-3.5 h-3.5" />
                Vocabulary ({matchedVocab.length})
              </div>
              {matchedVocab.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('vocabulary');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer flex items-center justify-between transition-colors text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white capitalize">
                      {item.word}
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-urdu">
                      {item.urduMeaning}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {/* Scenarios */}
          {matchedScenarios.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <Mic className="w-3.5 h-3.5" />
                Speaking Scenarios ({matchedScenarios.length})
              </div>
              {matchedScenarios.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onNavigate('speak');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer flex items-center justify-between transition-colors text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-urdu">
                      {item.contextUrdu}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
