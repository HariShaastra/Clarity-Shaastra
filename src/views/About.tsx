import React from 'react';
import { motion } from 'motion/react';
import { Layout, Card } from '../components/UI';
import { Info, Shield, Target, Zap, ChevronLeft } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <Layout title="About Clarity Shaastra" showBack onBack={onBack}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-20"
      >
        <Card className="bg-primary-warm/5 border-primary-warm/10 py-6">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary-warm text-white rounded-2xl shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink mb-2">What is Clarity Shaastra?</h3>
              <p className="text-secondary-warm leading-relaxed">
                A direct system to stop overthinking. We believe progress comes from clear decisions followed by immediate action.
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-ink">
            <Target size={18} className="text-primary-warm" />
            Core Functions
          </h3>
          <ul className="space-y-3">
            {[
              "Converts confusion into simple next steps.",
              "Enforces the 5-minute rule for action.",
              "Logs every decision to build judgment.",
              "Tracks your daily follow-through."
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-secondary-warm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-warm mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-ink text-white/90 py-5">
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <Shield size={18} className="text-accent-calm" />
            Disclaimer & Privacy
          </h3>
          <p className="text-xs leading-relaxed text-white/60">
            This is a tool for self-reflection. Not a substitute for professional advice.
            <br /><br />
            Data is 100% private. All your reflections are stored ONLY on your device. We never see your data.
          </p>
        </Card>

        <Card className="border-dashed border-2 border-secondary-warm/20 bg-transparent py-4 text-center">
          <p className="text-[10px] font-bold text-secondary-warm uppercase tracking-widest">
            Privacy First • Local Data • No AI • Fast Operations
          </p>
        </Card>

        <button 
          onClick={onBack}
          className="w-full py-4 text-secondary-warm font-bold flex items-center justify-center gap-2 hover:bg-black/5 rounded-2xl transition-all"
        >
          <ChevronLeft size={18} />
          Back to Home
        </button>
      </motion.div>
    </Layout>
  );
};
