import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import agriMentorRouter from './routes/agriMentor.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Vite dev server origin
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'FARMEEZ Agri Mentor API' }));

// Routes
app.use('/api/agri-mentor', agriMentorRouter);

// Start
app.listen(PORT, () => {
  console.log(`\n🌱 FARMEEZ Agri Mentor Server running on http://localhost:${PORT}`);
  console.log(`   Groq API Key: ${process.env.GROQ_API_KEY ? '✅ Loaded' : '❌ MISSING – check server/.env'}\n`);
});
