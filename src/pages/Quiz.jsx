import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { COURSES } from '../data/coursesData';
import { useGame } from '../components/GameContext';

export default function Quiz() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { passQuiz } = useGame();

  const course = COURSES.find(c => c.id === parseInt(courseId));
  const lesson = course?.lessons.find(l => l.id === parseInt(lessonId));
  const questions = lesson?.quiz;

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions) return <div className="p-10">Quiz not found.</div>;

  const q = questions[currentQ];

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    
    if (idx === q.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score + (selectedOption === q.correct ? 1 : 0) === questions.length) {
         passQuiz(course.id, lesson.id, questions.length);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const passed = score === questions.length;
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="glass p-10 rounded-3xl max-w-lg w-full text-center border-2 shadow-xl flex flex-col items-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner ${passed ? 'bg-farm-green-light text-farm-green-dark' : 'bg-red-100 text-red-500'}`}>
            {passed ? <Trophy size={48} /> : <RotateCcw size={48} />}
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-2">{passed ? 'Quiz Passed!' : 'Quiz Failed'}</h2>
          <p className="text-lg font-bold text-slate-500 mb-8">You scored {score} out of {questions.length}</p>
          
          {passed ? (
            <div className="bg-blue-50 p-6 rounded-2xl mb-8 border border-blue-100">
              <p className="font-bold text-blue-800 mb-2">Farm Level Granted!</p>
              <p className="text-sm text-blue-600 font-medium">You've successfully completed the lesson and unlocked the next phase of your farm.</p>
            </div>
          ) : (
            <p className="text-slate-600 font-medium mb-8">You must answer all questions correctly to prove you've mastered the lesson. Try again!</p>
          )}

          <div className="flex gap-4 w-full">
            {!passed && (
              <button onClick={handleRetry} className="flex-1 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors">
                Retry Quiz
              </button>
            )}
            <button onClick={() => navigate('/app/learn')} className="flex-1 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors">
              Return to Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 max-w-3xl mx-auto w-full animate-fade-in-up">
      <div className="w-full mb-8">
        <div className="flex justify-between text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>
        <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden shadow-inner border border-white">
          <div 
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${((currentQ) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass w-full p-8 md:p-10 rounded-[2rem] border border-white/60 shadow-xl">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-8 leading-tight">
          {q.q}
        </h2>

        <div className="flex flex-col gap-4 mb-8">
          {q.options.map((opt, idx) => {
            let stateClass = "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md";
            if (isAnswered) {
              if (idx === q.correct) stateClass = "bg-farm-green-light border-farm-green text-farm-green-dark shadow-inner";
              else if (idx === selectedOption) stateClass = "bg-red-50 border-red-300 text-red-700 shadow-inner";
              else stateClass = "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
            }

            return (
              <button 
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-5 rounded-2xl border-2 font-bold text-lg transition-all ${stateClass} flex justify-between items-center`}
              >
                <span>{opt}</span>
                {isAnswered && idx === q.correct && <CheckCircle2 className="text-farm-green" />}
                {isAnswered && idx === selectedOption && idx !== q.correct && <XCircle className="text-red-500" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`p-6 rounded-2xl mb-8 animate-fade-in-up border-l-4 ${selectedOption === q.correct ? 'bg-farm-green-light/30 border-farm-green' : 'bg-red-50 border-red-400'}`}>
            <h4 className={`font-black mb-2 flex items-center gap-2 ${selectedOption === q.correct ? 'text-farm-green-dark' : 'text-red-700'}`}>
              {selectedOption === q.correct ? <><CheckCircle2 size={20}/> Correct!</> : <><XCircle size={20}/> Incorrect</>}
            </h4>
            <p className="text-slate-700 font-medium leading-relaxed">{q.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          <button 
            disabled={!isAnswered}
            onClick={handleNext}
            className={`px-8 py-4 rounded-xl font-black text-lg flex items-center gap-2 transition-all ${
              isAnswered ? 'bg-blue-500 text-white hover:bg-blue-600 hover:-translate-y-1 shadow-lg shadow-blue-500/30' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentQ === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
