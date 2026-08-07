import React, { useState } from 'react';
import { useGame } from '../components/GameContext';
import { CROP_DATABASE } from '../data/cropDatabase';
import { Store as StoreIcon, Coins, ShoppingBag, SunSnow, Clock, BarChart2, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';

export default function FarmSupply() {
  const { coins, level, buySeeds, seedInventory } = useGame();
  const [purchaseToast, setPurchaseToast] = useState(null);

  const handleBuy = (crop, amount, totalCost) => {
    if (coins < totalCost) {
      setPurchaseToast({ type: 'error', message: 'Not enough coins. Harvest and sell crops to earn more.' });
      setTimeout(() => setPurchaseToast(null), 3000);
      return;
    }

    buySeeds(crop.id, amount, totalCost);
    setPurchaseToast({ type: 'success', message: `+${amount} ${crop.name} Seeds Purchased Successfully!` });
    setTimeout(() => setPurchaseToast(null), 3000);
  };

  const crops = Object.values(CROP_DATABASE);

  return (
    <div className="pb-24 animate-fade-in relative">
      
      {/* Toast Notification */}
      {purchaseToast && (
        <div className="fixed top-6 right-6 z-50 animate-bounce-in">
          <div className={`px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-white ${
            purchaseToast.type === 'error' ? 'bg-red-500' : 'bg-farm-green'
          }`}>
            {purchaseToast.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
            {purchaseToast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-farm-green-dark tracking-tight mb-2 flex items-center gap-3">
            <StoreIcon size={40} className="text-farm-green" /> Farm Store
          </h1>
          <p className="text-slate-600 font-medium text-lg max-w-2xl">
            Purchase seeds to expand your farm. Higher level crops yield more profits but cost more to plant!
          </p>
        </div>
        
        <div className="glass p-4 rounded-2xl flex items-center gap-4 self-start md:self-auto border border-white/50 shadow-soft">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-500 shadow-inner">
            <Coins size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Balance</p>
            <p className="text-2xl font-black text-slate-800">₹{coins.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {crops.map((crop) => {
          const isLocked = level < crop.unlockLevel;
          const owned = seedInventory[crop.id] || 0;
          
          return (
            <div 
              key={crop.id} 
              className={`glass rounded-3xl p-6 border transition-all duration-300 relative flex flex-col ${
                isLocked ? 'border-slate-200 opacity-75 grayscale-[0.5]' : 'border-white hover:border-farm-green hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Lock Overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-slate-100/40 backdrop-blur-[2px] rounded-3xl z-10 flex flex-col items-center justify-center border border-slate-200">
                  <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center">
                    <Lock size={32} className="text-slate-400 mb-2" />
                    <p className="font-black text-slate-700">Unlocks at Level {crop.unlockLevel}</p>
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-5xl drop-shadow-sm bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner">
                    {crop.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight">{crop.name}</h3>
                    <p className="text-sm font-bold text-farm-green bg-farm-green-light px-2 py-0.5 rounded-lg inline-block mt-1">
                      ₹{crop.seedPrice} / seed
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase">Owned</span>
                  <span className="text-lg font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">{owned}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 font-medium mb-5 line-clamp-2 h-10 italic">
                "{crop.description}"
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mb-6 mt-auto">
                <Stat icon={<SunSnow size={14}/>} label="Season" value={crop.preferredSeasons[0]} capitalize />
                <Stat icon={<BarChart2 size={14}/>} label="Difficulty" value={crop.category} />
                <Stat icon={<Clock size={14}/>} label="Growth" value={crop.growthTime} className="col-span-2" />
              </div>

              {/* Buy Actions */}
              <div className="flex flex-col gap-2 mt-auto">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-1">Purchase Options</p>
                <div className="flex gap-2">
                  <BuyButton 
                    amount={1} cost={crop.seedPrice} 
                    disabled={isLocked} 
                    onBuy={() => handleBuy(crop, 1, crop.seedPrice)} 
                  />
                  <BuyButton 
                    amount={5} cost={crop.seedPrice * 5} 
                    disabled={isLocked} 
                    onBuy={() => handleBuy(crop, 5, crop.seedPrice * 5)} 
                  />
                </div>
                <BuyButton 
                  amount={10} cost={crop.seedPrice * 10} 
                  disabled={isLocked} 
                  onBuy={() => handleBuy(crop, 10, crop.seedPrice * 10)} 
                  primary
                />
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

function Stat({ icon, label, value, className = "", capitalize = false }) {
  return (
    <div className={`bg-white/60 p-2 rounded-xl flex items-center gap-2 border border-white ${className}`}>
      <div className="text-slate-400">{icon}</div>
      <div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className={`text-xs font-black text-slate-700 ${capitalize ? 'capitalize' : ''}`}>{value}</p>
      </div>
    </div>
  );
}

function BuyButton({ amount, cost, disabled, onBuy, primary = false }) {
  return (
    <button
      onClick={onBuy}
      disabled={disabled}
      className={`flex-1 py-2 rounded-xl font-black text-sm flex items-center justify-center gap-1 transition-all ${
        primary 
          ? 'bg-farm-green hover:bg-farm-green-dark text-white shadow-md hover:shadow-lg' 
          : 'bg-white hover:bg-slate-50 text-farm-green border border-farm-green/20 hover:border-farm-green'
      }`}
    >
      <ShoppingBag size={14} /> x{amount} <span className="opacity-75 font-medium ml-1">(₹{cost})</span>
    </button>
  );
}
