import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, BrainCircuit } from 'lucide-react';
import { COURSES } from '../data/coursesData';

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = COURSES.find(c => c.id === parseInt(courseId));
  const lesson = course?.lessons.find(l => l.id === parseInt(lessonId));

  if (!lesson) {
    return <div className="p-10 text-center">Lesson not found.</div>;
  }

  return (
    <div className="animate-fade-in-up h-full flex flex-col gap-6 pb-10 max-w-4xl mx-auto">
      
      <Link to="/app/learn" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-farm-green-dark transition-colors self-start bg-white/50 px-4 py-2 rounded-xl">
        <ArrowLeft size={20} /> Back to Learning Center
      </Link>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white shadow-sm gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner shrink-0">
            <BookOpen size={32} />
          </div>
          <div>
            <span className="text-sm font-bold text-blue-500 uppercase tracking-wider block mb-1">Course {course.id} • Lesson {lesson.id}</span>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">{lesson.title}</h2>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {lesson.content.map((card, idx) => (
          <div key={idx} className="glass p-8 rounded-3xl border border-white/60 shadow-soft flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200 shadow-inner">
               <span className="text-slate-400 font-bold">Illustration Placeholder</span>
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-black text-slate-800 mb-4">{card.title}</h3>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={() => navigate(`/app/quiz/${course.id}/${lesson.id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center gap-3 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
        >
          <BrainCircuit size={28} />
          Start Quiz Assessment
        </button>
      </div>

    </div>
  );
}
