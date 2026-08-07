import React from 'react';
import { Medal, CheckCircle, Lock } from 'lucide-react';
import { useGame } from '../components/GameContext';

export default function Achievements() {
  const { achievements } = useGame();

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10">
      <header className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center text-white shadow-soft">
            <Medal size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Achievements</h2>
            <p className="text-slate-500 font-bold text-sm">Track your farming milestones</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-slate-500 mb-2">{unlockedCount} / {achievements.length} Unlocked</span>
          <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`glass p-6 rounded-3xl border border-white/60 flex flex-col items-center text-center transition-transform hover:-translate-y-1 ${achievement.unlocked ? '' : 'opacity-70'}`}
          >
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-soft ${achievement.unlocked ? 'bg-gradient-to-br ' + achievement.color : 'bg-slate-200 grayscale'}`}>
              <Medal size={36} className={achievement.unlocked ? 'text-white' : 'text-slate-400'} />
            </div>
            <h3 className="text-lg font-black text-slate-800 mb-2">{achievement.title}</h3>
            
            {achievement.unlocked ? (
              <div className="flex items-center gap-2 text-farm-green-dark bg-farm-green-light px-4 py-1.5 rounded-full text-xs font-bold mt-auto">
                <CheckCircle size={14} /> Unlocked {achievement.date}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold mt-auto">
                <Lock size={14} /> Locked
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
