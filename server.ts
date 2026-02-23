import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('results.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    answers TEXT,
    profile TEXT,
    timestamp DATETIME
  )
`);

// Migration: Add profile column if it doesn't exist
try {
  db.exec('ALTER TABLE results ADD COLUMN profile TEXT');
} catch (e) {
  // Column already exists or other error
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post('/api/results', (req, res) => {
    const { userInfo, answers, profile, timestamp } = req.body;
    try {
      const stmt = db.prepare('INSERT INTO results (name, email, answers, profile, timestamp) VALUES (?, ?, ?, ?, ?)');
      stmt.run(userInfo.name, userInfo.email, JSON.stringify(answers), profile, timestamp);
      res.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to save results' });
    }
  });

  app.get('/api/results', (req, res) => {
    try {
      const results = db.prepare('SELECT * FROM results ORDER BY timestamp DESC').all();
      res.json(results.map(r => ({
        ...r,
        answers: JSON.parse(r.answers as string)
      })));
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch results' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
