import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, Info, ArrowRight, Sprout, SunSnow } from 'lucide-react';
import { CROP_DATABASE } from '../../data/cropDatabase';

export default function WrongSeasonModal({ crop, currentSeason, isOpen, onClose, onPlantAnyway, onLearnMore }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !crop || !mounted) return null;

  // Find alternatives for the current season
  const alternatives = Object.values(CROP_DATABASE)
    .filter(c => c.preferredSeasons.includes(currentSeason) && c.id !== crop.id)
    .slice(0, 2);

  // Generate a dynamic educational reason based on season and crop
  const generateReason = () => {
    const s = currentSeason;
    if (s === 'summer') {
      return `${crop.name} requires cooler soil temperatures for healthy germination. Summer heat increases evaporation and causes heat stress, leading to poor yields.`;
    }
    if (s === 'winter') {
      return `${crop.name} is sensitive to frost and cold soil. Winter conditions halt its growth and can freeze its delicate root systems.`;
    }
    if (s === 'spring') {
      return `Spring soils are often too wet or cool for ${crop.name}, which thrives better in its native season conditions.`;
    }
    return `${crop.name} is not adapted to ${s} weather patterns. Its natural growth cycle requires the specific daylight hours and temperature of its preferred seasons.`;
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 pb-8 text-center relative border-b border-red-100">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-red-500 mx-auto mb-3">
            <AlertTriangle size={32} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight mt-3">
            {crop.name} is not recommended during {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}.
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-2">
            If you continue, your crop may fail.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 bg-white flex flex-col gap-6">
          
          <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
            <h4 className="text-sm font-black text-orange-800 mb-2 flex items-center gap-1.5">
              <Info size={16} /> Why?
            </h4>
            <p className="text-sm font-medium text-orange-900/80 leading-relaxed">
              {generateReason()}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Recommended Season
            </h4>
            <div className="flex flex-wrap gap-2">
              {crop.preferredSeasons.map(s => (
                <span key={s} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-black rounded-lg text-sm capitalize flex items-center gap-1.5">
                  <SunSnow size={14} className="text-slate-400"/> {s}
                </span>
              ))}
            </div>
          </div>

          {alternatives.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Suggested Alternatives for {currentSeason}
              </h4>
              <div className="flex gap-3">
                {alternatives.map(alt => (
                  <div key={alt.id} className="flex-1 bg-farm-green-light/20 border border-farm-green-light rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl mb-1">{alt.icon}</span>
                    <span className="text-xs font-black text-farm-green-dark">{alt.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
          <div className="flex gap-2">
            <button 
              onClick={onPlantAnyway}
              className="flex-1 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-xl transition-colors border border-red-200"
            >
              Plant Anyway
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              Choose Another
            </button>
          </div>
          <button 
            onClick={onLearnMore}
            className="w-full py-3 bg-white hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-2 mt-1"
          >
            <Info size={16}/> Learn More
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
