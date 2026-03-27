import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onBack, showBack }) => {
  return (
    <div className="min-h-screen max-w-md mx-auto px-6 py-8 flex flex-col">
      <header className="flex items-center justify-between mb-8 h-10">
        <div className="flex items-center gap-3">
          {showBack && (
            <button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-secondary-warm" />
            </button>
          )}
          <h1 className="text-xl font-semibold tracking-tight text-ink">
            {title || "Clarity Shaastra"}
          </h1>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary-warm text-white shadow-lg shadow-primary-warm/20 hover:bg-primary-hover",
    secondary: "bg-ink text-white hover:bg-ink/90",
    outline: "border-2 border-primary-warm text-primary-warm hover:bg-primary-warm/5",
    ghost: "text-secondary-warm hover:bg-black/5"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-card-bg rounded-3xl p-6 shadow-soft border border-black/5 ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input 
    {...props}
    className={`w-full bg-white border-2 border-black/5 rounded-2xl px-4 py-3 focus:border-primary-warm outline-none transition-all placeholder:text-secondary-warm/50 ${props.className || ''}`}
  />
);
