import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ActionCard({ title, subtitle, icon, color, onClick, id }) {
  const colorStyles = {
    green: "bg-farm-green hover:bg-farm-green-dark text-white shadow-farm-green/30",
    brown: "bg-farm-brown hover:bg-farm-brown-light text-white shadow-farm-brown/30",
  };

  return (
    <button 
      id={id}
      onClick={onClick}
      className={`${colorStyles[color]} flex-1 p-6 rounded-3xl flex items-center justify-between transition-all duration-300 shadow-float hover:-translate-y-1 text-left group`}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-black">{title}</h3>
          <p className="text-white/80 font-medium text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:translate-x-1 transition-transform">
        <ArrowRight size={20} />
      </div>
    </button>
  );
}
