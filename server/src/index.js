require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./config/database');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

/* ────────── Middleware ────────── */
app.use(cors());
app.use(express.json());

/* ────────── Routes ────────── */
app.get('/', (_req, res) => {
  res.json({ message: 'Library Management System API' });
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/loans', loanRoutes);

/* ────────── Инициализация на БД и старт ────────── */
async function initDatabase() {
  try {
    const initSQL = fs.readFileSync(
      path.join(__dirname, 'db', 'init.sql'),
      'utf-8',
    );
    await db.query(initSQL);
    console.log('✅  Базата данни е инициализирана.');
  } catch (err) {
    console.error('❌  Грешка при инициализация на БД:', err.message);
  }
}

async function start() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`🚀  Сървърът работи на http://localhost:${PORT}`);
  });
}

start();
