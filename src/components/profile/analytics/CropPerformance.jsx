import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';
import { CROP_DATABASE } from '../../../data/cropDatabase';

const CROPS = Object.keys(CROP_DATABASE);

export default function CropPerformance() {
  const { inventory, stats, marketStats, farmLog } = useGame();

  const cropData = useMemo(() => {
    return CROPS.map(crop => {
      // Basic stats from Context
      const harvestCount = stats.cropHarvests?.[crop] || 0;
      const revenue = marketStats.cropSales?.[crop] || 0;
      const currentInv = inventory[crop] || 0;

      // Extract deeper metrics from farmLog
      let timesSold = 0;
      let totalQtySold = 0;
      let seasonSales = { spring: 0, summer: 0, autumn: 0, winter: 0 };
      
      farmLog.forEach(log => {
        if (log.type === crop) {
          timesSold++;
          totalQtySold += log.quantity;
          if (log.season) {
            seasonSales[log.season] += log.total;
          }
        }
      });

      const avgPrice = totalQtySold > 0 ? (revenue / totalQtySold).toFixed(1) : 0;
      
      let highestSeason = 'N/A';
      let maxSeasonRev = 0;
      Object.entries(seasonSales).forEach(([season, rev]) => {
        if (rev > maxSeasonRev) {
          maxSeasonRev = rev;
          highestSeason = season.charAt(0).toUpperCase() + season.slice(1);
        }
      });

      return {
        name: crop.charAt(0).toUpperCase() + crop.slice(1),
        harvestCount,
        timesSold,
        revenue,
        avgPrice,
        currentInv,
        highestSeason
      };
    }).sort((a, b) => b.revenue - a.revenue); // Sort by revenue descending
  }, [inventory, stats, marketStats, farmLog]);

  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <h3 className="text-xl font-black text-slate-800 mb-6">Crop Performance</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-white/50 text-slate-500 text-sm uppercase tracking-wider">
              <th className="pb-3 font-black">Crop</th>
              <th className="pb-3 font-bold text-center">Harvests</th>
              <th className="pb-3 font-bold text-center">Times Sold</th>
              <th className="pb-3 font-bold text-right">Revenue</th>
              <th className="pb-3 font-bold text-right">Avg Price</th>
              <th className="pb-3 font-bold text-center">Inventory</th>
              <th className="pb-3 font-bold text-right">Best Season</th>
            </tr>
          </thead>
          <tbody>
            {cropData.map((data, index) => (
              <tr 
                key={data.name} 
                className={`border-b border-white/30 transition-colors hover:bg-white/40 ${index === 0 ? 'bg-farm-green-light/20' : ''}`}
              >
                <td className="py-4 font-black flex items-center gap-2 text-slate-800">
                  {index === 0 && <span className="text-amber-500" title="Top Earner">🏆</span>}
                  {data.name}
                </td>
                <td className="py-4 text-center font-bold text-slate-600">{data.harvestCount}</td>
                <td className="py-4 text-center font-bold text-slate-600">{data.timesSold}</td>
                <td className="py-4 text-right font-black text-emerald-600">₹{data.revenue}</td>
                <td className="py-4 text-right font-bold text-slate-500">₹{data.avgPrice}</td>
                <td className="py-4 text-center font-bold text-slate-600">{data.currentInv}</td>
                <td className="py-4 text-right font-bold text-purple-600">{data.highestSeason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
