import React, { useState } from 'react';
import { Bot, RefreshCw, Send, X, Leaf, TrendingUp, BookOpen, Zap, ShieldCheck, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAgriMentor } from '../AgriMentorContext';

export default function AgriMentorPanel({ onClose }) {
  const { analysis, isLoading, error, refresh, askQuestion, qaHistory } = useAgriMentor();
  const [activeTab, setActiveTab] = useState('analysis');
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const handleAsk = async () => {
    if (!question.trim() || isAsking) return;
    setIsAsking(true);
    setCurrentAnswer('');
    try {
      const answer = await askQuestion(question.trim());
      setCurrentAnswer(answer);
      setQuestion('');
    } catch {
      setCurrentAnswer('Sorry, I could not process your question. Please try again.');
    } finally {
      setIsAsking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAsk(); }
  };

  const SUGGESTED_QUESTIONS = [
    'How do I improve my soil health?',
    'What crops should I plant this season?',
    'How can I raise my Eco Score?',
    'What is Integrated Pest Management?',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/50 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg h-[90vh] bg-farm-bg rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border-2 border-white/50 animate-fade-in-up">

        {/* Header */}
        <div className="bg-gradient-to-r from-farm-green to-green-600 p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Bot size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Agri Mentor</h2>
              <p className="text-green-100 text-sm font-bold">Your AI Farm Advisor</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-xl transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200/60 bg-white/40 shrink-0">
          {[['analysis', 'Farm Analysis'], ['ask', 'Ask a Question']].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 font-bold text-sm transition-all ${activeTab === tab ? 'text-farm-green border-b-2 border-farm-green bg-white/50' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'analysis' ? (
            <AnalysisTab analysis={analysis} isLoading={isLoading} error={error} onRefresh={refresh} />
          ) : (
            <AskTab
              question={question}
              setQuestion={setQuestion}
              onAsk={handleAsk}
              onKeyDown={handleKeyDown}
              isAsking={isAsking}
              currentAnswer={currentAnswer}
              qaHistory={qaHistory}
              suggestedQuestions={SUGGESTED_QUESTIONS}
              onSuggestion={(q) => { setQuestion(q); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function AnalysisTab({ analysis, isLoading, error, onRefresh }) {
  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-48 gap-4 text-slate-500">
      <Loader2 size={36} className="animate-spin text-farm-green" />
      <p className="font-bold">Analyzing your farm...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-48 gap-4 text-red-500 text-center p-4">
      <AlertTriangle size={36} />
      <p className="font-bold">{error}</p>
      <button onClick={onRefresh} className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-bold hover:bg-red-200 transition-colors">Retry</button>
    </div>
  );

  if (!analysis) return (
    <div className="flex flex-col items-center justify-center h-48 gap-4 text-slate-400 text-center p-4">
      <Bot size={48} className="opacity-50" />
      <p className="font-bold text-lg">Ready to analyze your farm</p>
      <p className="text-sm">Get personalized advice based on your current farm state, market prices, and learning progress.</p>
      <button
        onClick={onRefresh}
        className="mt-2 px-6 py-3 bg-farm-green text-white font-black rounded-2xl hover:bg-farm-green-dark transition-all shadow-lg shadow-farm-green/30 hover:-translate-y-0.5 flex items-center gap-2"
      >
        <Zap size={18} /> Get Full Analysis
      </button>
    </div>
  );

  const { greeting, farmHealth, marketAdvice, weatherEffect, eventAdvice, sustainability, learningTip, nextRecommendation } = analysis;

  const healthColor = farmHealth.score >= 8 ? 'text-farm-green' : farmHealth.score >= 5 ? 'text-amber-500' : 'text-red-500';
  const healthBg = farmHealth.score >= 8 ? 'bg-farm-green-light' : farmHealth.score >= 5 ? 'bg-amber-100' : 'bg-red-100';

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      <p className="text-slate-600 font-bold italic text-sm leading-relaxed bg-white/60 p-4 rounded-2xl border border-white">"{greeting}"</p>

      {/* Farm Health */}
      <AnalysisSection icon={<ShieldCheck size={18} />} title="Farm Health" color="farm-green">
        <div className={`flex items-center justify-between p-3 ${healthBg} rounded-xl mb-2`}>
          <span className={`font-black text-2xl ${healthColor}`}>{farmHealth.score}/10</span>
          <span className={`font-bold px-3 py-1 rounded-lg text-sm ${healthBg} ${healthColor} border border-current`}>{farmHealth.badge}</span>
        </div>
        <p className="text-sm text-slate-600 font-medium">{farmHealth.reason}</p>
      </AnalysisSection>

      {/* Market Advice */}
      <AnalysisSection icon={<TrendingUp size={18} />} title="Market Advice" color="amber">
        <div className="flex items-center justify-between mb-2">
          <span className="font-black text-slate-800">{marketAdvice.topCrop}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">{marketAdvice.confidence}% confidence</span>
            <span className={`px-3 py-1 rounded-lg text-xs font-black ${marketAdvice.action === 'SELL NOW' ? 'bg-farm-green-light text-farm-green-dark' : 'bg-amber-100 text-amber-700'}`}>
              {marketAdvice.action}
            </span>
          </div>
        </div>
        <p className="text-sm text-slate-600 font-medium">{marketAdvice.reason}</p>
      </AnalysisSection>

      {/* Season Effect */}
      <AnalysisSection icon={<Leaf size={18} />} title="Season Effect" color="blue">
        <p className="text-sm text-slate-600 font-medium">{weatherEffect}</p>
      </AnalysisSection>

      {/* Active Event */}
      {eventAdvice && (
        <AnalysisSection icon={<AlertTriangle size={18} />} title="Active Event" color="red">
          <p className="text-sm text-slate-600 font-medium">{eventAdvice}</p>
        </AnalysisSection>
      )}

      {/* Sustainability */}
      <AnalysisSection icon={<CheckCircle2 size={18} />} title="Sustainability" color="farm-green">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-farm-green transition-all" style={{ width: `${sustainability.score}%` }} />
          </div>
          <span className="font-black text-farm-green-dark text-sm">{sustainability.score}/100</span>
        </div>
        <p className="text-sm text-slate-600 font-medium mb-1">{sustainability.summary}</p>
        <p className="text-xs font-bold text-farm-green-dark bg-farm-green-light/40 px-3 py-2 rounded-lg">💡 {sustainability.tip}</p>
      </AnalysisSection>

      {/* Learning Tip */}
      <AnalysisSection icon={<BookOpen size={18} />} title="Learning Tip" color="blue">
        <p className="text-sm text-slate-600 font-medium">{learningTip}</p>
      </AnalysisSection>

      {/* Next Action */}
      <div className="bg-slate-800 text-white p-4 rounded-2xl mt-2">
        <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">⭐ Top Recommendation</p>
        <p className="font-bold leading-relaxed">{nextRecommendation}</p>
      </div>

      <button
        onClick={onRefresh}
        className="w-full py-3 flex items-center justify-center gap-2 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 hover:border-farm-green hover:text-farm-green transition-all text-sm mt-2"
      >
        <RefreshCw size={16} /> Refresh Analysis
      </button>
    </div>
  );
}

function AskTab({ question, setQuestion, onAsk, onKeyDown, isAsking, currentAnswer, qaHistory, suggestedQuestions, onSuggestion }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Current answer */}
      {(isAsking || currentAnswer) && (
        <div className="bg-white/70 border border-farm-green/30 rounded-2xl p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <Bot size={18} className="text-farm-green" />
            <span className="font-black text-farm-green-dark text-sm">Agri Mentor</span>
          </div>
          {isAsking ? (
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-sm font-bold">Thinking...</span>
            </div>
          ) : (
            <p className="text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">{currentAnswer}</p>
          )}
        </div>
      )}

      {/* Suggested questions */}
      {!currentAnswer && !isAsking && (
        <div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Suggested Questions</p>
          <div className="flex flex-col gap-2">
            {suggestedQuestions.map((q, i) => (
              <button key={i} onClick={() => onSuggestion(q)} className="text-left text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 items-end">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask anything about farming..."
          rows={3}
          className="flex-1 p-3 bg-white/70 border-2 border-slate-200 focus:border-farm-green rounded-2xl text-sm font-medium text-slate-800 outline-none resize-none transition-colors"
        />
        <button
          onClick={onAsk}
          disabled={!question.trim() || isAsking}
          className="p-3 bg-farm-green text-white rounded-2xl hover:bg-farm-green-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          {isAsking ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </div>

      {/* Session history */}
      {qaHistory.length > 0 && (
        <div className="mt-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Session History</p>
          <div className="flex flex-col gap-3">
            {qaHistory.map((entry, i) => (
              <div key={i} className="bg-white/50 p-3 rounded-xl border border-white text-sm">
                <p className="font-black text-slate-700 mb-1">Q: {entry.question}</p>
                <p className="text-slate-500 font-medium line-clamp-2">{entry.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisSection({ icon, title, children }) {
  const colorMap = {
    'farm-green': 'text-farm-green-dark bg-farm-green-light/50',
    'amber': 'text-amber-700 bg-amber-100/60',
    'blue': 'text-blue-700 bg-blue-100/60',
    'red': 'text-red-700 bg-red-100/60',
  };
  return (
    <div className="bg-white/60 p-4 rounded-2xl border border-white">
      <div className="flex items-center gap-2 mb-3">
        <span className={`${colorMap['farm-green']} p-1.5 rounded-lg`}>{icon}</span>
        <h4 className="font-black text-slate-800 text-sm">{title}</h4>
      </div>
      {children}
    </div>
  );
}
