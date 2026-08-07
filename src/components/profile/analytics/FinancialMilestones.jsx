import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';
import { Target, Trophy } from 'lucide-react';

export default function FinancialMilestones() {
  const { marketStats, stats } = useGame();

  const milestones = useMemo(() => {
    const rev = marketStats.lifetimeEarnings || 0;
    const harvests = stats.harvested || 0;
    const sold = marketStats.totalItemsSold || 0;

    return [
      { id: 'first-100', title: 'First ₹100 Revenue', current: rev, target: 100, unit: '₹' },
      { id: 'first-1000', title: 'First ₹1000 Revenue', current: rev, target: 1000, unit: '₹' },
      { id: 'harvest-100', title: '100 Harvests', current: harvests, target: 100, unit: '' },
      { id: 'seller-100', title: 'Top Seller (100 sold)', current: sold, target: 100, unit: '' },
      { id: 'expert-500', title: 'Market Expert (500 sold)', current: sold, target: 500, unit: '' },
    ];
  }, [marketStats, stats]);

  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Target className="text-rose-500" size={24} />
        Achievement Progress
      </h3>
      
      <div className="space-y-5">
        {milestones.map(m => {
          const progress = Math.min(100, (m.current / m.target) * 100);
          const isComplete = progress >= 100;

          return (
            <div key={m.id} className="relative">
              <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-slate-700 flex items-center gap-2">
                  {isComplete && <Trophy size={14} className="text-amber-500" />}
                  {m.title}
                </span>
                <span className={`text-sm font-black ${isComplete ? 'text-emerald-600' : 'text-slate-500'}`}>
                  {m.unit}{Math.min(m.current, m.target)} / {m.unit}{m.target}
                </span>
              </div>
              
              <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden border border-white/60">
                <div 
                  className={`h-full transition-all duration-1000 ease-out rounded-full ${isComplete ? 'bg-emerald-500' : 'bg-rose-400'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
