import { Router } from 'express';
import { analyzeGameState, askAgriMentor } from '../services/agriMentorService.js';

const router = Router();

/**
 * POST /api/agri-mentor/analyze
 * Receives a pre-built game summary from the frontend and returns AI analysis.
 */
router.post('/analyze', async (req, res) => {
  try {
    const { gameSummary } = req.body;
    if (!gameSummary) {
      return res.status(400).json({ error: 'gameSummary is required' });
    }
    const analysis = await analyzeGameState(gameSummary);
    res.json({ success: true, analysis });
  } catch (err) {
    console.error('[AgriMentor] /analyze error:', err.message);
    res.status(500).json({ success: false, error: 'Agri Mentor is temporarily unavailable. Please try again.' });
  }
});

/**
 * POST /api/agri-mentor/question
 * Receives a question + game summary from the frontend and returns an AI answer.
 */
router.post('/question', async (req, res) => {
  try {
    const { question, gameSummary } = req.body;
    if (!question || !gameSummary) {
      return res.status(400).json({ error: 'question and gameSummary are required' });
    }
    const answer = await askAgriMentor(question, gameSummary);
    res.json({ success: true, answer });
  } catch (err) {
    console.error('[AgriMentor] /question error:', err.message);
    res.status(500).json({ success: false, error: 'Agri Mentor could not answer your question right now. Please try again.' });
  }
});

export default router;
