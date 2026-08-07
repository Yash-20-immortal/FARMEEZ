import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES } from '../../data/coursesData';

export default function LearningProgressCard({ learningProgress }) {
  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  const progressPercent = Math.round((learningProgress.passedQuizzes / totalLessons) * 100);
  
  // Find current course and lesson
  let currentCourse = COURSES[0];
  let currentLesson = currentCourse.lessons[0];
  
  // A simple way to find the next locked lesson
  outer: for (const course of COURSES) {
    for (const lesson of course.lessons) {
      if (!learningProgress.scores[`${course.id}_${lesson.id}`]) {
        currentCourse = course;
        currentLesson = lesson;
        break outer;
      }
    }
  }

  const isCompletedAll = learningProgress.passedQuizzes === totalLessons;

  return (
    <div id="tour-learning-progress" className="glass p-6 rounded-3xl border border-white/60 col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-slate-800">Learning Progress</h3>
        <Link to="/app/learn" className="text-sm font-bold text-blue-500 hover:underline flex items-center gap-1">
          Open Hub <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
            <span>Overall Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-600">
            {learningProgress.passedQuizzes} of {totalLessons} modules completed.
          </p>
        </div>

        <div className="w-full md:w-1/2 p-4 bg-white/50 rounded-2xl border border-white shadow-soft">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">
                {isCompletedAll ? 'Curriculum Finished' : 'Up Next'}
              </p>
              <h4 className="font-black text-slate-800">
                {isCompletedAll ? 'Master Agronomist' : currentLesson.title}
              </h4>
            </div>
          </div>
          {!isCompletedAll && (
            <p className="text-sm text-slate-500 font-medium">Course {currentCourse.id}: {currentCourse.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}
