import React from 'react';
import FlashcardForm from './FlashcardForm';
import FlashcardItem from './FlashcardItem';

const categories = ['all', 'React', 'APIs', 'Databases'];

function ManageCards({
  cards,
  onAdd,
  onDeleteRequest,
  onEdit,
  categoryFilter,
  onCategoryFilter,
  searchQuery,
  onSearchQuery,
  selectedCardId,
  exitingCardId,
  isDeleting,
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Add Flashcard</h2>
        </div>
        <FlashcardForm onAdd={onAdd} compact />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryFilter(c)}
              className={`px-3 py-2 rounded-xl text-sm border transition min-h-[44px] ${
                categoryFilter === c
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow shadow-emerald-500/30'
                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-64">
          <input
            value={searchQuery}
            onChange={(e) => onSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/60 text-sm"
          />
        </div>
      </div>

      {cards.length === 0 ? (
        <div className="text-center text-slate-400 text-sm py-12 bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl">
          <p className="font-medium text-slate-200">No flashcards yet</p>
          <p className="text-slate-400 mt-1">Add your first card to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((card) => (
            <FlashcardItem
              key={card.id}
              card={card}
              onReveal={() => {}}
              onDeleteRequest={onDeleteRequest}
              onEdit={onEdit}
              mode="manage"
              showActions
              interactive={false}
              isDeleting={isDeleting && selectedCardId === card.id}
              isExiting={exitingCardId === card.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageCards;
