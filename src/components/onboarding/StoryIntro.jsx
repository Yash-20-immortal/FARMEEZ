import React, { useState } from 'react';
import { useGame } from '../GameContext';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SLIDES = [
  { 
    emoji: "🌍",
    text: "Agriculture feeds the world.\nEvery meal begins with a farmer." 
  },
  { 
    emoji: "🌱",
    text: "Healthy soil,\nclean water,\nand sustainable practices\nprotect future generations." 
  },
  { 
    emoji: "🌾",
    text: "Farmers must manage\nweather,\npests,\nmarket prices,\nand natural resources.\n\nEvery decision matters." 
  },
  { 
    emoji: "📚",
    text: "FARMEEZ lets you experience farming,\nlearn sustainable agriculture,\nand improve through real challenges." 
  },
  { 
    emoji: "🤖",
    text: "Meet Agri Mentor,\nyour intelligent farming companion.\n\nHe will guide you throughout your journey." 
  }
];

export default function StoryIntro() {
  const { welcomeCompleted, storyCompleted, completeStory, skipTutorial } = useGame();
  const [currentSlide, setCurrentSlide] = useState(0);

  // We only show this after welcome is completed, but before story is completed
  const shouldShow = welcomeCompleted && !storyCompleted;

  if (!shouldShow) return null;

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      completeStory();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const currentData = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Soft background overlay gradient that slowly pulses */}
      <div className="absolute inset-0 bg-gradient-to-br from-farm-green-dark/40 via-slate-900 to-amber-900/40 opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>

      {/* Top Right Skip */}
      <button 
        onClick={skipTutorial}
        className="absolute top-8 right-8 z-20 text-white/50 hover:text-white font-bold tracking-widest text-sm uppercase transition-colors"
      >
        Skip
      </button>

      {/* Main Content Area */}
      <div 
        key={currentSlide} // Force re-render animation on slide change
        className="relative z-10 text-center max-w-4xl flex flex-col items-center animate-fade-in-up"
      >
        <div className="text-6xl mb-8 animate-bounce" style={{ animationDuration: '2s' }}>
          {currentData.emoji}
        </div>
        
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-relaxed whitespace-pre-line mb-6 drop-shadow-lg text-slate-100">
          {currentData.text}
        </h2>
      </div>

      {/* Unified Controls (Bottom) */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-between items-center px-12 max-w-6xl mx-auto w-full">
        {/* Bottom Left Previous */}
        {currentSlide > 0 ? (
          <button 
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-300 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm"
          >
            <ArrowLeft size={18} /> Previous
          </button>
        ) : (
          <div></div> // Empty spacer
        )}
        
        {/* Bottom Right Next */}
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-farm-green hover:bg-farm-green-dark rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
        >
          {currentSlide === SLIDES.length - 1 ? 'Meet Agri Mentor' : 'Next'} <ArrowRight size={18} />
        </button>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-8 bg-farm-green' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
