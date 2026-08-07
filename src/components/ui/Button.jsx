import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1";
  
  const variants = {
    primary: "bg-farm-green text-white shadow-soft hover:shadow-float hover:bg-farm-green-dark",
    secondary: "bg-farm-brown text-white shadow-soft hover:shadow-float hover:bg-farm-brown-light",
    outline: "border-2 border-farm-green-dark text-farm-green-dark hover:bg-farm-green-light/20",
    ghost: "text-slate-600 hover:text-farm-green-dark hover:bg-farm-green-light/30",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
