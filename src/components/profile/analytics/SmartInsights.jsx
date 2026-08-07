import React, { useMemo } from 'react';
import { useGame } from '../../GameContext';
import { Lightbulb, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export default function SmartInsights() {
  const { stats, marketStats, farmLog, ecoScore } = useGame();

  const insights = useMemo(() => {
    const generated = [];

    // 1. Top Revenue Contributor
    if (marketStats.cropSales && Object.keys(marketStats.cropSales).length > 0) {
      const totalRev = marketStats.lifetimeEarnings || 1; // avoid /0
      let topCrop = '';
      let topRev = 0;
      Object.entries(marketStats.cropSales).forEach(([crop, rev]) => {
        if (rev > topRev) {
          topRev = rev;
          topCrop = crop;
        }
      });
      const pct = Math.round((topRev / totalRev) * 100);
      if (pct > 0) {
        generated.push({
          id: 1,
          icon: <TrendingUp className="text-emerald-500" />,
          text: `You earn most of your revenue from ${topCrop.charAt(0).toUpperCase() + topCrop.slice(1)} (${pct}% of total).`,
          type: 'positive'
        });
      }
      
      // Low contributor insight
      let lowCrop = '';
      let lowRev = Infinity;
      Object.entries(marketStats.cropSales).forEach(([crop, rev]) => {
        if (rev > 0 && rev < lowRev) {
          lowRev = rev;
          lowCrop = crop;
        }
      });
      if (lowCrop && lowCrop !== topCrop && (lowRev/totalRev)*100 < 15) {
        generated.push({
          id: 2,
          icon: <Lightbulb className="text-amber-500" />,
          text: `${lowCrop.charAt(0).toUpperCase() + lowCrop.slice(1)} currently contributes only ${Math.round((lowRev/totalRev)*100)}% of your revenue. Try selling more during its peak season.`,
          type: 'neutral'
        });
      }
    }

    // 2. Harvesting Frequency
    if (stats.seasonHarvests && Object.keys(stats.seasonHarvests).length > 0) {
      let topSeason = '';
      let topCount = 0;
      Object.entries(stats.seasonHarvests).forEach(([s, c]) => {
        if (c > topCount) {
          topCount = c;
          topSeason = s;
        }
      });
      if (topSeason) {
        generated.push({
          id: 3,
          icon: <Sparkles className="text-purple-500" />,
          text: `You are most active during ${topSeason.charAt(0).toUpperCase() + topSeason.slice(1)}, with ${topCount} total harvests.`,
          type: 'neutral'
        });
      }
    }

    // 3. Sustainability
    if (ecoScore >= 90) {
      generated.push({
        id: 4,
        icon: <Sparkles className="text-teal-500" />,
        text: `Excellent sustainability! Your eco-score is ${ecoScore}, indicating highly responsible farming practices.`,
        type: 'positive'
      });
    } else if (ecoScore < 50) {
      generated.push({
        id: 5,
        icon: <AlertCircle className="text-red-500" />,
        text: `Your sustainability score has dropped to ${ecoScore}. Consider making eco-friendly choices in upcoming events.`,
        type: 'warning'
      });
    }

    // Default if not enough data
    if (generated.length === 0) {
      generated.push({
        id: 0,
        icon: <Lightbulb className="text-blue-500" />,
        text: `Keep farming and selling crops to unlock smart AI insights about your performance.`,
        type: 'neutral'
      });
    }

    return generated;
  }, [stats, marketStats, farmLog, ecoScore]);

  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <Sparkles className="text-amber-500" size={24} />
        Smart Insights
      </h3>
      
      <div className="flex flex-col gap-4">
        {insights.map(insight => (
          <div key={insight.id} className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-white hover:-translate-y-0.5 transition-transform">
            <div className={`p-2 rounded-xl bg-white shadow-sm ${insight.type === 'positive' ? 'bg-emerald-50' : insight.type === 'warning' ? 'bg-red-50' : ''}`}>
              {insight.icon}
            </div>
            <p className="text-slate-700 font-bold leading-relaxed pt-1">
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
