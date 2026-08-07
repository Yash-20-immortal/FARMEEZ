export const StatsManager = {
  logAction: (stats, action) => {
    return {
      ...stats,
      [action]: (stats[action] || 0) + 1
    };
  },

  addActivity: (activities, type, title, xpEarned) => {
    const newActivity = { 
      type, 
      title, 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), 
      xp: xpEarned 
    };
    return [newActivity, ...activities].slice(0, 5); // Keep last 5
  }
};
