import React from 'react';

function DeleteConfirmModal({ isOpen, isDeleting, errorMessage, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl p-6 animate-[popIn_220ms_ease-out]">
        <h3 className="text-xl font-semibold text-white">Delete Flashcard?</h3>
        <p className="text-slate-400 mt-2">This action cannot be undone.</p>

        {errorMessage && (
          <p className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto rounded-xl border border-slate-700 bg-slate-800/80 text-slate-200 px-4 py-2.5 font-semibold transition min-h-[44px] hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto rounded-xl border border-rose-400/40 bg-rose-500 text-white px-4 py-2.5 font-semibold shadow-lg shadow-rose-500/25 transition min-h-[44px] hover:bg-rose-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
