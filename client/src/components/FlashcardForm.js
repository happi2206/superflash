import React, { useState } from 'react';

const categories = ['React', 'APIs', 'Databases'];
const difficulties = ['easy', 'medium', 'hard'];

function FlashcardForm({ onAdd, compact = false }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('React');
  const [difficulty, setDifficulty] = useState('medium');
  const isSubmitDisabled = !question.trim() || !answer.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    try {
      const result = await Promise.resolve(
        onAdd({ question: question.trim(), answer: answer.trim(), category, difficulty })
      );

      if (result !== false) {
        setQuestion('');
        setAnswer('');
        setCategory('React');
        setDifficulty('medium');
      }
    } catch (_error) {
      // The parent app handles request errors.
    }
  };

  return (
    <div className={compact ? 'p-0 bg-transparent border-0 shadow-none' : 'bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 shadow-2xl rounded-2xl p-6 sm:p-8 space-y-6'}>
      {!compact && (
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-slate-50">Add a flashcard</h2>
          <p className="text-sm text-slate-400">Keep questions specific and answers concise.</p>
        </div>
      )}
      <form
        className={`w-full grid grid-cols-1 md:grid-cols-3 gap-6 ${
          compact ? 'bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 sm:p-6' : ''
        }`}
        onSubmit={handleSubmit}
      >
        <div className="md:col-span-2 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wide uppercase text-slate-400" htmlFor="question">Question</label>
            <input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 text-slate-100 px-4 h-11 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400/70 transition"
              placeholder="Question"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wide uppercase text-slate-400" htmlFor="answer">Answer</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 text-slate-100 px-4 py-3 min-h-[120px] resize-y shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400/70 transition"
              placeholder="Answer"
            />
          </div>
        </div>

        <div className="md:col-span-1 flex flex-col gap-4 rounded-2xl border border-slate-800/90 bg-slate-950/40 p-4 sm:p-5 shadow-[0_0_0_1px_rgba(16,185,129,0.08)]">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wide uppercase text-slate-400" htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 text-slate-100 px-4 h-11 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400/70 transition"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wide uppercase text-slate-400" htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 text-slate-100 px-4 h-11 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-400/70 transition"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full mt-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 text-white px-4 py-3 font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-emerald-500/30"
          >
            Add card
          </button>
        </div>
      </form>
    </div>
  );
}

export default FlashcardForm;
