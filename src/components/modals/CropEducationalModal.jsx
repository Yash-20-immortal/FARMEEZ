import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Sprout, Droplets, Mountain, Clock, Calendar, CheckCircle2, X, Coins, ShoppingBag, BarChart2 } from 'lucide-react';
import { useGame } from '../GameContext';

export default function CropEducationalModal({ crop, isOpen, onClose, onPlant, isFirstTime }) {
  const { seedInventory } = useGame();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !crop || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-farm-green-light/40 to-emerald-100/40 p-6 pb-8 relative">
          {!isFirstTime && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white text-slate-500 hover:text-slate-700 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          )}
          
          <div className="flex items-start gap-4">
            <div className="text-6xl drop-shadow-md">{crop.icon}</div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{crop.name}</h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-2 py-0.5 bg-white/60 text-farm-green-dark text-xs font-bold uppercase tracking-wider rounded-lg border border-white">
                  {crop.category} Crop
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-200 flex items-center gap-1">
                  <Coins size={12}/> Cost: ₹{crop.seedPrice}
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-200 flex items-center gap-1">
                  <ShoppingBag size={12}/> Owned: {seedInventory?.[crop.id] || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-4 bg-white rounded-t-[2rem] flex flex-col gap-5 flex-1 overflow-y-auto">
          <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-farm-green pl-3">
            "{crop.description}"
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <InfoBox icon={<Calendar size={18}/>} label="Best Seasons" value={crop.preferredSeasons.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')} />
            <InfoBox icon={<Clock size={18}/>} label="Harvest Time" value={crop.growthTime} />
            <InfoBox icon={<BarChart2 size={18}/>} label="Difficulty" value={crop.category} />
            <InfoBox icon={<Droplets size={18}/>} label="Water Needs" value={crop.waterRequirement} />
            <InfoBox icon={<Mountain size={18}/>} label="Soil Type" value={crop.soilType} className="col-span-2 md:col-span-1" />
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
            <h4 className="text-sm font-black text-blue-800 mb-1 flex items-center gap-1.5">
              <span>💡</span> Interesting Fact
            </h4>
            <p className="text-sm font-medium text-blue-700/80 leading-relaxed">
              {crop.educationalFact}
            </p>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
            <h4 className="text-sm font-black text-emerald-800 mb-1 flex items-center gap-1.5">
              <Sprout size={16} /> Sustainability Tip
            </h4>
            <p className="text-sm font-medium text-emerald-700/80 leading-relaxed">
              {crop.sustainabilityTip}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
          {isFirstTime ? (
            <>
              <button 
                onClick={onClose}
                className="flex-1 py-3 bg-white hover:bg-slate-100 text-slate-500 font-bold rounded-xl transition-colors border border-slate-200"
              >
                Skip (Don't show again)
              </button>
              <button 
                onClick={onPlant}
                className="flex-1 py-3 bg-farm-green hover:bg-farm-green-dark text-white font-black rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-farm-green/30 flex items-center justify-center gap-2"
              >
                Continue Planting <CheckCircle2 size={18}/>
              </button>
            </>
          ) : (
            <button 
              onClick={onClose}
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-xl transition-all shadow-md"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function InfoBox({ icon, label, value, className = "" }) {
  return (
    <div className={`bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-start gap-3 ${className}`}>
      <div className="text-slate-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-black text-slate-700 leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}
