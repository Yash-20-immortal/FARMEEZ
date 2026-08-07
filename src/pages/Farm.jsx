import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MousePointer2, Droplets, Bot } from 'lucide-react';
import Scene from '../components/3d/Scene';
import { SeasonProvider } from '../components/SeasonContext';
import SeasonController from '../components/SeasonController';
import AgriMentorPanel from '../components/modals/AgriMentorPanel';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-red-500 bg-red-100 rounded-lg">
          <h2>Something went wrong in the 3D Scene.</h2>
          <pre>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Farm() {
  const [activeTool, setActiveTool] = useState('cursor');
  const [agriMentorOpen, setAgriMentorOpen] = useState(false);

  return (
    <SeasonProvider>
      <div className="w-full h-screen relative bg-farm-sky-light overflow-hidden">
        {/* Top Left Navigation */}
        <div className="absolute top-6 left-6 z-10">
          <Link to="/app" className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-farm-green-dark font-bold hover:bg-white/90 transition-colors shadow-sm">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
        </div>

        {/* Top Right Season Controller */}
        <SeasonController />

        {/* Bottom Toolbar UI */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 glass px-6 py-3 rounded-full flex gap-4 shadow-xl border border-white/40">
          <button 
            onClick={() => setActiveTool('cursor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
              activeTool === 'cursor' ? 'bg-farm-green text-white shadow-md' : 'text-farm-brown-dark hover:bg-white/50'
            }`}
          >
            <MousePointer2 size={20} />
            Select
          </button>
          <button 
            onClick={() => setActiveTool('water')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
              activeTool === 'water' ? 'bg-blue-500 text-white shadow-md' : 'text-farm-brown-dark hover:bg-white/50'
            }`}
          >
            <Droplets size={20} />
            Water
          </button>
        </div>
        
        {/* Agri Mentor Floating Button */}
        <button
          onClick={() => setAgriMentorOpen(true)}
          title="Open Agri Mentor"
          className="absolute bottom-24 right-6 z-10 w-14 h-14 bg-gradient-to-tr from-farm-green to-green-400 text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 hover:-translate-y-1 transition-all duration-200 border-2 border-white/40"
        >
          <Bot size={26} />
        </button>

        {/* 3D Scene */}
        <ErrorBoundary>
          <Scene activeTool={activeTool} />
        </ErrorBoundary>

        {/* Agri Mentor Panel */}
        {agriMentorOpen && <AgriMentorPanel onClose={() => setAgriMentorOpen(false)} />}
      </div>
    </SeasonProvider>
  );
}
