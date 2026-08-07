import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import { useGame } from './GameContext';
import { buildGameSummary, analyzeGameState, askAgriMentor } from '../services/agriMentorService';

const AgriMentorContext = createContext();

export function AgriMentorProvider({ children }) {
  const gameState = useGame();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qaHistory, setQaHistory] = useState([]); // Session Q&A memory
  const lastSeason = useRef(null);

  // Build the structured summary from current game state
  const getGameSummary = useCallback(() => {
    return buildGameSummary(gameState, gameState.season);
  }, [gameState]);

  // Main analysis call — cached per session, only refreshed on demand
  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const summary = getGameSummary();
      lastSeason.current = gameState.season;
      const result = await analyzeGameState(summary);
      setAnalysis(result);
    } catch (err) {
      console.error('[AgriMentor] Analysis failed:', err);
      setError('Agri Mentor is temporarily unavailable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [getGameSummary, gameState.season]);

  // Q&A — attaches game context, stores in session history
  const askQuestion = useCallback(async (question) => {
    const summary = getGameSummary();
    const answer = await askAgriMentor(question, summary);
    const entry = { question, answer, timestamp: new Date().toLocaleTimeString() };
    setQaHistory(prev => [entry, ...prev].slice(0, 10)); // Keep last 10 in session
    return answer;
  }, [getGameSummary]);

  const value = useMemo(() => ({
    analysis, isLoading, error, refresh, askQuestion, qaHistory
  }), [analysis, isLoading, error, refresh, askQuestion, qaHistory]);

  return (
    <AgriMentorContext.Provider value={value}>
      {children}
    </AgriMentorContext.Provider>
  );
}

export function useAgriMentor() {
  const ctx = useContext(AgriMentorContext);
  if (!ctx) throw new Error('useAgriMentor must be used within AgriMentorProvider');
  return ctx;
}
