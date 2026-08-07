import React, { createContext, useContext, useMemo } from 'react';
import { useGame } from './GameContext';

const SeasonContext = createContext();

export const seasonConfig = {
  spring: {
    name: 'Spring',
    icon: '🌸',
    ground: '#4ade80',
    leaves: '#22c55e',
    roof: '#9a3412',
    sky: '#e0f2fe',
    fog: '#7dd3fc',
    ambient: '#ffffff',
    sun: '#fffaeb',
  },
  summer: {
    name: 'Summer',
    icon: '☀️',
    ground: '#84cc16',
    leaves: '#15803d',
    roof: '#9a3412',
    sky: '#bae6fd',
    fog: '#38bdf8',
    ambient: '#fef08a',
    sun: '#fde047',
  },
  autumn: {
    name: 'Autumn',
    icon: '🍂',
    ground: '#d97706',
    leaves: '#ea580c',
    roof: '#9a3412',
    sky: '#ffedd5',
    fog: '#fdba74',
    ambient: '#fed7aa',
    sun: '#fb923c',
  },
  winter: {
    name: 'Winter',
    icon: '❄️',
    ground: '#f8fafc',
    leaves: '#e2e8f0',
    roof: '#f1f5f9',
    sky: '#f1f5f9',
    fog: '#cbd5e1',
    ambient: '#e0f2fe',
    sun: '#bfdbfe',
  }
};

export function SeasonProvider({ children }) {
  // Pass-through: we consume GameContext so we don't break existing 3D components
  const { season, setSeason, autoCycle, setAutoCycle } = useGame();

  const value = useMemo(() => ({
    season,
    setSeason,
    autoCycle,
    setAutoCycle,
    config: seasonConfig[season]
  }), [season, autoCycle, setSeason, setAutoCycle]);

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  return useContext(SeasonContext);
}
