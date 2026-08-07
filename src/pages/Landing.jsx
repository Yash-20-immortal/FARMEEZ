import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Sun, Droplets, Trophy, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import FeatureCard from '../components/cards/FeatureCard';
import Footer from '../components/layout/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-farm-bg font-sans pt-20 overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-farm-sky-light rounded-full blur-3xl opacity-60 -z-10 translate-x-1/4"></div>
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-farm-green-light rounded-full blur-3xl opacity-50 -z-10 -translate-x-1/4"></div>

        <div className="flex-1 text-center md:text-left z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 leading-tight mb-6">
            Grow Your <span className="text-farm-green-dark">Future</span> With Sustainable Farming
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Join the gamified learning revolution. Master real-world agricultural skills, save water, and build your digital farm while saving the planet.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10">
                Play Now <Trophy className="ml-2" size={20} />
              </Button>
            </Link>
            <a href="#about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-lg relative z-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Hero Illustration Placeholder */}
          <div className="aspect-square bg-gradient-to-br from-farm-green to-farm-sky-light rounded-[3rem] shadow-float p-2 relative">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-[3rem] border-2 border-white/50"></div>
            <div className="w-full h-full bg-white/40 rounded-[2.5rem] flex flex-col items-center justify-center text-farm-green-dark relative z-10 border border-white/60">
               <Sprout size={100} opacity={0.8} className="mb-4 drop-shadow-md" />
               <h3 className="text-2xl font-black">Beautiful Farm Illustration</h3>
               <p className="font-bold opacity-70">Interactive 3D Elements</p>
            </div>
            
            {/* Floating badges */}
            <div className="absolute -left-6 top-1/4 glass p-4 rounded-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-amber-100 p-2 rounded-xl text-amber-600"><Sun size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-500">Weather</p>
                <p className="font-black text-slate-800">Sunny, 24°C</p>
              </div>
            </div>
            
            <div className="absolute -right-6 bottom-1/4 glass p-4 rounded-2xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Droplets size={24} /></div>
              <div>
                <p className="text-xs font-bold text-slate-500">Irrigation</p>
                <p className="font-black text-slate-800">Optimized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">Why Choose FARMEEZ?</h2>
            <p className="text-lg text-slate-600 font-medium">We combine modern game mechanics with verified agricultural science to create an engaging learning experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sprout size={32} />}
              title="Learn by Doing"
              description="Manage your virtual farm. Make decisions about crops, soil, and water, and see the real-time ecological impact."
              colorClass="text-farm-green-dark bg-farm-green-light/60"
            />
            <FeatureCard 
              icon={<Droplets size={32} />}
              title="Resource Management"
              description="Master advanced techniques like drip irrigation and rainwater harvesting to maximize yield and conserve nature."
              colorClass="text-blue-600 bg-blue-100/80"
            />
            <FeatureCard 
              icon={<Trophy size={32} />}
              title="Gamified Progression"
              description="Earn badges, level up, and compete with friends on the global leaderboard as you become a master agronomist."
              colorClass="text-farm-brown bg-farm-brown-light/40"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white/50 border-y border-farm-green-light/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 relative">
               <div className="aspect-[4/3] bg-gradient-to-tr from-farm-sky-light to-farm-green-light rounded-3xl shadow-soft flex items-center justify-center p-8">
                  <div className="glass w-full h-full rounded-2xl flex flex-col items-center justify-center text-slate-500 font-bold border-2 border-white/50">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-farm-green">
                      <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    </div>
                    Gameplay Video / Animation
                  </div>
               </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">How It Works</h2>
              <div className="space-y-8 mt-8">
                {[
                  { step: "01", title: "Claim Your Plot", desc: "Start with a barren piece of land and basic tools." },
                  { step: "02", title: "Complete Modules", desc: "Learn real-world farming techniques through interactive lessons." },
                  { step: "03", title: "Apply Knowledge", desc: "Use what you learned to plant, water, and harvest your crops." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-farm-green text-white font-black text-xl flex items-center justify-center flex-shrink-0 shadow-soft">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-600 font-medium text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/login" className="inline-block mt-10">
                <Button size="lg" className="px-8">
                  Start Your Journey <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-farm-green-dark skew-y-3 transform origin-bottom-right -z-10 scale-110"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8">About FARMEEZ</h2>
          <p className="text-xl md:text-2xl font-medium leading-relaxed mb-12 text-farm-green-light">
            We built FARMEEZ for the Smart India Hackathon to solve a critical problem: the gap between modern agricultural science and accessible education. By blending gaming and learning, we aim to inspire the next generation of sustainable farmers.
          </p>
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20">
             <div className="flex -space-x-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-12 h-12 rounded-full bg-farm-brown border-2 border-farm-green-dark flex items-center justify-center font-bold text-sm">
                   T{i}
                 </div>
               ))}
             </div>
             <div className="text-left ml-2">
               <p className="font-bold">Built by</p>
               <p className="text-sm text-farm-green-light">The FARMEEZ Team</p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
