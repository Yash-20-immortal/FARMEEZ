const USERS_KEY = 'farmeez_users';
const CURRENT_USER_KEY = 'farmeez_current_user';
const LEGACY_SAVE_KEY = 'farmeez_save'; // used for backward compatibility checks

export const SaveManager = {
  // Returns all registered users
  getUsers: () => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      if (users) {
        return JSON.parse(users);
      }
    } catch (e) {
      console.error("Failed to load users", e);
    }
    return [];
  },

  // Returns the currently logged in username
  getCurrentUsername: () => {
    return localStorage.getItem(CURRENT_USER_KEY);
  },

  // Log in a user (does not validate password, validation should happen before this)
  login: (username, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem(CURRENT_USER_KEY, username.toLowerCase());
    } else {
      // For prototype, using sessionStorage for non-remembered, but the prompt says Local Storage only.
      // We will just store it in local storage since this is a local offline prototype.
      localStorage.setItem(CURRENT_USER_KEY, username.toLowerCase());
    }
  },

  // Log out the current user
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Find a specific user by username (case-insensitive)
  getUser: (username) => {
    const users = SaveManager.getUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  },

  // Register a new user
  registerUser: (username, password, displayName, avatar, defaultGameState) => {
    const users = SaveManager.getUsers();
    const existing = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      throw new Error("Username already exists");
    }
    const newUser = {
      username: username.toLowerCase(),
      password,
      profile: {
        displayName,
        username,
        avatar
      },
      ...defaultGameState,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  // Load the current user's state. If no user is logged in, return defaultState.
  load: (defaultState) => {
    const currentUsername = SaveManager.getCurrentUsername();
    if (currentUsername) {
      const user = SaveManager.getUser(currentUsername);
      if (user) {
        // Return a merged state so new fields added in updates don't break existing saves
        return { ...defaultState, ...user };
      }
    }
    return defaultState;
  },
  
  // Save the current state for the logged-in user
  save: (state) => {
    const currentUsername = SaveManager.getCurrentUsername();
    if (!currentUsername) return; // don't save if no one is logged in

    const users = SaveManager.getUsers();
    const userIndex = users.findIndex(u => u.username.toLowerCase() === currentUsername.toLowerCase());
    
    if (userIndex !== -1) {
      // Merge the new state into the user's existing data (keeps password intact)
      users[userIndex] = { ...users[userIndex], ...state };
      try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } catch (e) {
        console.error("Failed to save user state", e);
      }
    }
  },

  // Delete an account
  deleteAccount: (username) => {
    let users = SaveManager.getUsers();
    users = users.filter(u => u.username.toLowerCase() !== username.toLowerCase());
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    if (SaveManager.getCurrentUsername()?.toLowerCase() === username.toLowerCase()) {
      SaveManager.logout();
    }
  },

  // Legacy Check
  hasLegacySave: () => {
    return !!localStorage.getItem(LEGACY_SAVE_KEY);
  },

  getLegacySave: () => {
    try {
      const saved = localStorage.getItem(LEGACY_SAVE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return null;
  },

  clearLegacySave: () => {
    localStorage.removeItem(LEGACY_SAVE_KEY);
    // Also remove the old farmeez_player if it exists
    localStorage.removeItem('farmeez_player');
  }
};
