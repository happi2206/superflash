import React from 'react';
import FlashcardItem from './FlashcardItem';

const CircleTimer = ({ secondsLeft, total, active }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const pct = total ? Math.max(0, Math.min(1, secondsLeft / total)) : 0;
  const offset = circumference * (1 - pct);
  const hue =
    pct > 0.5 ? 150 : pct > 0.25 ? 45 : 0; // green → amber → red
  const strokeColor = `hsl(${hue}, 80%, 55%)`;

  return (
    <div className="relative w-14 h-14">
      <svg className="w-14 h-14 -rotate-90 drop-shadow-[0_0_8px_rgba(16,185,129,0.25)]">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.2)"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={active ? 'transition-all duration-300 ease-linear' : ''}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-100">
        {active ? `${secondsLeft}s` : '--'}
      </div>
    </div>
  );
};

function StudyMode({
  card,
  stackCards = [],
  isFlipped,
  onFlip,
  onNext,
  onRestart,
  progressText,
  progressPercent,
  finished,
  settings,
  totalCount = 0,
}) {
  const [canProceed, setCanProceed] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(settings.timePerCard || 10);
  const timerActive = settings.timerEnabled && !finished && !!card;
  const nextWithTransition = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onNext();
    }, 360);
  }, [onNext]);

  React.useEffect(() => {
    if (card) {
      setCanProceed(false);
      setIsExiting(false);
      setSecondsLeft(settings.timePerCard || 10);
    }
  }, [card, settings.timePerCard]);

  React.useEffect(() => {
    if (isFlipped) {
      const t = setTimeout(() => setCanProceed(true), 250);
      return () => clearTimeout(t);
    }
    setCanProceed(false);
  }, [isFlipped]);

  React.useEffect(() => {
    if (!timerActive) return;
    if (secondsLeft <= 0) {
      if (!isFlipped && settings.autoFlip) {
        onFlip?.();
        setTimeout(() => nextWithTransition(), 1000);
      } else {
        nextWithTransition();
      }
      return;
    }
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [timerActive, secondsLeft, settings.autoFlip, isFlipped, nextWithTransition, onFlip]);

  const timerPercent =
    settings.timePerCard && settings.timePerCard > 0
      ? Math.min(100, (secondsLeft / settings.timePerCard) * 100)
      : 0;

  React.useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        onFlip?.();
      }
      if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (canProceed) handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [canProceed, onFlip]);

  const handleNext = () => nextWithTransition();

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 sm:px-8 py-4 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-transparent blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {timerActive && (
            <div className="flex-shrink-0 mx-auto sm:mx-0 sm:order-2">
              <CircleTimer secondsLeft={secondsLeft} total={settings.timePerCard} active={timerActive} />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>{progressText}</span>
              <span>{`${Math.round(progressPercent)}%`}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {finished ? (
        <div className="flex flex-col items-center justify-center gap-4 h-72 text-center rounded-2xl border border-slate-800 bg-slate-900/70 shadow-inner">
          <h2 className="text-2xl font-semibold">Session complete</h2>
          <p className="text-slate-400">You reviewed {totalCount} card{totalCount === 1 ? '' : 's'}.</p>
          <div className="flex gap-3">
            <button
              onClick={onRestart}
              className="rounded-xl bg-emerald-500 text-white px-4 py-3 font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition"
            >
              Restart session
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 min-h-[66vh] sm:min-h-[70vh] justify-center">
          {card && (
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center card-transition px-1 sm:px-0">
              {stackCards.slice(1, 3).map((c, idx) => (
                <div
                  key={c.id}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    transform: `translateY(${20 + idx * 14}px) scale(${0.96 - idx * 0.05})`,
                    filter: 'blur(4px)',
                    opacity: 0.3,
                  }}
                >
                  <div className="w-full max-w-5xl h-full">
                    <FlashcardItem card={c} showActions={false} mode="study" className="pointer-events-none" />
                  </div>
                </div>
              ))}
              <div className="relative w-full max-w-5xl">
                <div className="absolute inset-4 sm:inset-6 bg-gradient-to-b from-emerald-500/10 via-transparent to-purple-500/10 blur-3xl rounded-3xl pointer-events-none" />
                <FlashcardItem
                  card={card}
                  onReveal={() => {}}
                  onDelete={() => {}}
                  onEdit={() => {}}
                  mode="study"
                  showActions={false}
                  onFlip={onFlip}
                  isExternallyFlipped={isFlipped}
                  animationSpeed={settings.animationSpeed}
                  autoFlip={settings.autoFlip}
                  autoFlipDelay={settings.animationSpeed === 'fast' ? 1200 : 1500}
                  isExiting={isExiting}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-3">
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-white px-7 py-3.5 text-base font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0 transition min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                canProceed ? '' : 'opacity-60 cursor-not-allowed'
              }`}
            >
              Next Card
            </button>
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 text-slate-200 px-5 py-3 font-semibold hover:bg-slate-800 transition min-h-[44px]"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyMode;
