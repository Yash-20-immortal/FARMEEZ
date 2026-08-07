import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-farm-green-light/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-farm-green rounded-2xl flex items-center justify-center text-white shadow-soft transform transition-transform group-hover:rotate-6">
            <Leaf size={28} strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-black text-farm-green-dark tracking-tight">FARMEEZ</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">Play</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        {/* Action */}
        <div className="hidden md:block">
          <Link to="/login">
            <Button variant="primary">Play Now</Button>
          </Link>
        </div>

        {/* Mobile menu button (placeholder) */}
        <button className="md:hidden text-farm-green-dark p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="text-slate-600 font-bold hover:text-farm-green-dark transition-colors"
    >
      {children}
    </a>
  );
}
