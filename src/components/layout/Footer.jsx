import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-farm-green-dark text-white pt-16 pb-8 border-t border-farm-green">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-black mb-4 flex items-center gap-2">
              FARMEEZ 🌾
            </h3>
            <p className="text-farm-green-light max-w-md text-lg leading-relaxed font-medium">
              A gamified learning platform dedicated to teaching sustainable farming practices to everyone, everywhere.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><FooterLink href="#about">About Us</FooterLink></li>
              <li><FooterLink href="#features">Features</FooterLink></li>
              <li><FooterLink href="#how-it-works">How It Works</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-4">Connect</h4>
            <ul className="space-y-3">
              <li><FooterLink href="#contact">Contact Support</FooterLink></li>
              <li><FooterLink href="#">Twitter</FooterLink></li>
              <li><FooterLink href="#">Instagram</FooterLink></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 text-center text-farm-green-light font-medium">
          <p>&copy; {new Date().getFullYear()} FARMEEZ. Built for Smart India Hackathon.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <a href={href} className="text-farm-green-light hover:text-white transition-colors font-medium">
      {children}
    </a>
  );
}
