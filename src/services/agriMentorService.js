import { CROP_MARKET_DATA, calculateCurrentPrice } from '../data/marketData';
import { FARMING_EVENTS } from '../data/eventData';
import { COURSES } from '../data/coursesData';

const API_BASE = 'http://localhost:5000/api/agri-mentor';

/**
 * Builds a clean, structured game summary from raw React state.
 * This is the ONLY data sent to the server — never raw React state.
 * No Gemini SDK here. All AI calls go through Express.
 */
export function buildGameSummary(gameState, currentSeason) {
  const { level, xp, lifetimeXp, coins, ecoScore, stats, inventory,
    marketStats, learningProgress, achievements, activeEvent, eventHistory } = gameState;

  // Build market prices from real data
  const marketPrices = {};
  Object.entries(CROP_MARKET_DATA).forEach(([cropId, cropData]) => {
    const demand = cropData.seasonDemand[currentSeason];
    marketPrices[cropId] = {
      name: cropData.name,
      basePrice: cropData.basePrice,
      currentPrice: calculateCurrentPrice(cropId, currentSeason),
      demand: demand.status,
      trend: demand.trend,
      reason: demand.reason
    };
  });

  // Find best market opportunity
  const bestMarketCrop = Object.entries(marketPrices).reduce((best, [id, data]) => {
    if (data.demand === 'high' && (inventory[id] || 0) > 0) return best || { id, ...data };
    return best;
  }, null);

  // Build learning summary
  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  let nextLesson = null;
  for (const course of COURSES) {
    for (const lesson of course.lessons) {
      if (!learningProgress.scores[`${course.id}_${lesson.id}`]) {
        nextLesson = { courseTitle: course.title, lessonTitle: lesson.title, requiredLevel: lesson.requiredFarmLevel };
        break;
      }
    }
    if (nextLesson) break;
  }

  // Recent player actions for session memory
  const recentActions = (gameState.activities || []).slice(0, 5).map(a => a.description || a.action);

  // Active event details
  let activeEventData = null;
  if (activeEvent && FARMING_EVENTS[activeEvent]) {
    activeEventData = {
      id: activeEvent,
      title: FARMING_EVENTS[activeEvent].title,
      description: FARMING_EVENTS[activeEvent].description
    };
  }

  return {
    player: {
      level,
      currentXp: xp,
      lifetimeXp: lifetimeXp || 0,
      coins,
      ecoScore: ecoScore || 100,
      farmingStats: {
        cropPlanted: stats.planted,
        timesWatered: stats.watered,
        totalHarvests: stats.harvested
      },
      seedInventory: gameState.seedInventory || {}
    },
    season: currentSeason,
    activeEvent: activeEventData,
    inventory: Object.entries(inventory).map(([crop, qty]) => ({
      crop: CROP_MARKET_DATA[crop]?.name || crop,
      quantity: qty
    })).filter(i => i.quantity > 0),
    market: {
      currentPrices: marketPrices,
      bestOpportunity: bestMarketCrop,
      lifetimeSales: marketStats.lifetimeEarnings,
      recentSales: (gameState.farmLog || []).slice(0, 3).map(l => ({
        crop: l.type, qty: l.quantity, earned: l.total, buyer: l.buyer
      }))
    },
    learning: {
      completedLessons: learningProgress.passedQuizzes,
      totalLessons,
      completionPercent: Math.round((learningProgress.passedQuizzes / totalLessons) * 100),
      nextLesson,
      scores: learningProgress.scores
    },
    sustainability: {
      ecoScore: ecoScore || 100,
      recentEventDecisions: (eventHistory || []).slice(0, 3).map(e => ({
        event: e.eventName,
        choice: e.choiceName,
        ecoImpact: e.ecoChange
      }))
    },
    recentActions,
    unlockedAchievements: (achievements || []).filter(a => a.unlocked).map(a => a.title)
  };
}

/**
 * Sends game summary to Express backend for AI analysis.
 * No Gemini SDK. No API key in the browser.
 */
export async function analyzeGameState(gameSummary) {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameSummary })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Analysis failed');
  }
  return data.analysis;
}

/**
 * Sends a farming question to Express backend for AI answer.
 * No Gemini SDK. No API key in the browser.
 */
export async function askAgriMentor(question, gameSummary) {
  const res = await fetch(`${API_BASE}/question`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, gameSummary })
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Could not answer question');
  }
  return data.answer;
}
