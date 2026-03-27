import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Layout, Card, Button, Input } from '../components/UI';
import { Decision, Reflection } from '../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ReflectionViewProps {
  decision: Decision;
  onComplete: (reflection: Reflection) => void;
  onBack: () => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({ decision, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [reflection, setReflection] = useState<Partial<Reflection>>({});

  const nextStep = () => setStep(step + 1);

  const handleFinish = () => {
    if (reflection.didFollow !== undefined && reflection.outcome && reflection.learning) {
      onComplete(reflection as Reflection);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-primary-warm/10 text-primary-warm rounded-full text-xs font-bold uppercase tracking-wider">
                Reflecting on
              </div>
              <h2 className="text-2xl font-bold leading-tight">{decision.decision}</h2>
            </div>

            <div className="space-y-4">
              <p className="text-lg font-medium">Did you follow through?</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setReflection({ ...reflection, didFollow: true });
                    nextStep();
                  }}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                    reflection.didFollow === true 
                      ? 'border-accent-calm bg-accent-calm/5' 
                      : 'border-black/5 hover:border-black/10'
                  }`}
                >
                  <CheckCircle2 size={32} className="text-accent-calm" />
                  <span className="font-bold">Yes</span>
                </button>
                <button
                  onClick={() => {
                    setReflection({ ...reflection, didFollow: false });
                    nextStep();
                  }}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${
                    reflection.didFollow === false 
                      ? 'border-error-soft bg-error-soft/5' 
                      : 'border-black/5 hover:border-black/10'
                  }`}
                >
                  <XCircle size={32} className="text-error-soft" />
                  <span className="font-bold">No</span>
                </button>
              </div>
            </div>
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
              <h2 className="text-2xl font-bold">What happened?</h2>
              <p className="text-secondary-warm">Describe the outcome briefly.</p>
            </div>
            <textarea 
              autoFocus
              className="w-full h-32 bg-white border-2 border-black/5 rounded-2xl px-4 py-3 focus:border-primary-warm outline-none transition-all placeholder:text-secondary-warm/50 resize-none"
              placeholder="e.g. I finished the first 3 pages and understood the core concept."
              value={reflection.outcome || ''}
              onChange={(e) => setReflection({ ...reflection, outcome: e.target.value })}
            />
            <Button 
              disabled={!reflection.outcome} 
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
              <h2 className="text-2xl font-bold">What did you learn?</h2>
              <p className="text-secondary-warm">What's the takeaway for next time?</p>
            </div>
            <textarea 
              autoFocus
              className="w-full h-32 bg-white border-2 border-black/5 rounded-2xl px-4 py-3 focus:border-primary-warm outline-none transition-all placeholder:text-secondary-warm/50 resize-none"
              placeholder="e.g. Starting is the hardest part. Once I open the book, it flows."
              value={reflection.learning || ''}
              onChange={(e) => setReflection({ ...reflection, learning: e.target.value })}
            />
            <Button 
              disabled={!reflection.learning} 
              onClick={handleFinish} 
              className="w-full"
            >
              Save Reflection
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout title="Reflect" showBack onBack={onBack}>
      <div className="flex-1 flex flex-col pt-4">
        {renderStep()}
      </div>
    </Layout>
  );
};
