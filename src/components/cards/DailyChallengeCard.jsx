import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

export default function DailyChallengeCard({ challenge }) {
  return (
    <div className="glass p-6 rounded-3xl border border-white/60 relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl -z-10"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-sm">
            <Target size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">Daily Challenge</h3>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Ends in 4h 20m</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm font-black text-slate-700 text-sm">
          +{challenge.rewardXP} XP
        </div>
      </div>

      <h4 className="text-lg font-bold text-slate-700 mb-2">{challenge.title}</h4>
      <p className="text-slate-500 text-sm font-medium mb-6">{challenge.description}</p>

      <div className="space-y-3 mb-6">
        {challenge.tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle2 size={20} className={task.completed ? "text-farm-green" : "text-slate-300"} />
            <span className={`text-sm font-bold ${task.completed ? "text-slate-700 line-through opacity-70" : "text-slate-600"}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

      <Button variant="primary" className="w-full">Claim Reward</Button>
    </div>
  );
}
