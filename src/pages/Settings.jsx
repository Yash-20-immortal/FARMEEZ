import React, { useState } from 'react';
import { Settings as SettingsIcon, Volume2, MonitorPlay, Trash2, LogOut } from 'lucide-react';
import { useGame } from '../components/GameContext';

export default function Settings() {
  const [sound, setSound] = useState(true);
  const [animation, setAnimation] = useState(true);

  const { logout, deleteAccount } = useGame();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone and you will lose all progress.")) {
      deleteAccount();
      window.location.href = '/login';
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10">
      <header className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white shadow-soft">
            <SettingsIcon size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Settings</h2>
            <p className="text-slate-500 font-bold text-sm">Configure your FARMEEZ experience</p>
          </div>
        </div>
      </header>

      <div className="glass p-8 rounded-3xl border border-white/60 max-w-2xl">
        
        {/* Toggles */}
        <div className="flex flex-col gap-6 mb-10">
          
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Volume2 size={20}/></div>
              <div>
                <h4 className="font-bold text-slate-800">Sound Effects</h4>
                <p className="text-xs font-medium text-slate-500">Enable UI and farming sounds</p>
              </div>
            </div>
            <Toggle active={sound} onClick={() => setSound(!sound)} />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-farm-green-light text-farm-green-dark rounded-xl"><MonitorPlay size={20}/></div>
              <div>
                <h4 className="font-bold text-slate-800">Animations</h4>
                <p className="text-xs font-medium text-slate-500">Enable UI transitions and micro-animations</p>
              </div>
            </div>
            <Toggle active={animation} onClick={() => setAnimation(!animation)} />
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200">
          <h3 className="text-lg font-black text-slate-800 mb-2">Account Management</h3>
          <p className="text-sm font-medium text-slate-500 mb-6">Manage your session or permanently delete your account.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-600 font-bold rounded-xl border border-slate-200 transition-colors"
            >
              <LogOut size={18} />
              Log Out
            </button>
            <button 
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-100 hover:bg-red-200 text-red-600 font-bold rounded-xl transition-colors"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Toggle({ active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${active ? 'bg-farm-green' : 'bg-slate-300'}`}
    >
      <div 
        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${active ? 'translate-x-6' : 'translate-x-0'}`} 
      />
    </button>
  );
}
