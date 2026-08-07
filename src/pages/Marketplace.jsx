import React, { useState } from 'react';
import { Store, TrendingUp, TrendingDown, Minus, Package, Clock, Coins, ShieldCheck, Tag, Info, ArrowRight, Bot, Loader2, RefreshCw } from 'lucide-react';
import { useGame } from '../components/GameContext';
import { CROP_MARKET_DATA, BUYERS, MARKET_INSIGHTS, calculateCurrentPrice } from '../data/marketData';
import { useAgriMentor } from '../components/AgriMentorContext';

export default function Marketplace() {
  const { inventory, marketStats, farmLog, season, sellCrop } = useGame();
  const { analysis, isLoading, refresh } = useAgriMentor();

  const [selectedCrop, setSelectedCrop] = useState(null);
  const [sellQty, setSellQty] = useState(1);
  const [selectedBuyer, setSelectedBuyer] = useState(BUYERS[0]);

  // Derived calculations for sell panel
  const maxQty = selectedCrop ? inventory[selectedCrop] || 0 : 0;
  const basePrice = selectedCrop ? calculateCurrentPrice(selectedCrop, season) : 0;
  const buyerPrice = Math.round(basePrice * selectedBuyer.multiplier);
  // Sustainability bonus: let's add a fixed +10% educational bonus to simulate good farming
  const bonusPercent = 10; 
  const bonusAmount = Math.round(buyerPrice * sellQty * (bonusPercent / 100));
  const finalTotal = (buyerPrice * sellQty) + bonusAmount;

  const handleSell = () => {
    if (selectedCrop && sellQty > 0 && sellQty <= maxQty) {
      sellCrop(selectedCrop, sellQty, finalTotal, selectedBuyer.name, bonusPercent);
      setSellQty(1);
      setSelectedCrop(null); // Reset selection
    }
  };

  const getBestCrop = () => {
    if (Object.keys(marketStats.cropSales).length === 0) return 'None';
    return Object.entries(marketStats.cropSales).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const bestSellingCropName = CROP_MARKET_DATA[getBestCrop()]?.name || 'None';

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10">
      
      {/* Header */}
      <header className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-soft">
            <Store size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Marketplace</h2>
            <p className="text-slate-500 font-bold text-sm">Sell crops and analyze trends</p>
          </div>
        </div>
        
        <div className="hidden md:flex gap-4">
          <StatPill icon={<Coins size={16}/>} label="Today" value={`₹${marketStats.todayEarnings}`} color="amber" />
          <StatPill icon={<TrendingUp size={16}/>} label="Lifetime" value={`₹${marketStats.lifetimeEarnings}`} color="farm-green" />
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Inventory & Market Board */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Inventory Overview */}
          <div className="glass p-6 rounded-3xl border border-white/60">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Package size={20} className="text-slate-500"/> Your Storage
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(inventory).map(([type, qty]) => {
                const data = CROP_MARKET_DATA[type];
                if (!data) return null;
                const isSelected = selectedCrop === type;
                
                return (
                  <div 
                    key={type}
                    onClick={() => { setSelectedCrop(type); setSellQty(1); }}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                      isSelected ? 'bg-amber-50 border-amber-400 shadow-inner' : 'bg-white/50 border-white hover:border-amber-200 hover:shadow-md'
                    } ${qty === 0 ? 'opacity-50 grayscale' : ''}`}
                  >
                    <span className="text-3xl">{data.icon}</span>
                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{data.name}</p>
                      <p className={`text-lg font-black ${qty > 0 ? 'text-slate-800' : 'text-red-400'}`}>{qty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Market Board */}
          <div className="glass p-6 rounded-3xl border border-white/60">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-slate-500"/> Live Market Prices (Season: <span className="capitalize">{season}</span>)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200/50">
                    <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Crop</th>
                    <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Demand</th>
                    <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Trend</th>
                    <th className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(CROP_MARKET_DATA).map(([type, data]) => {
                    const price = calculateCurrentPrice(type, season);
                    const demand = data.seasonDemand[season];
                    
                    let DemandBadge;
                    if (demand.status === 'high') DemandBadge = <span className="bg-farm-green-light text-farm-green-dark px-2 py-1 rounded-lg text-xs font-bold" title={demand.reason}>High Demand</span>;
                    else if (demand.status === 'low') DemandBadge = <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-bold" title={demand.reason}>Low Demand</span>;
                    else DemandBadge = <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-xs font-bold" title={demand.reason}>Stable</span>;
                    
                    let TrendIcon;
                    if (demand.trend === '▲') TrendIcon = <TrendingUp size={16} className="text-farm-green" />;
                    else if (demand.trend === '▼') TrendIcon = <TrendingDown size={16} className="text-red-500" />;
                    else TrendIcon = <Minus size={16} className="text-slate-400" />;

                    return (
                      <tr key={type} className="border-b border-slate-200/50 hover:bg-white/40 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2 font-bold text-slate-700">
                            <span>{data.icon}</span> {data.name}
                          </div>
                        </td>
                        <td className="p-3 group relative cursor-help">
                          {DemandBadge}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 font-bold text-slate-500">
                            {TrendIcon} {demand.trend}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <span className="font-black text-slate-800 text-lg flex items-center justify-end gap-1">
                            ₹{price} <Coins size={14} className="text-amber-500"/>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Agri Mentor Market Insight */}
          <div className="glass p-5 rounded-3xl border border-white/60 bg-gradient-to-br from-farm-green-light/30 to-blue-50/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Bot size={20} className="text-farm-green" /> Agri Mentor Market Insight
              </h3>
              <button onClick={refresh} disabled={isLoading} title="Refresh AI advice" className="p-1.5 text-slate-400 hover:text-farm-green rounded-lg transition-colors disabled:opacity-50">
                <RefreshCw size={15} className={isLoading ? 'animate-spin' : ''} />
              </button>
            </div>

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 py-2">
                <Loader2 size={16} className="animate-spin text-farm-green" />
                <span className="text-sm font-bold">Analyzing market conditions...</span>
              </div>
            )}

            {!isLoading && !analysis && (
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-slate-500 flex-1">Click refresh to get AI-powered market recommendations based on current prices and season.</p>
                <button onClick={refresh} className="shrink-0 px-4 py-2 bg-farm-green text-white font-bold text-sm rounded-xl hover:bg-farm-green-dark transition-colors">Get Advice</button>
              </div>
            )}

            {!isLoading && analysis?.marketAdvice && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in">
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-1">🤖 Recommendation</p>
                  <p className="font-black text-slate-800 text-lg">
                    <span className={`mr-2 px-2 py-0.5 rounded-lg text-sm ${analysis.marketAdvice.action === 'SELL NOW' ? 'bg-farm-green-light text-farm-green-dark' : 'bg-amber-100 text-amber-700'}`}>
                      {analysis.marketAdvice.action}
                    </span>
                    {analysis.marketAdvice.topCrop}
                  </p>
                  <p className="text-sm font-medium text-slate-600 mt-1">{analysis.marketAdvice.reason}</p>
                </div>
                <div className="bg-white/70 px-5 py-3 rounded-2xl border border-white text-center shrink-0">
                  <p className="text-3xl font-black text-farm-green">{analysis.marketAdvice.confidence}%</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Confidence</p>
                </div>
              </div>
            )}
          </div>
          
        </div>

        {/* Right Column: Sell Panel & Logs */}
        <div className="flex flex-col gap-6">
          
          {/* Sell Panel */}
          <div className="glass p-6 rounded-3xl border border-white/60 bg-gradient-to-b from-white/60 to-white/30">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Tag size={20} className="text-slate-500"/> Trade Center
            </h3>

            {!selectedCrop ? (
              <div className="h-48 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-2xl">
                <Package size={32} className="mb-2"/>
                <p className="font-bold">Select a crop from storage</p>
              </div>
            ) : maxQty === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-red-400 border-2 border-dashed border-red-200 bg-red-50 rounded-2xl p-4 text-center">
                <Info size={32} className="mb-2"/>
                <p className="font-bold">You don't have any {CROP_MARKET_DATA[selectedCrop]?.name || 'crop'} to sell.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-fade-in">
                
                {/* Quantity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2 font-bold text-sm">
                    <span className="text-slate-500">Quantity to Sell</span>
                    <span className="text-slate-800 bg-slate-200 px-2 py-0.5 rounded-lg">{sellQty} / {maxQty}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max={maxQty} 
                    value={sellQty}
                    onChange={(e) => setSellQty(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Buyer Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Select Buyer</label>
                  <div className="flex flex-col gap-2">
                    {BUYERS.map(buyer => (
                      <button 
                        key={buyer.id}
                        onClick={() => setSelectedBuyer(buyer)}
                        className={`text-left p-3 rounded-xl border-2 transition-all ${
                          selectedBuyer.id === buyer.id 
                            ? buyer.color + ' shadow-sm border-opacity-100' 
                            : 'bg-white/50 border-white text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex justify-between items-center font-bold">
                          <span>{buyer.name}</span>
                          <span>x{buyer.multiplier}</span>
                        </div>
                        <p className="text-xs opacity-80 mt-1 line-clamp-1">{buyer.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="bg-slate-800 text-white p-4 rounded-2xl mt-2 shadow-inner border border-slate-700">
                  <div className="flex justify-between text-sm text-slate-300 mb-1">
                    <span>Base Value ({sellQty}x)</span>
                    <span>₹{basePrice * sellQty}</span>
                  </div>
                  <div className="flex justify-between text-sm text-amber-300 mb-1">
                    <span>Buyer Modifier</span>
                    <span>{selectedBuyer.multiplier > 1 ? '+' : ''}{Math.round((selectedBuyer.multiplier - 1)*100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-farm-green-light mb-3">
                    <span className="flex items-center gap-1"><ShieldCheck size={14}/> Sustainability Bonus</span>
                    <span>+₹{bonusAmount} ({bonusPercent}%)</span>
                  </div>
                  <div className="flex justify-between text-lg font-black border-t border-slate-600 pt-2">
                    <span>Total Profit</span>
                    <span className="text-amber-400">₹{finalTotal}</span>
                  </div>
                </div>

                <button 
                  onClick={handleSell}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition-all hover:-translate-y-1 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                >
                  Confirm Sale <ArrowRight size={20}/>
                </button>
              </div>
            )}
          </div>

          {/* Market Insights */}
          <div className="glass p-6 rounded-3xl border border-white/60 bg-blue-50/50">
            <h3 className="text-lg font-black text-blue-800 mb-3 flex items-center gap-2">
              <Info size={18} /> Educational Insight
            </h3>
            <p className="text-sm font-medium text-blue-700 leading-relaxed italic">
              "{MARKET_INSIGHTS[Math.floor(Math.random() * MARKET_INSIGHTS.length)]}"
            </p>
          </div>

          {/* Farm Log */}
          <div className="glass p-6 rounded-3xl border border-white/60 flex-1 max-h-80 overflow-y-auto">
            <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2 sticky top-0 bg-white/80 backdrop-blur-md p-2 -mx-2 rounded-xl">
              <Clock size={20} className="text-slate-500"/> Farm Ledger
            </h3>
            
            <div className="flex flex-col gap-3">
              {farmLog.length === 0 ? (
                <p className="text-sm font-medium text-slate-400 text-center py-4">No transactions yet.</p>
              ) : (
                farmLog.map(log => (
                  <div key={log.id} className="bg-white/50 p-3 rounded-xl border border-white flex justify-between items-center text-sm">
                    <div>
                      <p className="font-bold text-slate-800">Sold {log.quantity} {CROP_MARKET_DATA[log.type]?.name}</p>
                      <p className="text-xs font-bold text-slate-500">to {log.buyer}</p>
                    </div>
                    <span className="font-black text-farm-green-dark bg-farm-green-light px-2 py-1 rounded-lg">+₹{log.total}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function StatPill({ icon, label, value, color }) {
  const colors = {
    amber: 'bg-amber-100 text-amber-700 border-amber-200',
    'farm-green': 'bg-farm-green-light text-farm-green-dark border-farm-green',
  };
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${colors[color]}`}>
      <div className="bg-white/50 p-1.5 rounded-lg shadow-sm">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</span>
        <span className="font-black leading-none">{value}</span>
      </div>
    </div>
  );
}
