import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { Button } from './UI';

interface TimerProps {
  onComplete: () => void;
  initialTime?: number;
  isFocusMode?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ onComplete, initialTime = 300, isFocusMode = false }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(initialTime);
    setIsActive(false);
  }, [initialTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (initialTime - timeLeft) / initialTime;

  return (
    <div className={`flex flex-col items-center gap-8 ${isFocusMode ? 'py-20' : 'py-12'}`}>
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-black/5"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray="754"
            initial={{ strokeDashoffset: 754 }}
            animate={{ strokeDashoffset: 754 * (1 - progress) }}
            className="text-primary-warm"
            strokeLinecap="round"
          />
        </svg>
        
        <div className="text-6xl font-bold tracking-tighter text-ink tabular-nums">
          {formatTime(timeLeft)}
        </div>
      </div>

      {!isFocusMode && (
        <div className="flex gap-4">
          <Button 
            onClick={toggleTimer}
            variant={isActive ? 'secondary' : 'primary'}
            size="lg"
            className="w-48"
          >
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <button 
            onClick={resetTimer}
            className="p-4 rounded-full bg-black/5 text-secondary-warm hover:bg-black/10 transition-colors"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      )}

      {isFocusMode && (
        <Button 
          onClick={toggleTimer}
          variant={isActive ? 'secondary' : 'primary'}
          size="lg"
          className="w-64"
        >
          {isActive ? 'Pause' : 'Start Action'}
        </Button>
      )}

      <p className="text-secondary-warm text-sm text-center max-w-[200px]">
        {isActive ? 'Stay focused. Just you and the task.' : 'Ready when you are.'}
      </p>
    </div>
  );
};
