import React from 'react';
import { useSeason, seasonConfig } from './SeasonContext';
import { Clock } from 'lucide-react';

export default function SeasonController() {
  const { season, setSeason, autoCycle, setAutoCycle } = useSeason();

  return (
    <div className="absolute top-6 right-6 z-10 glass p-4 rounded-2xl shadow-float border border-white/40 flex flex-col gap-3 min-w-[200px]">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-farm-brown-dark flex items-center gap-2">
          {seasonConfig[season].icon} {seasonConfig[season].name}
        </h3>
        <button
          onClick={() => setAutoCycle(!autoCycle)}
          className={`p-1.5 rounded-full transition-colors ${autoCycle ? 'bg-farm-green text-white shadow-sm' : 'bg-white/50 text-farm-brown-dark hover:bg-white'}`}
          title={autoCycle ? "Auto Cycle ON (2 min)" : "Auto Cycle OFF"}
        >
          <Clock size={16} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        {Object.entries(seasonConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => {
              setSeason(key);
              if (autoCycle) setAutoCycle(false); // disable auto cycle on manual selection
            }}
            className={`px-3 py-2 rounded-xl text-sm font-bold text-left transition-all ${season === key
                ? 'bg-white/80 shadow-sm text-farm-brown-dark scale-105 border-l-4 border-farm-green'
                : 'bg-white/30 text-farm-brown hover:bg-white/50'
              }`}
          >
            {config.icon} {config.name}
          </button>
        ))}
      </div>
    </div>
  );
}
