import { CROP_DATABASE } from './data/cropDatabase';

const cropRewards = {};
Object.keys(CROP_DATABASE).forEach(key => {
  cropRewards[key] = {
    coins: CROP_DATABASE[key].basePrice,
    xp: CROP_DATABASE[key].xpReward
  };
});

export const GAME_CONFIG = {
  // Base Leveling Math
  leveling: {
    baseRequiredXP: 100,
    multiplier: 50 // Required XP = (Level * multiplier) + baseRequiredXP
  },

  // XP & Coin Rewards
  rewards: {
    plant: { xp: 5 },
    water: { xp: 3 },
    crops: cropRewards
  },

  // Seasons
  seasons: ['spring', 'summer', 'autumn', 'winter'],
  seasonAutoCycleTime: 120000, // 2 minutes

  // Default Achievements
  defaultAchievements: [
    { id: 'first_sprout', title: "First Sprout", date: "Locked", unlocked: false, color: "from-green-400 to-green-600" },
    { id: 'first_harvest', title: "First Harvest", date: "Locked", unlocked: false, color: "from-blue-400 to-blue-600" },
    { id: 'harvest_10', title: "Master Farmer", date: "Locked", unlocked: false, color: "from-yellow-400 to-yellow-600" },
    { id: 'level_5', title: "Level 5 Reached", date: "Locked", unlocked: false, color: "from-purple-400 to-purple-600" },
    { id: 'earn_500', title: "Half Thousand Coins", date: "Locked", unlocked: false, color: "from-amber-400 to-amber-600" }
  ]
};
