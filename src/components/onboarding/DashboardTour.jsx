import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../GameContext';

const TOUR_STEPS = [
  { id: 'tour-continue-farming', msg: "Return to your farm." },
  { id: 'tour-learning', msg: "Complete lessons and quizzes." },
  { id: 'tour-marketplace', msg: "Sell crops and study demand." },
  { id: 'tour-profile', msg: "Track your farming journey." },
  { id: 'tour-settings', msg: "Customize your experience." },
  { id: 'tour-learning-progress', msg: "Monitor your educational growth." },
  { id: 'tour-farm-log', msg: "View everything you've accomplished." }
];

export default function DashboardTour() {
  const { welcomeCompleted, storyCompleted, tutorialCompleted, completeTour, skipTutorial } = useGame();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Show only after welcome and story, but before tour is finished
  const shouldShow = welcomeCompleted && storyCompleted && !tutorialCompleted;

  // Force dashboard view during tour
  useEffect(() => {
    if (shouldShow && location.pathname !== '/app') {
      navigate('/app', { replace: true });
    }
  }, [shouldShow, location.pathname, navigate]);

  const currentStepData = TOUR_STEPS[currentStepIndex];

  const updateRect = useCallback(() => {
    if (!currentStepData || !currentStepData.id) {
      setTargetRect(null);
      return;
    }
    const el = document.getElementById(currentStepData.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    } else {
      setTargetRect(null);
    }
  }, [currentStepData]);

  useEffect(() => {
    if (!shouldShow) return;
    updateRect();
    const interval = setInterval(updateRect, 100);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [updateRect, shouldShow]);

  if (!shouldShow || !currentStepData) return null;

  const handleNext = () => {
    if (currentStepIndex === TOUR_STEPS.length - 1) {
      completeTour();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-500">
      
      {/* SVG Overlay for Dimming with Cutout */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'auto' }}>
        <defs>
          <mask id="tour-mask">
            <rect width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect 
                x={targetRect.left - 8} 
                y={targetRect.top - 8} 
                width={targetRect.width + 16} 
                height={targetRect.height + 16} 
                fill="black" 
                rx="16"
              />
            )}
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(15, 23, 42, 0.7)" mask="url(#tour-mask)" />
      </svg>

      {/* Floating Message Card */}
      <div 
        className="absolute bg-white p-6 rounded-3xl shadow-2xl border-4 border-farm-green max-w-sm pointer-events-auto flex flex-col justify-between"
        style={{
          minHeight: '160px',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          ...(targetRect ? {
            // Position near the cutout
            top: Math.min(targetRect.top + targetRect.height + 20, window.innerHeight - 200),
            left: Math.max(20, Math.min(targetRect.left, window.innerWidth - 300)),
          } : {
            // Center if no target
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'fade-in-up 0.5s ease-out'
          })
        }}
      >
        {/* Top Right Skip */}
        <button 
          onClick={skipTutorial}
          className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider"
        >
          Skip
        </button>

        <div className="mt-4 mb-8">
          <p className="text-lg font-bold text-slate-600 whitespace-pre-line leading-relaxed">
            {currentStepData.msg}
          </p>
        </div>

        <div className="flex justify-between items-center mt-auto">
          {/* Bottom Left Previous */}
          {currentStepIndex > 0 ? (
            <button 
              onClick={handlePrev}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors bg-slate-100 rounded-xl"
            >
              Previous
            </button>
          ) : (
            <div></div> // empty spacer
          )}
          
          {/* Bottom Right Next */}
          <button 
            onClick={handleNext}
            className="px-6 py-2 text-sm font-bold text-white bg-farm-green hover:bg-farm-green-dark rounded-xl shadow-md transition-all hover:-translate-y-0.5"
          >
            {currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next →'}
          </button>
        </div>
      </div>
      
    </div>
  );
}
