import React from 'react';
import { Coins, Star, Trophy, Leaf, Calendar } from 'lucide-react';
import { useGame } from '../../components/GameContext';
import { seasonConfig } from '../../components/SeasonContext';

export default function DashboardHeader() {
  const { level, coins, xp, ecoScore, getRequiredXP, season, profile } = useGame();
  
  const config = seasonConfig[season];
  const requiredXp = getRequiredXP(level);
  const progressPercent = Math.min(100, (xp / requiredXp) * 100);

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-farm-green rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-soft">
            {level}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{profile?.displayName || `Level ${level} Farmer`}</h2>
            <p className="text-farm-green-dark font-bold text-sm">Level {level} Agronomist</p>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="flex items-center gap-2 mt-1">
          <div className="w-48 h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-farm-green to-green-400 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-500">{xp} / {requiredXp} XP</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-6">
        <StatBadge icon={<Coins className="text-amber-500" size={20} />} value={coins} label="Coins" bg="bg-amber-100/50" />
        <StatBadge icon={<Star className="text-blue-500" size={20} />} value={xp} label="XP" bg="bg-blue-100/50" />
        <StatBadge icon={<Leaf className="text-farm-green-dark" size={20} />} value={`${ecoScore}%`} label="Eco Score" bg="bg-farm-green-light/40" />
        <StatBadge icon={<Calendar className="text-purple-500" size={20} />} value={config.name} label="Season" bg="bg-purple-100/50" />
      </div>
    </header>
  );
}

function StatBadge({ icon, value, label, bg }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${bg} border border-white/60 shadow-sm`}>
      {icon}
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black text-slate-500 tracking-wider leading-none">{label}</span>
        <span className="font-black text-slate-800 leading-tight">{value}</span>
      </div>
    </div>
  );
}
