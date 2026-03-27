import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer stylized 'C' for Clarity */}
        <path 
          d="M80 20C70 10 55 5 40 5C15 5 5 25 5 50C5 75 15 95 40 95C55 95 70 90 80 80" 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinecap="round"
          className="text-primary-warm"
        />
        {/* Inner stylized 'S' for Shaastra */}
        <path 
          d="M40 35C55 35 65 40 65 50C65 60 40 60 40 70C40 80 55 85 65 85" 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinecap="round"
          className="text-ink"
        />
        {/* The 'Spark' of Clarity */}
        <circle cx="85" cy="50" r="6" className="fill-accent-calm animate-pulse" />
        <path d="M85 35V42M85 58V65M70 50H77M93 50H100" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-calm opacity-50" />
      </svg>
    </div>
  );
};
