import { GAME_CONFIG } from '../gameConfig';

export const ProgressManager = {
  getRequiredXP: (level) => {
    return (level * GAME_CONFIG.leveling.multiplier) + GAME_CONFIG.leveling.baseRequiredXP;
  },

  addXP: (currentLevel, currentXp, amount, passedQuizzes, silent = false) => {
    let newXp = currentXp + amount;
    let newLevel = currentLevel;
    let requiredXp = ProgressManager.getRequiredXP(newLevel);
    let leveledUp = false;

    // Continuous Leveling: You can level up infinitely as long as you have enough XP
    while (newXp >= requiredXp) {
      newXp -= requiredXp;
      newLevel += 1;
      requiredXp = ProgressManager.getRequiredXP(newLevel);
      leveledUp = true;
    }

    if (leveledUp && !silent) {
      // Small celebration since we can't edit 3D
      alert(`🎉 Level Up! You are now Level ${newLevel}!`);
    }

    return { newLevel, newXp, leveledUp };
  }
};
