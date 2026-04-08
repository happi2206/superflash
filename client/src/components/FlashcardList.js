import React from 'react';
import FlashcardItem from './FlashcardItem';

function FlashcardList({ cards, onReveal, onDelete, onEdit }) {
  if (!cards.length) {
    return (
      <div className="text-center text-slate-400 text-sm py-12 bg-slate-900/60 border border-dashed border-slate-700 rounded-2xl">
        No flashcards yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card) => (
        <FlashcardItem
          key={card.id}
          card={card}
          onReveal={onReveal}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default FlashcardList;
