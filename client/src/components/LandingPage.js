import React from 'react';

const steps = [
  {
    title: 'Create or Choose Cards',
    description: 'Add your own flashcards or use existing ones',
  },
  {
    title: 'Start a Study Session',
    description: 'Choose settings like timer and shuffle',
  },
  {
    title: 'Learn Efficiently',
    description: 'Flip cards, stay focused, and progress through sessions',
  },
];

const features = [
  'Timed study sessions',
  'Shuffle mode',
  'Category filtering',
  'Difficulty levels',
  'Create, edit, and delete flashcards',
  'Clean, distraction-free UI',
];

function LandingPage({ cards, onStart }) {
  const categories = Array.from(new Set(cards.map((card) => card.category).filter(Boolean))).slice(0, 3);

  return (
    <div className="space-y-10 sm:space-y-14 lg:space-y-16">
      <section className="min-h-[62vh] flex items-center justify-center">
        <div className="relative w-full max-w-4xl rounded-3xl border border-slate-800/90 bg-slate-900/70 backdrop-blur-xl shadow-2xl px-6 sm:px-10 py-12 sm:py-14 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-slate-900/40 to-cyan-500/10" />
          <div className="absolute -top-24 -left-24 w-56 h-56 bg-emerald-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-28 -right-24 w-64 h-64 bg-cyan-500/20 blur-3xl rounded-full" />

          <div className="relative space-y-5 sm:space-y-6">
            <p className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-400/30 bg-slate-900/80 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
              Focused Learning for Developers
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white break-words" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              SuperFlash
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto">
              Master web development concepts through focused flashcard sessions
            </p>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
              Build your deck, run fast study rounds, and stay consistent with a modern, distraction-free workflow.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onStart}
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-500 text-white px-6 sm:px-8 py-3.5 text-base sm:text-lg font-semibold shadow-lg shadow-emerald-500/35 hover:shadow-emerald-500/55 hover:-translate-y-0.5 active:translate-y-0 transition duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
              >
                Start Studying
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">How It Works</h2>
          <p className="text-slate-400">Three simple steps to keep your learning momentum high.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/60 px-5 py-5 text-left shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-500/40"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-center mb-3">
                {index + 1}
              </div>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-slate-400 mt-1.5 text-sm">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">Features Built for Deep Focus</h2>
          <p className="text-slate-400">Everything you need for fast, structured review sessions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-slate-800/90 bg-slate-900/55 px-4 py-3.5 text-slate-200 text-sm shadow-md transition hover:border-slate-600 hover:bg-slate-900/75"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">App Preview</h2>
          <p className="text-slate-400">A quick look at your session dashboard before you begin.</p>
        </div>

        <div className="relative mx-auto max-w-5xl rounded-3xl border border-slate-800/90 bg-slate-900/70 p-4 sm:p-6 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10" />
          <div className="relative space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 flex items-center justify-between">
              <p className="text-slate-200 font-semibold">Study Session</p>
              <p className="text-xs text-slate-400">{cards.length} cards loaded</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-500">Current Card</p>
                <p className="text-slate-100 text-lg font-medium">Why does React batch state updates in event handlers?</p>
                <p className="text-sm text-slate-400">Tap to reveal answer and move through your deck with focus.</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-500">Session Snapshot</p>
                <p className="text-slate-300 text-sm">Timer: 10s</p>
                <p className="text-slate-300 text-sm">Shuffle: On</p>
                <p className="text-slate-300 text-sm">
                  Categories: {categories.length ? categories.join(' • ') : 'React • APIs • Databases'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center rounded-3xl border border-slate-800/90 bg-slate-900/65 px-6 py-10 sm:py-12 space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">Ready to start learning?</h2>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-500 text-white px-7 py-3.5 font-semibold shadow-lg shadow-emerald-500/35 hover:shadow-emerald-500/55 hover:-translate-y-0.5 active:translate-y-0 transition duration-200 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
        >
          Start Session
        </button>
      </section>
    </div>
  );
}

export default LandingPage;
