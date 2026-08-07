import React from 'react';
import { Medal } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AchievementsCard({ achievements }) {
  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-slate-800">Recent Achievements</h3>
        <Link to="/app/achievements" className="text-sm font-bold text-farm-green-dark hover:underline">View All</Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-soft transition-transform duration-300 group-hover:-translate-y-1 ${achievement.unlocked ? 'bg-gradient-to-br ' + achievement.color : 'bg-slate-100 grayscale opacity-50'}`}>
              <Medal size={28} className={achievement.unlocked ? 'text-white' : 'text-slate-400'} />
            </div>
            <h4 className="text-xs font-black text-slate-800 leading-tight mb-1">{achievement.title}</h4>
            <p className="text-[10px] font-bold text-slate-500">{achievement.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
