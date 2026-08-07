import React from 'react';
import { Sprout, Droplets, Wheat, Star, Coins } from 'lucide-react';

export default function StatisticsCard({ stats, lifetimeXp, lifetimeCoins }) {
  return (
    <div className="glass p-6 rounded-3xl border border-white/60">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-slate-800">Farming Stats</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-farm-green-light rounded-lg text-farm-green-dark">
            <Sprout size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Planted</p>
            <p className="font-black text-slate-800">{stats.planted}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <Wheat size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Harvested</p>
            <p className="font-black text-slate-800">{stats.harvested}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Droplets size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Watered</p>
            <p className="font-black text-slate-800">{stats.watered}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Star size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Total XP</p>
            <p className="font-black text-slate-800">{lifetimeXp}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
