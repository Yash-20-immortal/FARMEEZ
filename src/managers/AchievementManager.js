export const AchievementManager = {
  checkAchievements: (achievements, stats, level, coins) => {
    let unlockedAny = false;
    
    const newAchievements = achievements.map(a => {
      if (a.unlocked) return a; // already unlocked

      let shouldUnlock = false;
      
      switch (a.id) {
        case 'first_sprout':
          if (stats.planted >= 1) shouldUnlock = true;
          break;
        case 'first_harvest':
          if (stats.harvested >= 1) shouldUnlock = true;
          break;
        case 'harvest_10':
          if (stats.harvested >= 10) shouldUnlock = true;
          break;
        case 'level_5':
          if (level >= 5) shouldUnlock = true;
          break;
        case 'earn_500':
          // Not tracking lifetime coins explicitly in stats, but current coins can trigger it
          if (coins >= 500) shouldUnlock = true;
          break;
      }

      if (shouldUnlock) {
        unlockedAny = true;
        return { ...a, unlocked: true, date: "Just now" };
      }
      return a;
    });

    return { newAchievements, unlockedAny };
  }
};
