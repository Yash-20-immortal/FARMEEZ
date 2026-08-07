import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';

export default function FarmEfficiency() {
  const { stats, ecoScore, farmLog } = useGame();

  const metrics = useMemo(() => {
    const p = stats.planted || 0;
    const w = stats.watered || 0;
    const h = stats.harvested || 0;

    const waterEff = p > 0 ? Math.min(100, Math.round((w / p) * 100)) : 0;
    const harvestSuccess = p > 0 ? Math.min(100, Math.round((h / p) * 100)) : 0;
    
    const uniqueCrops = Object.keys(stats.cropHarvests || {}).length;
    const cropDiversity = Math.round((uniqueCrops / 6) * 100);

    let totalBonus = 0;
    let salesWithBonus = 0;
    farmLog.forEach(log => {
      if (log.bonus) {
        totalBonus += log.bonus;
        salesWithBonus++;
      }
    });
    // Assuming max realistic bonus is ~50%, map to 100 score
    const avgBonus = salesWithBonus > 0 ? totalBonus / salesWithBonus : 0;
    const marketTiming = Math.min(100, Math.round((avgBonus / 50) * 100));

    const overall = Math.round((waterEff + harvestSuccess + cropDiversity + marketTiming + ecoScore) / 5);

    return [
      { label: 'Overall Efficiency', value: overall, color: 'text-farm-green', stroke: '#22c55e', primary: true },
      { label: 'Water Efficiency', value: waterEff, color: 'text-blue-500', stroke: '#3b82f6' },
      { label: 'Harvest Success', value: harvestSuccess, color: 'text-amber-500', stroke: '#f59e0b' },
      { label: 'Crop Diversity', value: cropDiversity, color: 'text-purple-500', stroke: '#a855f7' },
      { label: 'Market Timing', value: marketTiming, color: 'text-indigo-500', stroke: '#6366f1' },
      { label: 'Sustainability', value: ecoScore, color: 'text-teal-500', stroke: '#14b8a6' },
    ];
  }, [stats, ecoScore, farmLog]);

  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <h3 className="text-xl font-black text-slate-800 mb-6">Farm Efficiency</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {metrics.map((m, idx) => (
          <div key={m.label} className={`flex flex-col items-center justify-center text-center ${m.primary ? 'col-span-2 md:col-span-3 lg:col-span-2 bg-white/40 p-4 rounded-2xl border border-white' : ''}`}>
            <CircularProgress value={m.value} stroke={m.stroke} size={m.primary ? 120 : 80} strokeWidth={m.primary ? 12 : 8} />
            <span className={`mt-3 font-bold ${m.primary ? 'text-base text-slate-800' : 'text-xs text-slate-500'}`}>{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularProgress({ value, size, stroke, strokeWidth }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative flex items-center justify-center transition-transform hover:scale-105" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-slate-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute font-black text-slate-700" style={{ fontSize: size * 0.25 }}>
        {value}%
      </span>
    </div>
  );
}
