import React from 'react';
import { Sprout, Droplets, Sun, Activity } from 'lucide-react';

export default function RecentActivityCard({ activities }) {
  const iconMap = {
    plant: <Sprout size={16} />,
    water: <Droplets size={16} />,
    harvest: <Sun size={16} />,
    energy: <Sun size={16} />,
    default: <Activity size={16} />
  };

  const colorMap = {
    plant: "bg-farm-green-light text-farm-green-dark",
    water: "bg-blue-100 text-blue-600",
    harvest: "bg-amber-100 text-amber-600",
    energy: "bg-amber-100 text-amber-600",
    default: "bg-slate-100 text-slate-500"
  };

  return (
    <div id="tour-farm-log" className="glass p-6 rounded-3xl border border-white/60 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-slate-800">Farm Log</h3>
        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Today</span>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {activities.map((activity, index) => (
          <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline dot */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ${colorMap[activity.type] || colorMap.default}`}>
              {iconMap[activity.type] || iconMap.default}
            </div>
            
            {/* Content card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white/50 border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{activity.time}</span>
                <span className="text-[10px] font-bold text-farm-green-dark">+{activity.xp} XP</span>
              </div>
              <h4 className="text-sm font-bold text-slate-800">{activity.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
