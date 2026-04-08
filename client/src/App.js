import React, { useEffect, useMemo, useState } from 'react';
import FlashcardForm from './components/FlashcardForm';
import Navbar from './components/Navbar';
import StudyMode from './components/StudyMode';
import ManageCards from './components/ManageCards';
import SettingsPanel from './components/Settings';
import StartScreen from './components/StartScreen';
import LandingPage from './components/LandingPage';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import { createCard, deleteCard as deleteCardRequest, fetchCards, updateCard as updateCardRequest } from './services/api';

const initialSettings = {
  shuffle: true,
  autoFlip: false,
  autoNext: true,
  timerEnabled: true,
  timePerCard: 10,
  animationSpeed: 'normal',
};

function App() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [finished, setFinished] = useState(false);
  const [view, setView] = useState('study');
  const [order, setOrder] = useState([]);
  const [settings, setSettings] = useState(initialSettings);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [showLanding, setShowLanding] = useState(true);
  const [isLandingExiting, setIsLandingExiting] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [exitingCardId, setExitingCardId] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const reshuffleOrder = (list = cards, doShuffle = settings.shuffle) => {
    const weightedIds = [];
    list.forEach((card) => {
      const weight = card.difficulty === 'hard' ? 3 : card.difficulty === 'medium' ? 2 : 1;
      for (let index = 0; index < weight; index += 1) {
        weightedIds.push(card.id);
      }
    });

    const ids = doShuffle ? [...weightedIds] : list.map((card) => card.id);

    if (doShuffle) {
      for (let index = ids.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [ids[index], ids[randomIndex]] = [ids[randomIndex], ids[index]];
      }
    }

    setOrder(ids);
    setCurrentIndex(0);
    setIsFlipped(false);
    setFinished(false);
    setSessionStarted(false);
  };

  const loadCards = async () => {
    setIsLoading(true);
    setLoadError('');

    try {
      const remoteCards = await fetchCards();
      setCards(remoteCards);
      reshuffleOrder(remoteCards, settings.shuffle);
      setActionError('');
    } catch (error) {
      setLoadError(error.message || 'Failed to load cards');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCards();
  }, []);

  const handleAdd = async ({ question, answer, category, difficulty }) => {
    setActionError('');

    try {
      const savedCard = await createCard({ question, answer, category, difficulty });
      const nextCards = [savedCard, ...cards];

      setCards(nextCards);
      reshuffleOrder(nextCards, settings.shuffle);
      setShowModal(false);
      return true;
    } catch (error) {
      setActionError(error.message || 'Unable to add card');
      return false;
    }
  };

  const removeCardFromState = (id) => {
    const nextCards = cards.filter((card) => card.id !== id);
    const nextOrder = order.filter((cardId) => cardId !== id);

    setCards(nextCards);
    setOrder(nextOrder);

    if (nextOrder.length === 0) {
      setFinished(true);
      setCurrentIndex(0);
    } else if (currentIndex >= nextOrder.length) {
      setCurrentIndex(Math.max(0, nextOrder.length - 1));
    }

    setIsFlipped(false);
  };

  const handleDeleteRequest = (id) => {
    setDeleteError('');
    setSelectedCardId(id);
  };

  const handleDeleteCancel = () => {
    if (isDeleting) return;
    setSelectedCardId(null);
    setDeleteError('');
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCardId) return;
    setIsDeleting(true);
    setDeleteError('');
    setActionError('');

    try {
      await deleteCardRequest(selectedCardId);
      setExitingCardId(selectedCardId);

      setTimeout(() => {
        removeCardFromState(selectedCardId);
        setExitingCardId(null);
        setSelectedCardId(null);
        setIsDeleting(false);
      }, 320);
    } catch (error) {
      const message = error.message || 'Unable to delete card';
      setDeleteError(message);
      setActionError(message);
      setIsDeleting(false);
    }
  };

  const handleEdit = async (id, updatedCard) => {
    setActionError('');

    try {
      const savedCard = await updateCardRequest(id, updatedCard);
      setCards((previousCards) => previousCards.map((card) => (card.id === id ? savedCard : card)));
      return true;
    } catch (error) {
      setActionError(error.message || 'Unable to update card');
      return false;
    }
  };

  const handleFlip = () => setIsFlipped(true);

  const handleNext = () => {
    if (currentIndex < order.length - 1) {
      setCurrentIndex((previousIndex) => previousIndex + 1);
      setIsFlipped(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setFinished(false);
  };

  const orderedCurrentCard = useMemo(() => {
    const id = order[currentIndex];
    return cards.find((card) => card.id === id);
  }, [cards, currentIndex, order]);

  const filteredCards = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesCategory = categoryFilter === 'all' || card.category === categoryFilter;
      const matchesSearch = !normalizedQuery || card.question.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  }, [cards, categoryFilter, searchQuery]);

  const progress = order.length ? ((currentIndex + (finished ? 1 : 0)) / order.length) * 100 : 0;

  const handleEnterApp = () => {
    setIsLandingExiting(true);

    setTimeout(() => {
      setShowLanding(false);
      setIsLandingExiting(false);
      setView('study');
      setSessionStarted(false);
    }, 260);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
          <Navbar current={view} onChange={(nextView) => setView(nextView)} />
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl px-8 py-14 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
            <h1 className="text-3xl font-semibold text-white">Loading flashcards</h1>
            <p className="text-slate-400">Connecting to the backend and fetching your deck.</p>
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
          <Navbar current={view} onChange={(nextView) => setView(nextView)} />
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 shadow-2xl px-8 py-14 text-center space-y-4">
            <h1 className="text-3xl font-semibold text-rose-100">Unable to load flashcards</h1>
            <p className="text-rose-100/80 max-w-2xl mx-auto">{loadError}</p>
            <button
              onClick={loadCards}
              className="inline-flex items-center justify-center rounded-xl bg-rose-500 text-white px-5 py-3 font-semibold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-14 space-y-6 sm:space-y-8">
        {!showLanding && <Navbar current={view} onChange={(nextView) => setView(nextView)} />}

        {showLanding && (
          <div
            className={`transition-all duration-300 ${
              isLandingExiting ? 'opacity-0 scale-[0.985] translate-y-1' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <LandingPage cards={cards} onStart={handleEnterApp} />
          </div>
        )}

        {!showLanding && (
          <>

            {actionError && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {actionError}
              </div>
            )}

            {view === 'study' && (
              (sessionStarted ? (
                <StudyMode
                  card={orderedCurrentCard}
                  stackCards={order
                    .slice(currentIndex, currentIndex + 3)
                    .map((cardId) => cards.find((card) => card.id === cardId))
                    .filter(Boolean)}
                  isFlipped={isFlipped}
                  onFlip={handleFlip}
                  onNext={handleNext}
                  onRestart={() => reshuffleOrder()}
                  progressText={
                    order.length ? `Card ${finished ? order.length : currentIndex + 1} of ${order.length}` : 'No cards'
                  }
                  progressPercent={progress}
                  finished={finished || order.length === 0}
                  settings={settings}
                  totalCount={order.length}
                />
              ) : (
                <StartScreen
                  cards={cards}
                  settings={settings}
                  onTimeChange={(nextTimePerCard) => {
                    setSettings((previousSettings) => ({ ...previousSettings, timePerCard: nextTimePerCard }));
                  }}
                  onShuffleChange={(nextShuffle) => {
                    setSettings((previousSettings) => ({ ...previousSettings, shuffle: nextShuffle }));
                  }}
                  onStart={() => {
                    reshuffleOrder(cards, settings.shuffle);
                    setSessionStarted(true);
                  }}
                />
              ))
            )}

            {view === 'manage' && (
              <ManageCards
                cards={filteredCards}
                onAdd={handleAdd}
                onDeleteRequest={handleDeleteRequest}
                onEdit={handleEdit}
                categoryFilter={categoryFilter}
                onCategoryFilter={setCategoryFilter}
                searchQuery={searchQuery}
                onSearchQuery={setSearchQuery}
                selectedCardId={selectedCardId}
                exitingCardId={exitingCardId}
                isDeleting={isDeleting}
              />
            )}

            {view === 'settings' && (
              <SettingsPanel
                settings={settings}
                onChange={(nextSettings) => {
                  const didToggleShuffle = settings.shuffle !== nextSettings.shuffle;
                  setSettings(nextSettings);
                  if (didToggleShuffle) {
                    reshuffleOrder(cards, nextSettings.shuffle);
                  }
                }}
              />
            )}
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur" onClick={() => setShowModal(false)} />
          <div className="relative z-50 w-full max-w-3xl">
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full w-9 h-9 flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <FlashcardForm onAdd={handleAdd} />
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(selectedCardId)}
        isDeleting={isDeleting}
        errorMessage={deleteError}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default App;
