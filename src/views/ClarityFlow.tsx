import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout, Button, Input } from '../components/UI';
import { Decision } from '../types';
import { Timer } from '../components/Timer';
import { CheckCircle2, ChevronRight, Home } from 'lucide-react';

interface ClarityFlowProps {
  onComplete: (decision: Decision) => void;
  onCancel: () => void;
}

const QUICK_BLOCKS = [
  "Feeling overwhelmed",
  "Lack of information",
  "Fear of failure",
  "Distracted"
];

const TIMER_OPTIONS = [
  { label: '5 min', value: 300 },
  { label: '25 min', value: 1500 },
  { label: 'Custom', value: 0 }
];

export const ClarityFlow: React.FC<ClarityFlowProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Decision>>({
    status: 'pending',
    createdAt: Date.now(),
  });
  const [timerDuration, setTimerDuration] = useState(300);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [customTime, setCustomTime] = useState('');

  const nextStep = () => setStep(step + 1);

  const handleFinish = () => {
    if (formData.goal && formData.block && formData.truthType && formData.nextStep && formData.decision) {
      onComplete({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: Date.now(),
      } as Decision);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-ink">The Goal</h2>
              <p className="text-sm text-secondary-warm">What do you want to achieve right now?</p>
            </div>
            <Input 
              autoFocus
              maxLength={120}
              placeholder="e.g. Complete the monthly report"
              value={formData.goal || ''}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            />
            <Button 
              disabled={!formData.goal} 
              onClick={nextStep} 
              className="w-full"
            >
              Next
            </Button>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-ink">The Obstacle</h2>
              <p className="text-sm text-secondary-warm">What is stopping you?</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {QUICK_BLOCKS.map(block => (
                <button
                  key={block}
                  onClick={() => {
                    setFormData({ ...formData, block });
                    nextStep();
                  }}
                  className="w-full text-left px-4 py-3 rounded-2xl border-2 border-black/5 hover:border-primary-warm transition-all flex items-center justify-between group"
                >
                  <span className="font-medium">{block}</span>
                  <ChevronRight size={18} className="text-secondary-warm/30 group-hover:text-primary-warm" />
                </button>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs font-bold text-secondary-warm uppercase tracking-wider mb-2">Or custom input</p>
              <Input 
                placeholder="Type your own block..."
                value={formData.block || ''}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
              />
            </div>
            <Button 
              disabled={!formData.block} 
              onClick={nextStep} 
              className="w-full"
            >
              Next
            </Button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-ink">Truth Check</h2>
              <p className="text-sm text-secondary-warm">Is this obstacle real or just an excuse?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setFormData({ ...formData, truthType: 'real' });
                  nextStep();
                }}
                className={`p-6 rounded-3xl border-2 transition-all text-center ${
                  formData.truthType === 'real' 
                    ? 'border-primary-warm bg-primary-warm/5' 
                    : 'border-black/5 hover:border-black/10'
                }`}
              >
                <div className="text-lg font-bold">Real Problem</div>
                <div className="text-xs text-secondary-warm mt-1">Legitimate obstacle</div>
              </button>
              <button
                onClick={() => {
                  setFormData({ ...formData, truthType: 'excuse' });
                  nextStep();
                }}
                className={`p-6 rounded-3xl border-2 transition-all text-center ${
                  formData.truthType === 'excuse' 
                    ? 'border-primary-warm bg-primary-warm/5' 
                    : 'border-black/5 hover:border-black/10'
                }`}
              >
                <div className="text-lg font-bold">Excuse</div>
                <div className="text-xs text-secondary-warm mt-1">I'm just avoiding it</div>
              </button>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-ink">First Action</h2>
              <p className="text-sm text-secondary-warm">What is the smallest first step?</p>
            </div>
            <Input 
              autoFocus
              placeholder="e.g. Open the document / write first line"
              value={formData.nextStep || ''}
              onChange={(e) => setFormData({ ...formData, nextStep: e.target.value, decision: e.target.value })}
            />
            <p className="text-xs text-primary-warm font-bold italic">"Make it smaller?"</p>
            <Button 
              disabled={!formData.nextStep} 
              onClick={nextStep} 
              className="w-full"
            >
              Next
            </Button>
          </motion.div>
        );
      case 5:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-ink">Commitment</h2>
              <p className="text-sm text-secondary-warm">What exactly are you going to do now?</p>
            </div>
            <Input 
              autoFocus
              placeholder="e.g. Work on the report for 25 minutes"
              value={formData.decision || ''}
              onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
            />
            <div className="space-y-4 pt-4">
              <p className="text-sm font-bold text-secondary-warm uppercase tracking-wider">Set Timer</p>
              <div className="grid grid-cols-3 gap-2">
                {TIMER_OPTIONS.map(opt => (
                  <button
                    key={opt.label}
                    onClick={() => setTimerDuration(opt.value)}
                    className={`py-3 rounded-xl border-2 transition-all font-bold ${
                      (opt.value === timerDuration && opt.value !== 0) || (opt.value === 0 && timerDuration === parseInt(customTime) * 60)
                        ? 'border-primary-warm bg-primary-warm/5 text-primary-warm'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {timerDuration === 0 || (timerDuration !== 300 && timerDuration !== 1500) ? (
                <div className="flex items-center gap-2">
                  <Input 
                    type="number"
                    placeholder="Minutes"
                    value={customTime}
                    onChange={(e) => {
                      setCustomTime(e.target.value);
                      setTimerDuration(parseInt(e.target.value) * 60 || 0);
                    }}
                  />
                  <span className="font-bold text-secondary-warm">min</span>
                </div>
              ) : null}
            </div>
            <Button 
              disabled={!formData.decision || timerDuration <= 0} 
              onClick={nextStep} 
              className="w-full"
            >
              Confirm & Start
            </Button>
          </motion.div>
        );
      case 6:
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col justify-center"
          >
            {!isTimerComplete ? (
              <Timer 
                initialTime={timerDuration} 
                isFocusMode={true}
                onComplete={() => setIsTimerComplete(true)} 
              />
            ) : (
              <div className="flex flex-col items-center gap-6 text-center py-12">
                <div className="w-20 h-20 bg-accent-calm/10 text-accent-calm rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Great Start!</h2>
                  <p className="text-secondary-warm">You took action. That's the hardest part.</p>
                </div>
                <Button onClick={handleFinish} className="w-full mt-8">
                  Complete Session
                </Button>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      title={step === 6 ? "Focus Mode" : `Step ${step} of 5`} 
      showBack={step !== 6}
      onBack={step > 1 ? () => setStep(step - 1) : onCancel}
    >
      <div className="absolute top-8 right-6">
        <button 
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-black/5 transition-colors text-secondary-warm/50"
          aria-label="Exit to Home"
        >
          <Home size={20} />
        </button>
      </div>
      <div className="flex-1 flex flex-col pt-4">
        {renderStep()}
      </div>
    </Layout>
  );
};
