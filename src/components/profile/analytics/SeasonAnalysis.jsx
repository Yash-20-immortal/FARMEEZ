import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';

const SEASONS = ['spring', 'summer', 'autumn', 'winter'];

export default function SeasonAnalysis() {
  const { farmLog, stats } = useGame();

  const seasonData = useMemo(() => {
    return SEASONS.map(season => {
      let revenue = 0;
      let qtySold = 0;
      const cropSales = {};

      farmLog.forEach(log => {
        if (log.season === season) {
          revenue += log.total;
          qtySold += log.quantity;
          cropSales[log.type] = (cropSales[log.type] || 0) + log.total;
        }
      });

      const harvests = stats.seasonHarvests?.[season] || 0;
      const avgPrice = qtySold > 0 ? (revenue / qtySold).toFixed(1) : 0;
      
      let bestCrop = 'None';
      let maxCropRev = 0;
      Object.entries(cropSales).forEach(([crop, rev]) => {
        if (rev > maxCropRev) {
          maxCropRev = rev;
          bestCrop = crop.charAt(0).toUpperCase() + crop.slice(1);
        }
      });

      // Simple qualitative demand performance
      let demandPerf = 'Low';
      if (revenue > 500) demandPerf = 'Excellent';
      else if (revenue > 200) demandPerf = 'High';
      else if (revenue > 50) demandPerf = 'Moderate';

      return {
        name: season.charAt(0).toUpperCase() + season.slice(1),
        revenue,
        harvests,
        avgPrice,
        demandPerf,
        bestCrop
      };
    }).sort((a, b) => b.revenue - a.revenue); // Sort by revenue descending
  }, [farmLog, stats]);

  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <h3 className="text-xl font-black text-slate-800 mb-6">Season Analysis</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {seasonData.map((data, idx) => (
          <div key={data.name} className={`p-5 rounded-2xl border ${idx === 0 ? 'bg-purple-100 border-purple-200 shadow-md' : 'bg-white/50 border-white/80'}`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                {idx === 0 && <span title="Most Profitable Season">🌟</span>}
                {data.name}
              </h4>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${idx === 0 ? 'bg-purple-200 text-purple-700' : 'bg-slate-200 text-slate-600'}`}>
                {data.demandPerf} Demand
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Revenue</span>
                <span className="font-black text-emerald-600">₹{data.revenue}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Harvests</span>
                <span className="font-black text-slate-700">{data.harvests}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Avg Selling Price</span>
                <span className="font-black text-slate-700">₹{data.avgPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Best Crop</span>
                <span className="font-black text-farm-brown">{data.bestCrop}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
