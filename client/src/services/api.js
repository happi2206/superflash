const API_BASE_URL = 'http://localhost:5050';

const request = async (path, options = {}) => {
  const hasBody = options.body != null;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || 'Request failed');
  }

  return payload;
};

export const normalizeCard = (card) => ({
  id: card._id || card.id,
  question: card.question,
  answer: card.answer,
  category: card.category || 'React',
  difficulty: card.difficulty || 'medium',
  createdAt: card.createdAt,
  updatedAt: card.updatedAt,
});

export const fetchCards = async () => {
  const cards = await request('/cards');
  return cards.map(normalizeCard);
};

export const createCard = async (card) => {
  const savedCard = await request('/cards', {
    method: 'POST',
    body: JSON.stringify(card),
  });

  return normalizeCard(savedCard);
};

export const updateCard = async (id, card) => {
  const savedCard = await request(`/cards/${id}`, {
    method: 'PUT',
    body: JSON.stringify(card),
  });

  return normalizeCard(savedCard);
};

export const deleteCard = async (id) => request(`/cards/${id}`, { method: 'DELETE' });