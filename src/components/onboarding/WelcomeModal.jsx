import React from 'react';
import { useGame } from '../GameContext';

export default function WelcomeModal() {
  const { welcomeCompleted, completeWelcome, skipTutorial } = useGame();

  if (welcomeCompleted) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in-up">
      <div className="bg-white max-w-sm w-full rounded-[2.5rem] p-8 md:p-10 shadow-2xl border-4 border-farm-green-dark relative overflow-hidden text-center">
        
        <h2 className="text-3xl font-black text-slate-800 mb-4">Welcome to <span className="text-farm-green-dark tracking-tight">FARMEEZ</span></h2>
        <p className="text-lg text-slate-600 font-medium leading-relaxed mb-10">
          Let's learn sustainable farming together.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={completeWelcome}
            className="w-full py-4 bg-farm-green hover:bg-farm-green-dark text-white font-black rounded-xl shadow-md transition-transform hover:-translate-y-1 text-lg"
          >
            Continue
          </button>
          
          <button 
            onClick={skipTutorial}
            className="w-full py-3 text-slate-400 hover:text-slate-600 font-bold transition-colors uppercase tracking-widest text-xs"
          >
            Skip Entire Onboarding
          </button>
        </div>
      </div>
    </div>
  );
}
