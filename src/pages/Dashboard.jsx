import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, RotateCcw } from 'lucide-react';
import DashboardHeader from '../components/layout/DashboardHeader';
import ActionCard from '../components/cards/ActionCard';
import StatisticsCard from '../components/cards/StatisticsCard';
import AchievementsCard from '../components/cards/AchievementsCard';
import RecentActivityCard from '../components/cards/RecentActivityCard';
import AgriMentorCard from '../components/cards/AgriMentorCard';
import LearningProgressCard from '../components/cards/LearningProgressCard';
import { useGame } from '../components/GameContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { achievements, activities, stats, xp, lifetimeXp, level, learningProgress } = useGame();

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10">
      
      {/* Top Navigation / Header Stats */}
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area (2/3 width on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <ActionCard 
              title="Quick Start" 
              subtitle="Jump into next module" 
              icon={<Play className="text-white" size={24} />} 
              color="green" 
              onClick={() => navigate('/app/farm')}
            />
            <ActionCard 
              id="tour-continue-farming"
              title="Continue Farming" 
              subtitle="Return to your plots" 
              icon={<RotateCcw className="text-white" size={24} />} 
              color="brown" 
              onClick={() => navigate('/app/farm')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LearningProgressCard learningProgress={learningProgress} level={level} />
            <StatisticsCard stats={stats} lifetimeXp={lifetimeXp} />
            <AchievementsCard achievements={achievements} />
          </div>

        </div>

        {/* Sidebar / Secondary Content Area (1/3 width on large screens) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <AgriMentorCard />
          <RecentActivityCard activities={activities} />
        </div>
        
      </div>
    </div>
  );
}
