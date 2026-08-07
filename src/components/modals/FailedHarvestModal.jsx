import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XCircle, Info, BookOpen } from 'lucide-react';

export default function FailedHarvestModal({ crop, isOpen, onClose, onLearnMore }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !crop || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 pb-8 text-center relative border-b border-red-100">
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-red-500 mx-auto mb-3">
            <XCircle size={32} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">
            Crop Failed
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-2">
            Unfortunately, your {crop.name} crop did not survive.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 bg-white flex flex-col gap-6">
          
          <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
            <h4 className="text-sm font-black text-orange-800 mb-2 flex items-center gap-1.5">
              <Info size={16} /> Reason
            </h4>
            <p className="text-sm font-medium text-orange-900/80 leading-relaxed">
              {crop.name} requires {crop.preferredSeasons.join(' or ')} conditions. Growing them in the incorrect season reduced healthy development and caused the crop to fail.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Result
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-slate-400 font-black text-lg">0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Harvest Received</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-slate-400 font-black text-lg">0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Coins Earned</span>
              </div>
              <div className="col-span-2 bg-blue-50/50 border border-blue-100/50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                <span className="text-blue-600 font-black text-lg">+2 XP</span>
                <span className="text-[10px] font-bold text-blue-500 uppercase">Learning Bonus</span>
              </div>
            </div>
          </div>

          <div className="text-center px-4">
            <p className="text-xs font-bold text-slate-500 italic">
              "Always match crops to their preferred season for healthy growth and maximum yield."
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-xl transition-all shadow-md"
          >
            Got It
          </button>
          <button 
            onClick={onLearnMore}
            className="w-full py-3 bg-white hover:bg-slate-100 text-slate-600 font-bold rounded-xl transition-colors border border-slate-200 flex items-center justify-center gap-2"
          >
            <BookOpen size={16}/> Learn About {crop.name}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
