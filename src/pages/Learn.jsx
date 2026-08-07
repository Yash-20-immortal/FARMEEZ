import React from 'react';
import { BookOpen, Lock, CheckCircle, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../components/GameContext';
import { COURSES } from '../data/coursesData';

export default function Learn() {
  const { level, xp, getRequiredXP, learningProgress } = useGame();
  const navigate = useNavigate();

  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  const progressPercent = Math.round((learningProgress.passedQuizzes / totalLessons) * 100);

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10">
      <header className="flex justify-between items-center bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm mb-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-soft">
            <BookOpen size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Learning Center</h2>
            <p className="text-slate-500 font-bold text-sm">Master Agricultural Science</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-slate-500 mb-2">Course Progress: {progressPercent}%</span>
          <div className="w-32 h-2.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-8">
        {COURSES.map((course) => (
          <div key={course.id} className="glass p-6 rounded-3xl border border-white/60">
            <h3 className="text-xl font-black text-slate-800 mb-2">Course {course.id}: {course.title}</h3>
            <p className="text-slate-600 font-medium mb-6">{course.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.lessons.map(lesson => {
                const quizKey = `${course.id}_${lesson.id}`;
                const isCompleted = !!learningProgress.scores[quizKey];
                
                // Unlock condition: Farm level is higher than or equal to required
                const isUnlocked = isCompleted || level >= lesson.requiredFarmLevel;

                return (
                  <div key={lesson.id} className={`p-4 rounded-2xl border-2 transition-all ${
                    isCompleted ? 'bg-farm-green-light/30 border-farm-green-light' : 
                    isUnlocked ? 'bg-white border-blue-200 hover:border-blue-400' : 
                    'bg-slate-100 border-transparent opacity-75'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800">{lesson.id}. {lesson.title}</h4>
                      {isCompleted ? <CheckCircle className="text-farm-green" size={20} /> : 
                       isUnlocked ? <Play className="text-blue-500" size={20} /> :
                       <Lock className="text-slate-400" size={20} />}
                    </div>
                    <p className="text-xs font-bold text-slate-500 mb-4">
                      {isCompleted ? `Score: ${learningProgress.scores[quizKey]}/5` : `Requires Farm Level ${lesson.requiredFarmLevel} Completed`}
                    </p>
                    
                    <button 
                      disabled={!isUnlocked}
                      onClick={() => navigate(`/app/learn/${course.id}/${lesson.id}`)}
                      className={`w-full py-2.5 rounded-xl font-bold transition-all ${
                        isCompleted ? 'bg-farm-green-light text-farm-green-dark hover:bg-farm-green/40' :
                        isUnlocked ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-soft hover:-translate-y-0.5' :
                        'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? 'Review Lesson' : isUnlocked ? 'Start Lesson' : 'Locked'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
