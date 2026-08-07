import React, { useState } from 'react';
import { Bot, Zap, RefreshCw, TrendingUp, Leaf, BookOpen, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { useAgriMentor } from '../AgriMentorContext';
import AgriMentorPanel from '../modals/AgriMentorPanel';

export default function AgriMentorCard() {
  const { analysis, isLoading, error, refresh } = useAgriMentor();
  const [panelOpen, setPanelOpen] = useState(false);

  const healthColor = analysis
    ? analysis.farmHealth.score >= 8 ? 'text-farm-green-dark bg-farm-green-light' 
    : analysis.farmHealth.score >= 5 ? 'text-amber-700 bg-amber-100' 
    : 'text-red-700 bg-red-100'
    : '';

  return (
    <>
      <div className="glass p-6 rounded-3xl border border-white/60 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-farm-green to-green-400 rounded-xl flex items-center justify-center text-white shadow-soft">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-black text-slate-800">Agri Mentor</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Farm Advisor</p>
            </div>
          </div>
          <button
            onClick={refresh}
            disabled={isLoading}
            title="Refresh AI analysis"
            className="p-2 text-slate-400 hover:text-farm-green hover:bg-farm-green-light/50 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 py-8 text-slate-400">
              <Loader2 size={28} className="animate-spin text-farm-green" />
              <p className="text-sm font-bold">Analyzing your farm...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="flex flex-col items-center gap-2 py-6 text-center text-red-400">
              <AlertTriangle size={24} />
              <p className="text-sm font-bold">Unable to load analysis</p>
              <button onClick={refresh} className="text-xs font-bold underline hover:no-underline">Retry</button>
            </div>
          )}

          {!analysis && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center gap-4 py-6 text-center text-slate-400">
              <Bot size={36} className="opacity-40" />
              <p className="text-sm font-bold">Get personalized AI advice based on your real farm data</p>
              <button
                onClick={refresh}
                className="flex items-center gap-2 px-5 py-2.5 bg-farm-green text-white font-bold rounded-2xl text-sm hover:bg-farm-green-dark transition-all shadow-soft hover:-translate-y-0.5"
              >
                <Zap size={16} /> Analyze My Farm
              </button>
            </div>
          )}

          {analysis && !isLoading && (
            <div className="flex flex-col gap-3 animate-fade-in">
              {/* Farm Health */}
              <div className={`flex items-center justify-between p-3 rounded-xl ${healthColor}`}>
                <span className="font-bold text-sm">Farm Health</span>
                <span className="font-black">{analysis.farmHealth.score}/10 — {analysis.farmHealth.badge}</span>
              </div>

              {/* Market Tip */}
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200/50">
                <TrendingUp size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-black text-amber-600 uppercase tracking-wider">Market Advice</span>
                  <p className="text-sm font-bold text-slate-700 mt-0.5">
                    <span className={`mr-1 px-1.5 py-0.5 rounded text-xs font-black ${analysis.marketAdvice.action === 'SELL NOW' ? 'bg-farm-green-light text-farm-green-dark' : 'bg-amber-200 text-amber-800'}`}>
                      {analysis.marketAdvice.action}
                    </span>
                    {analysis.marketAdvice.topCrop}
                  </p>
                </div>
              </div>

              {/* Learning Tip */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200/50">
                <BookOpen size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs font-bold text-blue-700 leading-relaxed line-clamp-2">{analysis.learningTip}</p>
              </div>

              {/* Next Action */}
              <div className="flex items-start gap-3 p-3 bg-farm-green-light/30 rounded-xl border border-farm-green/20">
                <Leaf size={16} className="text-farm-green-dark mt-0.5 shrink-0" />
                <p className="text-xs font-bold text-farm-green-dark leading-relaxed line-clamp-2">{analysis.nextRecommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {analysis && (
          <button
            onClick={() => setPanelOpen(true)}
            className="mt-4 w-full py-3 border-2 border-farm-green/40 text-farm-green-dark font-bold text-sm rounded-2xl hover:bg-farm-green hover:text-white transition-all flex items-center justify-center gap-2"
          >
            View Full Analysis <ArrowRight size={16} />
          </button>
        )}
      </div>

      {panelOpen && <AgriMentorPanel onClose={() => setPanelOpen(false)} />}
    </>
  );
}
