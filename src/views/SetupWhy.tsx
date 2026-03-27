import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout, Button, Input } from '../components/UI';
import { Logo } from '../components/Logo';

interface SetupWhyProps {
  onComplete: (name: string, why: string) => void;
}

export const SetupWhy: React.FC<SetupWhyProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [why, setWhy] = useState('');
  const [step, setStep] = useState(1);

  return (
    <Layout>
      <div className="flex-1 flex flex-col justify-center gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo className="w-20 h-20" />
          <h1 className="text-2xl font-bold text-ink">Welcome to Clarity Shaastra</h1>
        </div>

        {step === 1 ? (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">What should we call you?</h2>
              <p className="text-secondary-warm">A personal touch for your clarity journey.</p>
            </div>
            <Input 
              autoFocus
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button 
              disabled={!name} 
              onClick={() => setStep(2)} 
              size="lg"
              className="w-full"
            >
              Next
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">What is your WHY?</h2>
              <p className="text-secondary-warm">Set your compass. Why are you doing this?</p>
            </div>
            <textarea 
              autoFocus
              className="w-full h-32 bg-white border-2 border-black/5 rounded-2xl px-4 py-3 focus:border-primary-warm outline-none transition-all placeholder:text-secondary-warm/50 resize-none"
              placeholder="e.g. To clear CA Inter and build a secure future for my family."
              value={why}
              onChange={(e) => setWhy(e.target.value)}
            />
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
              <Button 
                disabled={!why} 
                onClick={() => onComplete(name, why)} 
                size="lg"
                className="flex-1"
              >
                Begin Journey
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};
