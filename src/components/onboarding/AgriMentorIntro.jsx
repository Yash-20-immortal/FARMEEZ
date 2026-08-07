import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Tractor, LayoutDashboard } from 'lucide-react';
import { useGame } from '../GameContext';
import Button from '../ui/Button';

export default function AgriMentorIntro() {
  const { tutorialCompleted, storyCompleted, mentorIntroduced, completeMentor, profile } = useGame();
  const navigate = useNavigate();

  // Show only if story is done, but mentor is not yet introduced
  const shouldShow = tutorialCompleted && storyCompleted && !mentorIntroduced;

  if (!shouldShow) return null;

  const handleStartFarming = () => {
    completeMentor();
    navigate('/app/farm');
  };

  const handleExploreDashboard = () => {
    completeMentor();
    navigate('/app');
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in-up">
      <div className="bg-white max-w-2xl w-full rounded-[2.5rem] p-8 md:p-12 shadow-2xl border-4 border-farm-green-dark relative overflow-hidden">
        
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-farm-green-light rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Mentor Avatar */}
          <div className="shrink-0">
            <div className="w-32 h-32 bg-gradient-to-tr from-farm-green-dark to-farm-green rounded-full flex items-center justify-center shadow-lg border-8 border-white animate-bounce" style={{ animationDuration: '3s' }}>
              <Bot size={64} className="text-white" />
            </div>
          </div>

          {/* Dialogue */}
          <div className="flex-1">
            <h2 className="text-3xl font-black text-slate-800 mb-4">
              👋 Welcome, <span className="text-farm-green-dark">{profile?.displayName || 'Farmer'}</span>.
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              I'm <strong className="text-slate-800">Agri Mentor</strong>. I'll guide you through every season, every harvest, every challenge, and every opportunity.
              <br/><br/>
              Whenever you need advice, market insights, or sustainable farming guidance, I'm always here to help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleStartFarming} size="lg" className="flex-1 justify-center shadow-md">
                <Tractor className="mr-2" size={20} /> Start Farming
              </Button>
              
              <button 
                onClick={handleExploreDashboard}
                className="flex-1 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors shadow-sm"
              >
                <LayoutDashboard className="mr-2" size={20} /> Explore Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
