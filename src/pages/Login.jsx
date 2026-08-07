import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, User, ArrowRight, CheckCircle2, Lock, Unlock, AlertCircle } from 'lucide-react';
import { SaveManager } from '../managers/SaveManager';
import Button from '../components/ui/Button';
import { useGame } from '../components/GameContext'; // needed for reload or we can just reload the page

const AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer1&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer2&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer3&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer4&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer5&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer6&backgroundColor=d1d4f9',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer7&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Farmer8&backgroundColor=ffdfbf',
];

export default function Login() {
  const navigate = useNavigate();
  
  const [view, setView] = useState('login'); // 'login', 'register', 'migrate'
  
  // Form fields
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState('');

  // Check current session or legacy data
  useEffect(() => {
    // If a user is already logged in, skip to dashboard
    if (SaveManager.getCurrentUsername()) {
      navigate('/app', { replace: true });
      return;
    }

    // Check for legacy un-migrated save
    if (SaveManager.hasLegacySave()) {
      const legacyData = SaveManager.getLegacySave();
      if (legacyData?.profile) {
        setDisplayName(legacyData.profile.displayName || 'EcoFarmer');
        setUsername(legacyData.profile.username ? legacyData.profile.username.replace('@', '') : 'ecofarmer');
        if (legacyData.profile.avatar) {
          setSelectedAvatar(legacyData.profile.avatar);
        }
      }
      setView('migrate');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    const user = SaveManager.getUser(formattedUsername);

    if (!user || user.password !== password) {
      setError('Invalid username or password.');
      return;
    }

    SaveManager.login(formattedUsername, rememberMe);
    window.location.href = '/app'; // Hard reload to initialize context properly
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (!displayName.trim()) {
      setError('Player Name cannot be empty.');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const formattedUsername = username.startsWith('@') ? username : `@${username}`;

    try {
      SaveManager.registerUser(formattedUsername, password, displayName.trim(), selectedAvatar, {});
      SaveManager.login(formattedUsername, true); // Auto-login on register
      window.location.href = '/app'; // Navigate via full reload for fresh context
    } catch (err) {
      setError(err.message || 'Error creating account.');
    }
  };

  const handleMigrate = (e) => {
    e.preventDefault();
    setError('');
    
    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const formattedUsername = username.startsWith('@') ? username : `@${username}`;
    const legacyData = SaveManager.getLegacySave() || {};

    try {
      SaveManager.registerUser(formattedUsername, password, displayName.trim(), selectedAvatar, legacyData);
      SaveManager.clearLegacySave(); // Delete old unencrypted save
      SaveManager.login(formattedUsername, true);
      window.location.href = '/app';
    } catch (err) {
      setError(err.message || 'Error migrating account.');
    }
  };

  return (
    <div className="min-h-screen bg-farm-bg font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-farm-sky-light rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-farm-green-light rounded-full blur-3xl opacity-40 -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 z-10">
        
        {/* Left Side: Welcome */}
        <div className="flex flex-col justify-center animate-fade-in-up">
          <div className="flex items-center gap-3 text-farm-green-dark mb-6">
            <Sprout size={40} />
            <h1 className="text-3xl font-black tracking-tight">FARMEEZ</h1>
          </div>
          
          {view === 'migrate' ? (
            <>
              <h2 className="text-5xl font-black text-slate-800 mb-6 leading-tight">
                Secure Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-400">Farming Legacy</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-8 max-w-md">
                We've upgraded our systems to support multiple accounts! Please set a password to secure your existing farm.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-5xl font-black text-slate-800 mb-6 leading-tight">
                Welcome to <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-farm-green-dark to-farm-green">Sustainable Farming</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-8 max-w-md">
                Log in to resume your farm, or create a new profile to start your agricultural journey and compete on the leaderboard.
              </p>
            </>
          )}
          
          <div className="bg-white/40 p-6 rounded-3xl border border-white/60 glass shadow-sm max-w-md">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
              <CheckCircle2 className="text-farm-green" size={20} /> Local Multi-User Profiles
            </h3>
            <p className="text-sm text-slate-500 font-medium">Your data is stored securely on this device. Multiple users can now share the same device with independent saves.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white/60 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-white shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {view !== 'migrate' && (
            <div className="flex gap-4 mb-8 bg-white/50 p-1.5 rounded-2xl">
              <button 
                onClick={() => { setView('login'); setError(''); }}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${view === 'login' ? 'bg-white shadow-sm text-farm-green-dark' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Log In
              </button>
              <button 
                onClick={() => { setView('register'); setError(''); }}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${view === 'register' ? 'bg-white shadow-sm text-farm-green-dark' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Register
              </button>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 mb-6">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-farm-green/20 focus:border-farm-green transition-all placeholder-slate-400 shadow-sm"
                  placeholder="e.g. yash20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-2">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-farm-green/20 focus:border-farm-green transition-all placeholder-slate-400 shadow-sm"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-farm-green rounded border-slate-300 focus:ring-farm-green"
                />
                <label htmlFor="remember" className="text-sm font-bold text-slate-600 cursor-pointer">Remember me</label>
              </div>

              <Button type="submit" size="lg" className="w-full justify-center text-lg py-4 shadow-md mt-2">
                Log In <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          )}

          {/* REGISTER VIEW */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Player Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-farm-green/20 focus:border-farm-green transition-all placeholder-slate-400 shadow-sm"
                    placeholder="e.g. Yashwanth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-farm-green/20 focus:border-farm-green transition-all placeholder-slate-400 shadow-sm"
                    placeholder="e.g. yash20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-farm-green/20 focus:border-farm-green transition-all placeholder-slate-400 shadow-sm"
                    placeholder="Min 6 chars"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-farm-green/20 focus:border-farm-green transition-all placeholder-slate-400 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-600 mb-3">Choose Your Avatar</label>
                <div className="grid grid-cols-4 gap-3">
                  {AVATARS.map((av, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedAvatar(av)}
                      className={`cursor-pointer rounded-2xl overflow-hidden border-4 transition-all duration-200 ${selectedAvatar === av ? 'border-farm-green scale-105 shadow-md' : 'border-transparent hover:scale-105 bg-white/50'}`}
                    >
                      <img src={av} alt={`Avatar ${idx+1}`} className="w-full h-auto" />
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full justify-center text-lg py-4 shadow-md mt-2">
                Create Account <ArrowRight className="ml-2" size={20} />
              </Button>
            </form>
          )}

          {/* MIGRATE VIEW */}
          {view === 'migrate' && (
            <form onSubmit={handleMigrate} className="flex flex-col gap-5">
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-2">
                <p className="text-amber-800 font-bold text-sm">
                  We found your previous farming progress! Please secure your account by creating a password.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Player Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace(/\s+/g, ''))}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">New Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder-slate-400 shadow-sm"
                    placeholder="Min 6 chars"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-600 mb-2">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder-slate-400 shadow-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full justify-center text-lg py-4 shadow-md mt-4 bg-amber-500 hover:bg-amber-600 text-white border-transparent">
                Secure Account & Play <Lock className="ml-2" size={20} />
              </Button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
