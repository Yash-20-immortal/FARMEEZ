import React from 'react';

export default function FeatureCard({ icon, title, description, colorClass = "text-farm-green-dark bg-farm-green-light/40" }) {
  return (
    <div className="glass p-8 rounded-3xl border border-white/60 hover:shadow-float transition-all duration-300 hover:-translate-y-2 group">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-soft ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
}
