import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { GAME_CONFIG } from '../gameConfig';
import { FARMING_EVENTS } from '../data/eventData';
import { SaveManager } from '../managers/SaveManager';
import { ProgressManager } from '../managers/ProgressManager';
import { StatsManager } from '../managers/StatsManager';
import { AchievementManager } from '../managers/AchievementManager';
import { CROP_DATABASE } from '../data/cropDatabase';

const GameContext = createContext();

const initialInventory = {};
const initialSeedInventory = {
  wheat: 10,
  corn: 5,
  carrot: 5
};

Object.keys(CROP_DATABASE).forEach(crop => {
  initialInventory[crop] = 0;
  if (initialSeedInventory[crop] === undefined) {
    initialSeedInventory[crop] = 0;
  }
});

const DEFAULT_STATE = {
  level: 1,
  xp: 0,
  lifetimeXp: 0,
  coins: 50,
  season: 'spring',
  autoCycle: false,
  stats: {
    planted: 0,
    watered: 0,
    harvested: 0,
    cropHarvests: {},
    seasonHarvests: {},
    totalExpenses: 0,
    viewedCropTutorials: {},
    seedsPurchased: 0,
    seedsPlanted: 0,
    seedsWasted: 0,
    moneySpentOnSeeds: 0
  },
  learningProgress: {
    passedQuizzes: 0,
    scores: {}
  },
  profile: {
    displayName: 'EcoFarmer',
    username: '@ecofarmer',
    avatar: null
  },
  inventory: initialInventory,
  seedInventory: initialSeedInventory,
  marketStats: {
    lifetimeEarnings: 0,
    todayEarnings: 0,
    totalItemsSold: 0,
    cropSales: {}
  },
  activeEvent: null,
  eventHistory: [],
  ecoScore: 100,
  harvestsSinceLastEvent: 0,
  farmLog: [],
  achievements: GAME_CONFIG.defaultAchievements,
  activities: [],
  
  // Onboarding State
  welcomeCompleted: false,
  storyCompleted: false,
  tutorialCompleted: false,
  mentorIntroduced: false
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => {
    const loaded = SaveManager.load(DEFAULT_STATE);
    // Legacy migration for seed mechanics
    if (!loaded.seedInventory) {
      loaded.seedInventory = { ...initialSeedInventory };
    }
    if (loaded.stats.seedsPurchased === undefined) {
      loaded.stats.seedsPurchased = 0;
      loaded.stats.seedsPlanted = 0;
      loaded.stats.seedsWasted = 0;
      loaded.stats.moneySpentOnSeeds = 0;
    }
    return loaded;
  });

  // Auto-Save whenever gameState changes, as long as a user is logged in
  useEffect(() => {
    if (SaveManager.getCurrentUsername()) {
      SaveManager.save(gameState);
    }
  }, [gameState]);

  // Season Auto-Cycle Logic (moved from SeasonContext)
  useEffect(() => {
    if (!gameState.autoCycle) return;
    const timer = setInterval(() => {
      setGameState(prev => {
        const nextIndex = (GAME_CONFIG.seasons.indexOf(prev.season) + 1) % GAME_CONFIG.seasons.length;
        return { ...prev, season: GAME_CONFIG.seasons[nextIndex] };
      });
    }, GAME_CONFIG.seasonAutoCycleTime);
    return () => clearInterval(timer);
  }, [gameState.autoCycle]);

  // General Updater
  const dispatchUpdate = (updates) => {
    setGameState(prev => {
      const newState = { ...prev, ...updates };
      // Always run achievement check after any update
      const { newAchievements, unlockedAny } = AchievementManager.checkAchievements(
        newState.achievements, newState.stats, newState.level, newState.coins
      );
      if (unlockedAny) {
        newState.achievements = newAchievements;
      }
      return newState;
    });
  };

  const getRequiredXP = (level) => ProgressManager.getRequiredXP(level);

  const addXP = (amount, silent = false) => {
    setGameState(prev => {
      const { newLevel, newXp, leveledUp } = ProgressManager.addXP(prev.level, prev.xp, amount, prev.learningProgress.passedQuizzes, silent);
      const newLifetimeXp = (prev.lifetimeXp || 0) + amount;
      const newState = { ...prev, level: newLevel, xp: newXp, lifetimeXp: newLifetimeXp };
      
      const { newAchievements, unlockedAny } = AchievementManager.checkAchievements(
        newState.achievements, newState.stats, newState.level, newState.coins
      );
      if (unlockedAny) {
        newState.achievements = newAchievements;
      }
      return newState;
    });
  };

  const passQuiz = (courseId, lessonId, score) => {
    setGameState(prev => {
      const quizKey = `${courseId}_${lessonId}`;
      if (prev.learningProgress.scores[quizKey]) return prev; // Already passed

      const newLearningProgress = {
        passedQuizzes: prev.learningProgress.passedQuizzes + 1,
        scores: {
          ...prev.learningProgress.scores,
          [quizKey]: score
        }
      };

      // Add a small XP reward for passing a quiz
      const { newLevel, newXp } = ProgressManager.addXP(prev.level, prev.xp, 25, newLearningProgress.passedQuizzes, false);
      
      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        learningProgress: newLearningProgress
      };
    });
  };

  const setSeason = (season) => dispatchUpdate({ season });
  const setAutoCycle = (autoCycle) => dispatchUpdate({ autoCycle });

  const plantCrop = (type) => {
    const xpReward = GAME_CONFIG.rewards.plant.xp;
    addXP(xpReward, true);
    setGameState(prev => {
      const newSeedInventory = {
        ...prev.seedInventory,
        [type]: Math.max(0, (prev.seedInventory[type] || 0) - 1)
      };
      const newStats = {
        ...StatsManager.logAction(prev.stats, 'planted'),
        seedsPlanted: (prev.stats.seedsPlanted || 0) + 1
      };
      const newActivities = StatsManager.addActivity(prev.activities, 'plant', `Planted ${type}`, xpReward);
      
      return { ...prev, seedInventory: newSeedInventory, stats: newStats, activities: newActivities };
    });
  };

  const waterCrop = () => {
    const xpReward = GAME_CONFIG.rewards.water.xp;
    addXP(xpReward, true);
    setGameState(prev => {
      const newStats = StatsManager.logAction(prev.stats, 'watered');
      const newActivities = StatsManager.addActivity(prev.activities, 'water', `Watered a crop`, xpReward);
      
      return { ...prev, stats: newStats, activities: newActivities };
    });
  };

  const harvestCrop = (type) => {
    const reward = GAME_CONFIG.rewards.crops[type] || { coins: 5, xp: 5 };
    addXP(reward.xp, true);
    setGameState(prev => {
      // Add to inventory instead of immediately awarding coins
      const newInventory = {
        ...prev.inventory,
        [type]: (prev.inventory[type] || 0) + 1
      };
      const newStats = {
        ...StatsManager.logAction(prev.stats, 'harvested'),
        cropHarvests: {
          ...(prev.stats.cropHarvests || {}),
          [type]: (prev.stats.cropHarvests?.[type] || 0) + 1
        },
        seasonHarvests: {
          ...(prev.stats.seasonHarvests || {}),
          [prev.season]: (prev.stats.seasonHarvests?.[prev.season] || 0) + 1
        }
      };
      const newActivities = StatsManager.addActivity(prev.activities, 'harvest', `Harvested ${type} (Sent to Inventory)`, reward.xp);

      // Event Engine Logic
      let newHarvestsSinceLast = prev.harvestsSinceLastEvent + 1;
      let newActiveEvent = prev.activeEvent;

      if (newHarvestsSinceLast >= 3 && !newActiveEvent) {
        // Filter events allowed in the current season
        const validEvents = Object.values(FARMING_EVENTS).filter(event => 
          event.allowedSeasons.includes(prev.season)
        );
        if (validEvents.length > 0) {
          const randomEvent = validEvents[Math.floor(Math.random() * validEvents.length)];
          newActiveEvent = randomEvent.id;
          newHarvestsSinceLast = 0; // Reset counter
        }
      }

      return { 
        ...prev, 
        inventory: newInventory, 
        stats: newStats, 
        activities: newActivities,
        harvestsSinceLastEvent: newHarvestsSinceLast,
        activeEvent: newActiveEvent
      };
    });
  };

  const logFailedHarvest = (type, reason) => {
    // 2 XP Learning Bonus
    addXP(2, true);
    setGameState(prev => {
      const logEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        season: prev.season,
        type,
        isFailure: true,
        reason: reason || 'Incorrect season'
      };
      
      const newFarmLog = [logEntry, ...prev.farmLog].slice(0, 100);
      const newActivities = StatsManager.addActivity(prev.activities, 'harvest_failed', `Failed to harvest ${type}`, 2);
      
      return {
        ...prev,
        stats: {
          ...prev.stats,
          seedsWasted: (prev.stats.seedsWasted || 0) + 1
        },
        farmLog: newFarmLog,
        activities: newActivities
      };
    });
  };

  const resolveEvent = (choiceId) => {
    setGameState(prev => {
      if (!prev.activeEvent) return prev;

      const eventData = FARMING_EVENTS[prev.activeEvent];
      const choice = eventData.choices.find(c => c.id === choiceId);
      
      if (!choice) return prev;

      const newEcoScore = Math.min(100, Math.max(0, prev.ecoScore + choice.ecoChange));
      const newCoins = Math.max(0, prev.coins - choice.cost);

      const logEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        eventName: eventData.title,
        choiceName: choice.text,
        ecoChange: choice.ecoChange,
        cost: choice.cost,
        takeaway: choice.takeaway
      };

      const newHistory = [logEntry, ...prev.eventHistory].slice(0, 30); // Keep last 30
      const newActivities = StatsManager.addActivity(
        prev.activities, 
        'event', 
        `Resolved ${eventData.title}: ${choice.text}`, 
        choice.ecoChange > 0 ? 10 : 0
      );

      const newStats = {
        ...prev.stats,
        totalExpenses: (prev.stats.totalExpenses || 0) + choice.cost
      };

      return {
        ...prev,
        activeEvent: null,
        ecoScore: newEcoScore,
        coins: newCoins,
        eventHistory: newHistory,
        activities: newActivities,
        stats: newStats
      };
    });
  };

  const sellCrop = (type, quantity, finalTotal, buyerName, bonusPercent) => {
    setGameState(prev => {
      const newInventory = { ...prev.inventory, [type]: Math.max(0, prev.inventory[type] - quantity) };
      const newCoins = prev.coins + finalTotal;
      
      const newCropSales = { ...prev.marketStats.cropSales, [type]: (prev.marketStats.cropSales[type] || 0) + finalTotal };
      
      const newMarketStats = {
        ...prev.marketStats,
        lifetimeEarnings: prev.marketStats.lifetimeEarnings + finalTotal,
        todayEarnings: prev.marketStats.todayEarnings + finalTotal,
        totalItemsSold: prev.marketStats.totalItemsSold + quantity,
        cropSales: newCropSales
      };

      const logEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        season: prev.season,
        type,
        quantity,
        total: finalTotal,
        buyer: buyerName,
        bonus: bonusPercent
      };
      
      // Keep only the last 100 log entries to save localstorage space while allowing rich analytics
      const newFarmLog = [logEntry, ...prev.farmLog].slice(0, 100);

      const newActivities = StatsManager.addActivity(prev.activities, 'sell', `Sold ${quantity} ${type} for ₹${finalTotal}`, 10);
      
      return {
        ...prev,
        coins: newCoins,
        inventory: newInventory,
        marketStats: newMarketStats,
        farmLog: newFarmLog,
        activities: newActivities
      };
    });
  };

  const buySeeds = (type, amount, totalCost) => {
    setGameState(prev => {
      if (prev.coins < totalCost) return prev;
      
      const newCoins = prev.coins - totalCost;
      const newSeedInventory = {
        ...prev.seedInventory,
        [type]: (prev.seedInventory[type] || 0) + amount
      };
      
      const newStats = {
        ...prev.stats,
        seedsPurchased: (prev.stats.seedsPurchased || 0) + amount,
        moneySpentOnSeeds: (prev.stats.moneySpentOnSeeds || 0) + totalCost,
        totalExpenses: (prev.stats.totalExpenses || 0) + totalCost
      };

      const newActivities = StatsManager.addActivity(prev.activities, 'buy', `Bought ${amount} ${type} seeds for ₹${totalCost}`, 5);

      return {
        ...prev,
        coins: newCoins,
        seedInventory: newSeedInventory,
        stats: newStats,
        activities: newActivities
      };
    });
  };

  const updateProfile = (profileData) => {
    dispatchUpdate({ profile: { ...gameState.profile, ...profileData } });
  };

  const logout = () => {
    SaveManager.logout();
    setGameState(DEFAULT_STATE);
  };

  const deleteAccount = () => {
    const currentUsername = SaveManager.getCurrentUsername();
    if (currentUsername) {
      SaveManager.deleteAccount(currentUsername);
      setGameState(DEFAULT_STATE);
    }
  };

  // Onboarding controls
  const completeWelcome = () => {
    dispatchUpdate({ welcomeCompleted: true });
  };
  const completeStory = () => {
    dispatchUpdate({ storyCompleted: true });
  };
  const completeTour = () => {
    dispatchUpdate({ tutorialCompleted: true });
  };
  const skipTutorial = () => {
    dispatchUpdate({ 
      welcomeCompleted: true,
      storyCompleted: true,
      tutorialCompleted: true, 
      mentorIntroduced: true
    });
  };
  const completeMentor = () => {
    dispatchUpdate({ mentorIntroduced: true });
  };

  const markCropTutorialViewed = (cropId) => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        viewedCropTutorials: {
          ...(prev.stats.viewedCropTutorials || {}),
          [cropId]: true
        }
      }
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => ({
    ...gameState,
    getRequiredXP,
    plantCrop,
    waterCrop,
    harvestCrop,
    setSeason,
    setAutoCycle,
    passQuiz,
    updateProfile,
    sellCrop,
    resolveEvent,
    logout,
    deleteAccount,
    completeWelcome,
    completeStory,
    completeTour,
    skipTutorial,
    completeMentor,
    markCropTutorialViewed,
    logFailedHarvest,
    buySeeds
  }), [gameState]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
