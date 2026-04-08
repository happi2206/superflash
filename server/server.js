const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cardRoutes = require('./routes/cardRoutes');
const Card = require('./models/Card');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/superflash_cards';

const starterCards = [
  {
    question: 'Why does React batch state updates inside event handlers but not in setTimeout by default?',
    answer:
      'React batches in synthetic events to reduce renders; timers run outside that scope so updates flush immediately. Since React 18, automatic batching also covers promises and timeouts when using createRoot.',
    category: 'React',
    difficulty: 'hard',
  },
  {
    question: 'When would you choose useLayoutEffect over useEffect?',
    answer:
      'Use useLayoutEffect when you must read layout or synchronously measure DOM before paint, such as positioning a tooltip. It blocks paint, so reserve it for rare visual read/write moments.',
    category: 'React',
    difficulty: 'medium',
  },
  {
    question: 'How do you cancel an in-flight fetch in React to avoid setting state on unmounted components?',
    answer:
      'Create an AbortController, pass controller.signal to fetch, and call controller.abort in the effect cleanup. Guard setState with the signal flag to avoid memory leaks.',
    category: 'APIs',
    difficulty: 'medium',
  },
  {
    question: 'Give a practical example where React memoization (memo/useMemo/useCallback) hurts performance.',
    answer:
      'Memo wrappers add comparison cost; wrapping tiny components or trivial functions can cost more than re-rendering. Use memo only when props are large or rendering causes expensive work.',
    category: 'React',
    difficulty: 'medium',
  },
  {
    question: 'What is the shape of a well-structured REST response for a list endpoint?',
    answer:
      'Return metadata plus data, for example { data: [...], pagination: { page, pageSize, total }, links: { self, next, prev } }. Avoid mixing casing styles and include stable ids.',
    category: 'APIs',
    difficulty: 'easy',
  },
  {
    question: 'How would you debounce a search-as-you-type input that calls a REST API?',
    answer:
      'Use useEffect on the query string, setTimeout to delay the request, clearTimeout on change, and cancel the fetch if input changes. Also ignore responses for stale queries.',
    category: 'APIs',
    difficulty: 'easy',
  },
  {
    question: 'SQL vs NoSQL: when do you prefer each for an analytics dashboard?',
    answer:
      'SQL suits relational, well-structured metrics with joins and ACID guarantees; NoSQL fits high-ingest event logs where schema can evolve. Many teams pair them for different workloads.',
    category: 'Databases',
    difficulty: 'medium',
  },
  {
    question: 'How does an index speed up queries and when can it backfire?',
    answer:
      'Indexes keep ordered references so reads skip full scans, but they slow writes and enlarge storage. Too many indexes hurt bulk inserts and can make the optimizer pick bad plans.',
    category: 'Databases',
    difficulty: 'medium',
  },
  {
    question: 'Explain optimistic UI for a POST /likes request.',
    answer:
      'Immediately update UI and store a rollback token. Fire POST; on failure, revert and show feedback. Use client-generated ids to merge eventual server response without flicker.',
    category: 'APIs',
    difficulty: 'medium',
  },
  {
    question: 'SPA vs MPA: name one perf win and one SEO trade-off for SPAs.',
    answer:
      'Perf win: client-side routing keeps the shell loaded, so transitions are instant. Trade-off: content is rendered client-side, so SEO relies on hydration or pre-rendering.',
    category: 'React',
    difficulty: 'easy',
  },
  {
    question: 'Why should API clients send If-None-Match with ETags?',
    answer:
      'It enables conditional GETs: the server returns 304 when unchanged, saving bandwidth and speeding up loads. It also avoids serving stale cached data when resources change.',
    category: 'APIs',
    difficulty: 'easy',
  },
  {
    question: 'Give an example of idempotent vs non-idempotent HTTP methods in practice.',
    answer:
      'PUT /profile with the full payload is idempotent because repeated calls end in the same state. POST /orders is not; each call creates a new order and changes server state differently.',
    category: 'APIs',
    difficulty: 'easy',
  },
  {
    question: 'How do you structure CRUD endpoints for a resource named session?',
    answer:
      'Use nouns: POST /sessions, GET /sessions/:id, PATCH /sessions/:id, DELETE /sessions/:id. Avoid verbs in paths; use plural for collections and include query params for filters.',
    category: 'APIs',
    difficulty: 'medium',
  },
  {
    question: 'What does connection pooling solve for databases in web backends?',
    answer:
      'Opening DB connections is expensive; a pool reuses them to smooth latency and cap concurrent sessions. It prevents exhausting DB max connections while keeping apps responsive.',
    category: 'Databases',
    difficulty: 'medium',
  },
  {
    question: 'When should you choose axios over fetch in React apps?',
    answer:
      'Axios gives request and response interceptors, automatic JSON transform, and better timeout semantics. Fetch is lighter and built in but needs manual aborting and JSON parsing.',
    category: 'APIs',
    difficulty: 'easy',
  },
];

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/cards', cardRoutes);

async function seedCardsIfNeeded() {
  const cardCount = await Card.countDocuments();

  if (cardCount === 0) {
    await Card.insertMany(starterCards);
    
    console.log(`Seeded ${starterCards.length} starter cards.,`);
  }
}

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    await seedCardsIfNeeded();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();