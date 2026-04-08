import React, { useState } from 'react';

function FlashcardItem({
  card,
  onReveal,
  onDelete,
  onDeleteRequest,
  onEdit,
  mode = 'grid',
  showActions = true,
  onFlip,
  isExternallyFlipped,
  animationSpeed = 'normal',
  autoFlip = false,
  autoFlipDelay = 800,
  className = '',
  style = {},
  isExiting = false,
  interactive = true,
  isDeleting = false,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuestion, setEditQuestion] = useState(card.question);
  const [editAnswer, setEditAnswer] = useState(card.answer);
  const [editCategory, setEditCategory] = useState(card.category || 'React');
  const [editDifficulty, setEditDifficulty] = useState(card.difficulty || 'medium');
  const studyMode = mode === 'study';
  const manageMode = mode === 'manage';
  const flipDuration =
    animationSpeed === 'fast' ? '0.6s' : animationSpeed === 'slow' ? '0.9s' : '0.75s';

  // After showing an answer or deleting, fade the card then remove it from state
  const triggerFadeOut = (removeFn) => {
    setIsFading(true);
    setTimeout(() => removeFn(card.id), 450);
  };

  const handleFlip = () => {
    if (isEditing) return;
    if (!interactive || manageMode) return;
    if (studyMode) {
      setIsFlipped((prev) => !prev);
      onFlip?.();
      return;
    }
    // Flip card to show answer, then fade it away (grid mode)
    if (isFlipped) return;
    setIsFlipped(true);
    setTimeout(() => triggerFadeOut(onReveal), 350);
  };

  const handleDelete = () => {
    if (isEditing) return;
    if (studyMode) {
      onDelete?.(card.id);
    } else {
      onDeleteRequest?.(card.id);
    }
  };

  const handleSave = async () => {
    if (!editQuestion.trim() || !editAnswer.trim()) return;

    try {
      const result = await Promise.resolve(
        onEdit(card.id, {
          ...card,
          question: editQuestion.trim(),
          answer: editAnswer.trim(),
          category: editCategory,
          difficulty: editDifficulty,
        })
      );

      if (result !== false) {
        setIsEditing(false);
      }
    } catch (_error) {
      // The parent app handles request errors.
    }
  };

  React.useEffect(() => {
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    setEditCategory(card.category || 'React');
    setEditDifficulty(card.difficulty || 'medium');
  }, [card]);

  // external flip state for study mode to sync with parent
  React.useEffect(() => {
    if (typeof isExternallyFlipped === 'boolean' && studyMode) {
      setIsFlipped(isExternallyFlipped);
    }
  }, [isExternallyFlipped, studyMode]);

  React.useEffect(() => {
    if (studyMode && autoFlip && !isFlipped) {
      const t = setTimeout(() => {
        setIsFlipped(true);
        onFlip?.();
      }, Math.max(autoFlipDelay, 1200));
      return () => clearTimeout(t);
    }
  }, [autoFlip, autoFlipDelay, isFlipped, onFlip, studyMode]);

  return (
    <div
      className={`card-shell ${isFading ? 'fade-out' : 'pop-in'} ${isFlipped ? 'card-flipped' : ''} ${isExiting ? 'card-exit' : ''} ${
        manageMode
          ? 'w-full max-w-full overflow-hidden bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl p-4 sm:p-6 cursor-default hover:shadow-xl flex flex-col h-full'
          : 'w-full max-w-full overflow-hidden bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 transition-all hover:-translate-y-1 hover:shadow-emerald-500/25 hover:border-emerald-500/30'
      } ${className}`}
      onClick={interactive && !manageMode ? handleFlip : undefined}
      style={style}
    >
      <div
        className="card-inner flex flex-col h-full flex-1"
        style={{ transitionDuration: flipDuration, minHeight: manageMode ? '260px' : undefined }}
      >
        <div className="card-face card-front">
          <div className="flex justify-between items-start gap-2 mb-3">
            <div className="flex items-center gap-2 text-[11px] text-slate-300">
              {manageMode ? (
                <>
                  <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
                    {card.category}
                  </span>
                  <span className="px-2 py-1 rounded-full border border-slate-700 text-slate-200 capitalize">
                    {card.difficulty}
                  </span>
                </>
              ) : (
                <span className="text-[11px] font-semibold tracking-wide uppercase text-emerald-300">Question</span>
              )}
            </div>
            {!manageMode && <span className="text-[11px] text-slate-400">Tap to flip</span>}
          </div>
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 px-3 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70 transition"
                rows={2}
              />
              <textarea
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 px-3 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70 transition"
                rows={2}
              />
              {manageMode && (
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 px-3 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70 transition text-sm"
                  >
                    {['React', 'APIs', 'Databases'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <select
                    value={editDifficulty}
                    onChange={(e) => setEditDifficulty(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 text-slate-100 px-3 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500/70 focus:border-emerald-500/70 transition text-sm"
                  >
                    {['easy', 'medium', 'hard'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            <h3
              className={`${manageMode ? 'text-base sm:text-lg' : 'text-sm sm:text-base md:text-lg'} font-semibold text-slate-50 leading-relaxed break-words whitespace-normal overflow-hidden max-w-full [overflow-wrap:anywhere]`}
            >
              {card.question}
            </h3>
          )}
        </div>

        <div className="card-face card-back">
          <div className="flex justify-between items-start gap-2 mb-4">
            <span className="text-[11px] font-semibold tracking-wide uppercase text-emerald-50">Answer</span>
            <span className="text-[10px] text-emerald-100">Revealed</span>
          </div>
          <p className={`${manageMode ? 'text-sm sm:text-base md:text-lg' : 'text-sm sm:text-base md:text-lg'} text-emerald-50 leading-relaxed break-words whitespace-normal overflow-hidden max-w-full [overflow-wrap:anywhere]`}>
            {card.answer}
          </p>
        </div>
      </div>

      {showActions && (
        <div className="mt-4 flex flex-wrap gap-2 text-sm" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-2 rounded-lg bg-emerald-500 text-white shadow hover:shadow-md transition min-h-[44px]"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 rounded-lg border border-slate-800 text-slate-200 hover:bg-slate-800 transition min-h-[44px]"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isDeleting}
                className="px-3 py-2 rounded-lg border border-slate-800 text-slate-200 hover:bg-slate-800 transition min-h-[44px]"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-2 rounded-lg bg-slate-900/80 text-rose-400 border border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-300 transition min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FlashcardItem;
