import React, { useState } from 'react';
import { User, Medal, Calendar, Sprout, Wheat, Droplets, Star, Coins, Edit2, LogOut, ShoppingBag, Store, AlertTriangle } from 'lucide-react';
import { useGame } from '../components/GameContext';
import { seasonConfig } from '../components/SeasonContext';
import EditProfileModal from '../components/modals/EditProfileModal';
import FinancialAnalytics from '../components/profile/analytics/FinancialAnalytics';

export default function Profile() {
  const { level, coins, xp, lifetimeXp, stats, achievements, season, getRequiredXP, learningProgress, profile, logout } = useGame();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const requiredXp = getRequiredXP(level);
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const config = seasonConfig[season];

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10">
      <header className="flex justify-between items-start bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-2">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-tr from-farm-green to-farm-green-light rounded-full flex items-center justify-center text-white shadow-lg overflow-hidden border-4 border-white">
              {profile?.avatar ? (
                <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={40} />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-white text-xs font-black px-2 py-1 rounded-lg border-2 border-white shadow-sm">
              Lvl {level}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">{profile?.displayName || 'EcoFarmer'}</h2>
            <p className="text-slate-500 font-bold">{profile?.username || '@ecofarmer'}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white/50 border border-white rounded-xl text-slate-600 font-bold hover:bg-white transition-colors hover:shadow-sm"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
          <button 
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-xl text-red-500 font-bold hover:bg-red-100 transition-colors hover:shadow-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Stats */}
        <div className="glass p-6 rounded-3xl border border-white/60 md:col-span-1 flex flex-col gap-6">
          <h3 className="text-xl font-black text-slate-800">Overview</h3>
          
          <StatRow icon={<Star className="text-blue-500"/>} label="Current XP" value={`${xp} / ${requiredXp}`} />
          <StatRow icon={<Star className="text-purple-500"/>} label="Lifetime XP" value={lifetimeXp || 0} />
          <StatRow icon={<Coins className="text-amber-500"/>} label="Coins Balance" value={coins} />
          <StatRow icon={<Medal className="text-purple-500"/>} label="Achievements" value={`${unlockedAchievements} / ${achievements.length}`} />
          <StatRow icon={<Calendar className="text-farm-green-dark"/>} label="Current Season" value={config.name} />
        </div>

        {/* Lifetime Statistics */}
        <div className="glass p-6 rounded-3xl border border-white/60 md:col-span-2">
          <h3 className="text-xl font-black text-slate-800 mb-6">Lifetime Statistics</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatBox icon={<Sprout size={24}/>} title="Crops Planted" value={stats.planted} color="farm-green" />
            <StatBox icon={<Droplets size={24}/>} title="Times Watered" value={stats.watered} color="blue" />
            <StatBox icon={<Wheat size={24}/>} title="Total Harvests" value={stats.harvested} color="amber" />
            
            <div className="flex flex-col items-center justify-center p-6 bg-white/50 rounded-2xl border border-white text-center hover:shadow-md transition-shadow">
              <div className="p-3 rounded-xl mb-3 bg-purple-100 text-purple-600">
                <Star size={24} />
              </div>
              <span className="text-3xl font-black text-slate-800 mb-1">{learningProgress.passedQuizzes}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lessons Passed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Seed Economy Section */}
      <div className="glass p-6 rounded-3xl border border-white/60">
        <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
          <Store className="text-farm-green" /> Seed Economy
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox icon={<ShoppingBag size={24}/>} title="Seeds Bought" value={stats.seedsPurchased || 0} color="blue" />
          <StatBox icon={<Sprout size={24}/>} title="Seeds Planted" value={stats.seedsPlanted || 0} color="farm-green" />
          <StatBox icon={<AlertTriangle size={24}/>} title="Seeds Wasted" value={stats.seedsWasted || 0} color="red" />
          <StatBox icon={<Coins size={24}/>} title="Money Spent" value={`₹${stats.moneySpentOnSeeds || 0}`} color="amber" />
        </div>
      </div>

      {/* Premium Financial Analytics Section */}
      <FinancialAnalytics />

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-bold text-slate-600">{label}</span>
      </div>
      <span className="font-black text-slate-800">{value}</span>
    </div>
  );
}

function StatBox({ icon, title, value, color }) {
  const colorClasses = {
    'farm-green': 'bg-farm-green-light text-farm-green-dark',
    'blue': 'bg-blue-100 text-blue-600',
    'amber': 'bg-amber-100 text-amber-600',
    'red': 'bg-red-100 text-red-600'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/50 rounded-2xl border border-white text-center hover:shadow-md transition-shadow">
      <div className={`p-3 rounded-xl mb-3 ${colorClasses[color]}`}>
        {icon}
      </div>
      <span className="text-3xl font-black text-slate-800 mb-1">{value}</span>
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
    </div>
  );
}
