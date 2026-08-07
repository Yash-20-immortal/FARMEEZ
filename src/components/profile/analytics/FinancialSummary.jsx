import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';
import { Coins, TrendingUp, TrendingDown, Wheat, Calendar, ShoppingCart, Leaf, Sprout, HandCoins, AreaChart } from 'lucide-react';

export default function FinancialSummary() {
  const { coins, marketStats, stats, ecoScore, farmLog } = useGame();

  const metrics = useMemo(() => {
    // Basic metrics
    const lifetimeRevenue = marketStats.lifetimeEarnings || 0;
    const totalLoss = stats.totalExpenses || 0;
    const totalProfit = lifetimeRevenue - totalLoss;
    const totalHarvests = stats.harvested || 0;
    const totalSales = marketStats.totalItemsSold || 0;
    const avgRevPerHarvest = totalHarvests > 0 ? (lifetimeRevenue / totalHarvests).toFixed(1) : 0;

    // Best Selling Crop
    let bestCrop = 'None';
    let highestCropRev = 0;
    if (marketStats.cropSales) {
      Object.entries(marketStats.cropSales).forEach(([crop, rev]) => {
        if (rev > highestCropRev) {
          highestCropRev = rev;
          bestCrop = crop.charAt(0).toUpperCase() + crop.slice(1);
        }
      });
    }

    // Most Profitable Season (from farmLog)
    const seasonRevenue = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    farmLog.forEach(log => {
      if (log.season) {
        seasonRevenue[log.season] += log.total;
      }
    });
    
    let bestSeason = 'None';
    let highestSeasonRev = 0;
    Object.entries(seasonRevenue).forEach(([season, rev]) => {
      if (rev > highestSeasonRev) {
        highestSeasonRev = rev;
        bestSeason = season.charAt(0).toUpperCase() + season.slice(1);
      }
    });

    return [
      { id: 'lifetimeRev', label: 'Lifetime Revenue', value: `₹${lifetimeRevenue}`, icon: <HandCoins />, color: 'text-emerald-600', bg: 'bg-emerald-100' },
      { id: 'coins', label: 'Current Coins', value: `₹${coins}`, icon: <Coins />, color: 'text-amber-500', bg: 'bg-amber-100' },
      { id: 'profit', label: 'Total Profit', value: `₹${totalProfit}`, icon: <TrendingUp />, color: 'text-blue-500', bg: 'bg-blue-100' },
      { id: 'loss', label: 'Total Expenses', value: `₹${totalLoss}`, icon: <TrendingDown />, color: 'text-red-500', bg: 'bg-red-100' },
      { id: 'bestCrop', label: 'Best Selling Crop', value: bestCrop, icon: <Wheat />, color: 'text-farm-brown', bg: 'bg-farm-brown-light/50' },
      { id: 'bestSeason', label: 'Most Profitable Season', value: bestSeason, icon: <Calendar />, color: 'text-purple-600', bg: 'bg-purple-100' },
      { id: 'harvests', label: 'Total Harvests', value: totalHarvests, icon: <Sprout />, color: 'text-farm-green', bg: 'bg-farm-green-light' },
      { id: 'sales', label: 'Total Sales (Qty)', value: totalSales, icon: <ShoppingCart />, color: 'text-orange-500', bg: 'bg-orange-100' },
      { id: 'avgRev', label: 'Avg Rev / Harvest', value: `₹${avgRevPerHarvest}`, icon: <AreaChart />, color: 'text-cyan-600', bg: 'bg-cyan-100' },
      { id: 'sustainability', label: 'Sustainability Score', value: `${ecoScore}/100`, icon: <Leaf />, color: 'text-teal-600', bg: 'bg-teal-100' },
    ];
  }, [coins, marketStats, stats, ecoScore, farmLog]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((m) => (
        <div key={m.id} className="glass p-4 rounded-3xl border border-white/60 flex flex-col justify-between hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
              {React.cloneElement(m.icon, { size: 18 })}
            </div>
            <span className="text-xs font-bold text-slate-500 leading-tight uppercase tracking-wider">{m.label}</span>
          </div>
          <span className="text-xl font-black text-slate-800">{m.value}</span>
        </div>
      ))}
    </div>
  );
}
