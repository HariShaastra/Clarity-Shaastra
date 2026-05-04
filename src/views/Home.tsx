import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Button, Card, Input } from '../components/UI';
import { Decision, View, UserConfig, IdentityCheck } from '../types';
import { Compass, BookOpen, TrendingUp, BarChart3, Flame, Edit2, X, Check, Info, Zap, Shield } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomeProps {
  onNavigate: (view: View) => void;
  latestDecision?: Decision;
  userConfig: UserConfig | null;
  identityChecks: IdentityCheck[];
  onIdentityCheck: (didAct: boolean) => void;
  onUpdateWhy: (why: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  onNavigate, 
  latestDecision, 
  userConfig, 
  identityChecks,
  onIdentityCheck,
  onUpdateWhy
}) => {
  const [isEditingWhy, setIsEditingWhy] = useState(false);
  const [editedWhy, setEditedWhy] = useState(userConfig?.why || '');

  const today = new Date().toISOString().split('T')[0];
  const todayCheck = identityChecks.find(c => c.date === today);
  
  const wins = identityChecks.filter(c => c.didAct).length;
  const losses = identityChecks.filter(c => !c.didAct).length;

  let streak = 0;
  const sortedChecks = [...identityChecks].sort((a, b) => b.date.localeCompare(a.date));
  for (let i = 0; i < sortedChecks.length; i++) {
    if (sortedChecks[i].didAct) streak++;
    else break;
  }

  const handleSaveWhy = () => {
    onUpdateWhy(editedWhy);
    setIsEditingWhy(false);
  };

  return (
    <Layout>
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-ink">Clarity Shaastra</h1>
              <p className="text-[10px] font-bold text-secondary-warm uppercase tracking-widest">Think clearly. Act decisively.</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary-warm bg-primary-warm/10 px-3 py-1 rounded-full">
            <Flame size={14} />
            <span className="text-xs font-bold">{streak}</span>
          </div>
        </div>

        <div className="mt-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Namaste, <span className="text-primary-warm">{userConfig?.userName || 'Seeker'}</span>
          </h2>
        </div>

        <Card className="bg-primary-warm/5 border-primary-warm/10 py-5">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={16} className="text-primary-warm" />
            <h3 className="text-xs font-bold text-ink uppercase tracking-widest">The System</h3>
          </div>
          <p className="text-sm font-medium text-secondary-warm leading-snug">
            Clarity Shaastra turns confusion into action. No overthinking. Just clear decisions and immediate steps.
          </p>
        </Card>

        {/* Big Editable WHY Button */}
        <Card className="relative overflow-hidden border-2 border-primary-warm/20 bg-gradient-to-br from-white to-primary-warm/5 p-8">
          <AnimatePresence mode="wait">
            {!isEditingWhy ? (
              <motion.div 
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary-warm uppercase tracking-[0.2em]">Your North Star</span>
                  <button 
                    onClick={() => setIsEditingWhy(true)}
                    className="p-2 hover:bg-primary-warm/10 rounded-full transition-colors text-primary-warm"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
                <p className="text-xl font-bold text-ink leading-relaxed italic">
                  "{userConfig?.why}"
                </p>
                <p className="text-xs text-secondary-warm font-medium">Internalize this. This is why you act.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary-warm uppercase tracking-[0.2em]">Editing Your Why</span>
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingWhy(false)} className="p-2 hover:bg-error-soft/10 rounded-full text-error-soft">
                      <X size={16} />
                    </button>
                    <button onClick={handleSaveWhy} className="p-2 hover:bg-accent-calm/10 rounded-full text-accent-calm">
                      <Check size={16} />
                    </button>
                  </div>
                </div>
                <textarea 
                  autoFocus
                  className="w-full bg-transparent border-b-2 border-primary-warm outline-none text-lg font-bold text-ink py-2 resize-none"
                  value={editedWhy}
                  onChange={(e) => setEditedWhy(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <Button 
            onClick={() => onNavigate('clarity-flow')}
            size="lg"
            className="h-28 flex flex-col gap-2 items-center justify-center text-xl"
          >
            <Compass size={28} />
            Need Clarity?
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onNavigate('decision-log')}
              className="bg-card-bg p-6 rounded-3xl shadow-soft border border-black/5 flex flex-col gap-3 items-start text-left hover:border-primary-warm/20 transition-all active:scale-95"
            >
              <div className="p-2 bg-ink/5 rounded-xl text-ink">
                <BookOpen size={20} />
              </div>
              <span className="font-bold">Log</span>
            </button>
            <button 
              onClick={() => onNavigate('weekly-review')}
              className="bg-card-bg p-6 rounded-3xl shadow-soft border border-black/5 flex flex-col gap-3 items-start text-left hover:border-primary-warm/20 transition-all active:scale-95"
            >
              <div className="p-2 bg-ink/5 rounded-xl text-ink">
                <BarChart3 size={20} />
              </div>
              <span className="font-bold">Review</span>
            </button>
          </div>
        </div>

        <Card className="bg-ink text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Identity Check</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/50">{wins}W - {losses}L</span>
            </div>
          </div>
          
          <p className="text-sm text-white/70 mb-4">Did you act with intention today?</p>
          
          {todayCheck ? (
            <div className={`py-2 px-4 rounded-xl text-center font-bold ${todayCheck.didAct ? 'bg-accent-calm/20 text-accent-calm' : 'bg-error-soft/20 text-error-soft'}`}>
              {todayCheck.didAct ? 'Yes, I acted with purpose.' : 'No, I fell short today.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onIdentityCheck(true)}
                className="py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold"
              >
                Yes
              </button>
              <button 
                onClick={() => onIdentityCheck(false)}
                className="py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-bold"
              >
                No
              </button>
            </div>
          )}
        </Card>

        {latestDecision && latestDecision.status === 'pending' && !latestDecision.reflection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-accent-calm/5 border-accent-calm/20">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-accent-calm uppercase tracking-wider">Pending Action</div>
                  <h3 className="font-bold line-clamp-1">{latestDecision.decision}</h3>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-accent-calm text-accent-calm hover:bg-accent-calm/5"
                  onClick={() => onNavigate('reflect')}
                >
                  Reflect
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="pb-8 pt-4 flex flex-col items-center gap-4">
          <button 
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-[10px] font-bold text-secondary-warm/40 uppercase tracking-[0.2em] hover:text-primary-warm transition-colors"
          >
            <Info size={12} />
            Full App Info
          </button>
          
          <div className="flex items-center gap-2 text-[8px] text-secondary-warm/30 uppercase tracking-[0.1em] text-center max-w-[200px]">
            <Shield size={10} />
            <span>Disclaimer: Local tool for decision support. No professional advice. Data is private.</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
