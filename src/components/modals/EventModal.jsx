import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, Leaf, Droplets, Coins, ArrowRight } from 'lucide-react';
import { useGame } from '../../components/GameContext';
import { FARMING_EVENTS } from '../../data/eventData';

export default function EventModal() {
  const { activeEvent, resolveEvent, ecoScore } = useGame();
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Reset local state when a new event triggers
  useEffect(() => {
    if (activeEvent) {
      setSelectedChoice(null);
    }
  }, [activeEvent]);

  if (!activeEvent) return null;

  const eventData = FARMING_EVENTS[activeEvent];
  if (!eventData) return null;

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const handleContinue = () => {
    resolveEvent(selectedChoice.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-farm-bg w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden animate-fade-in-up border-4 border-white/50 relative">
        
        {/* Dynamic Header */}
        <div className={`${eventData.color} p-8 flex items-center gap-4 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <span className="text-6xl drop-shadow-md z-10">{eventData.icon}</span>
          <div className="z-10">
            <h2 className="text-3xl font-black tracking-tight drop-shadow-sm">{eventData.title}</h2>
            <p className="font-bold opacity-90 mt-1">Farm Emergency</p>
          </div>
        </div>

        <div className="p-8">
          {!selectedChoice ? (
            <div className="flex flex-col gap-6 animate-fade-in">
              <p className="text-lg font-bold text-slate-700 leading-relaxed border-l-4 pl-4 border-slate-300">
                {eventData.description}
              </p>

              <div className="mt-4">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-wider mb-3">How will you respond?</h3>
                <div className="flex flex-col gap-3">
                  {eventData.choices.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      className="group text-left p-4 bg-white/70 hover:bg-white border-2 border-transparent hover:border-amber-400 rounded-2xl transition-all shadow-sm hover:shadow-md flex justify-between items-center"
                    >
                      <span className="font-bold text-slate-800 text-lg group-hover:text-amber-600 transition-colors">
                        {choice.text}
                      </span>
                      <div className="flex gap-4">
                        {choice.cost > 0 && (
                          <span className="flex items-center gap-1 text-sm font-bold text-amber-500">
                            <Coins size={16}/> -₹{choice.cost}
                          </span>
                        )}
                        <span className={`flex items-center gap-1 text-sm font-bold ${choice.ecoChange > 0 ? 'text-farm-green-dark' : 'text-red-500'}`}>
                          <Leaf size={16}/> {choice.ecoChange > 0 ? '+' : ''}{choice.ecoChange} Eco
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border-2 border-farm-green shadow-soft">
                <div className="bg-farm-green p-3 rounded-full text-white shrink-0">
                  <CheckCircle size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">Decision Made: {selectedChoice.text}</h3>
                  <p className="font-bold text-slate-600 leading-relaxed">
                    {selectedChoice.takeaway}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-slate-500">Coins Cost</span>
                  <span className="font-black text-amber-500">-₹{selectedChoice.cost}</span>
                </div>
                <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between">
                  <span className="font-bold text-slate-500">Eco Impact</span>
                  <span className={`font-black ${selectedChoice.ecoChange > 0 ? 'text-farm-green' : 'text-red-500'}`}>
                    {selectedChoice.ecoChange > 0 ? '+' : ''}{selectedChoice.ecoChange}
                  </span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="mt-4 w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex justify-center items-center gap-2"
              >
                Return to Farm <ArrowRight size={20}/>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
