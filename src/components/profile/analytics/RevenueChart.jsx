import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';
import { Lock } from 'lucide-react';

export default function RevenueChart() {
  const { farmLog } = useGame();

  const chartData = useMemo(() => {
    // Reverse farmLog to get chronological order (oldest to newest)
    const chronologicalLog = [...farmLog].reverse();
    
    // Group by date to get daily revenue
    const dailyRevenue = {};
    chronologicalLog.forEach(log => {
      dailyRevenue[log.date] = (dailyRevenue[log.date] || 0) + log.total;
    });

    const dataPoints = Object.entries(dailyRevenue).map(([date, total]) => ({ date, total }));
    return dataPoints;
  }, [farmLog]);

  if (chartData.length < 3) {
    return (
      <div className="glass p-8 rounded-3xl border border-white/60 flex flex-col items-center justify-center text-center h-[300px]">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <Lock size={32} />
        </div>
        <h3 className="text-xl font-black text-slate-700 mb-2">Not Enough Data</h3>
        <p className="text-slate-500 font-bold max-w-sm">Continue farming and selling crops to unlock your revenue timeline analytics.</p>
      </div>
    );
  }

  // Calculate SVG paths
  const padding = 40;
  const height = 240;
  const width = 800; // viewbox width
  
  const maxRev = Math.max(...chartData.map(d => d.total));
  const minRev = 0; // Always start Y axis at 0 for revenue
  
  const points = chartData.map((d, i) => {
    const x = padding + (i * ((width - padding * 2) / (chartData.length - 1)));
    const y = height - padding - ((d.total - minRev) / (maxRev - minRev || 1)) * (height - padding * 2);
    return `${x},${y}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  
  // Area under the curve
  const areaD = `${pathD} L ${points[points.length-1].split(',')[0]},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
        Revenue Over Time
        <span className="text-xs font-bold bg-farm-green-light text-farm-green-dark px-2 py-1 rounded-full">Historical</span>
      </h3>
      
      <div className="relative w-full overflow-x-auto overflow-y-hidden" style={{ minHeight: '260px' }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full min-w-[600px] drop-shadow-sm">
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="2" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />
          <line x1={padding} y1={(height)/2} x2={width - padding} y2={(height)/2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="5,5" />

          {/* Area Fill */}
          <path d={areaD} fill="url(#gradient-green)" opacity="0.2" className="animate-fade-in-up" />
          
          {/* Line */}
          <path d={pathD} fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-in-up" />
          
          {/* Data Points */}
          {points.map((p, i) => {
            const [x, y] = p.split(',');
            return (
              <g key={i} className="group transition-transform hover:scale-110 cursor-pointer origin-center" style={{ transformOrigin: `${x}px ${y}px` }}>
                <circle cx={x} cy={y} r="6" fill="#fff" stroke="#22c55e" strokeWidth="3" />
                <text x={x} y={y - 15} textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{chartData[i].total}
                </text>
              </g>
            );
          })}

          <defs>
            <linearGradient id="gradient-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
