import React from 'react';

const timeOptions = [5, 10, 15];

function StartScreen({ cards, settings, onTimeChange, onShuffleChange, onStart }) {
  const cardCount = cards.length;

  const categories = Array.from(new Set(cards.map((card) => card.category).filter(Boolean)));

  const difficultyCounts = cards.reduce(
    (acc, card) => {
      const level = String(card.difficulty || '').toLowerCase();
      if (level === 'easy' || level === 'medium' || level === 'hard') {
        acc[level] += 1;
      }
      return acc;
    },
    { easy: 0, medium: 0, hard: 0 }
  );

  return (
    <div className="min-h-[68vh] flex items-center justify-center">
      <div className="relative max-w-4xl w-full text-center bg-slate-900/75 border border-slate-800 rounded-3xl shadow-2xl px-6 sm:px-10 py-10 sm:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-transparent blur-3xl" />
        <div className="relative flex flex-col items-center gap-5 sm:gap-6">
          <p className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/80 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            SuperFlash Session
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Ready to study?
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            {cardCount ? `${cardCount} cards ready` : 'No cards yet'}
          </p>

          <div className="w-full max-w-3xl rounded-2xl border border-slate-800/90 bg-slate-950/40 px-4 sm:px-6 py-4 sm:py-5 space-y-3">
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Session Preview</p>
            <div className="text-sm sm:text-base text-slate-200">
              {cardCount ? `${cardCount} cards ready` : 'No cards ready'}
            </div>
            <div className="text-sm text-slate-300">
              {categories.length ? categories.join(' • ') : 'No categories yet'}
            </div>
            <div className="text-sm text-slate-300">
              Easy {difficultyCounts.easy} • Medium {difficultyCounts.medium} • Hard {difficultyCounts.hard}
            </div>
          </div>

          <div className="w-full max-w-3xl rounded-2xl border border-slate-800/90 bg-slate-950/40 px-4 sm:px-6 py-4 sm:py-5 space-y-4">
            <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">Session Controls</p>
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {timeOptions.map((seconds) => {
                  const isActive = settings.timePerCard === seconds;
                  return (
                    <button
                      key={seconds}
                      type="button"
                      onClick={() => onTimeChange(seconds)}
                      className={`min-w-[64px] rounded-xl border px-3 py-2 text-sm font-semibold transition transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400/70 ${
                        isActive
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_22px_rgba(16,185,129,0.28)]'
                          : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100'
                      }`}
                    >
                      {seconds}s
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => onShuffleChange(!settings.shuffle)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition min-h-[44px] w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-emerald-400/70 ${
                  settings.shuffle
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.22)]'
                    : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100'
                }`}
              >
                Shuffle: {settings.shuffle ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          <div className="pt-1 w-full max-w-3xl">
            <button
              onClick={onStart}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white px-6 py-3.5 text-base sm:text-lg font-semibold shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:-translate-y-0.5 active:translate-y-0 transition min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              disabled={!cardCount}
            >
              Start Session
            </button>
            {!cardCount && (
              <p className="text-slate-400 text-sm mt-2">Add cards first in Manage view.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
