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
        <Card className="bg-primary-warm/5 border-primary-warm/10">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary-warm text-white rounded-2xl">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink mb-2">What is Clarity Shaastra?</h3>
              <p className="text-secondary-warm leading-relaxed">
                Clarity Shaastra is a minimal, powerful thinking system designed to help you strip away overthinking and act with purpose. 
                It is built on the philosophy that progress is the result of clear decisions followed by immediate action.
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold flex items-center gap-2 text-ink">
            <Target size={18} className="text-primary-warm" />
            What It Does
          </h3>
          <ul className="space-y-3">
            {[
              "Converts confusion into concrete next steps.",
              "Enforces the 5-minute rule for immediate momentum.",
              "Logs decisions to build long-term judgment.",
              "Tracks your identity through daily follow-through."
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-secondary-warm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-warm mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-ink text-white/90">
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <Shield size={18} className="text-accent-calm" />
            Disclaimer
          </h3>
          <p className="text-xs leading-relaxed text-white/60">
            Clarity Shaastra is a tool for self-reflection and decision-making support. It is NOT a substitute for professional mental health advice, financial planning, or legal counsel. 
            <br /><br />
            The app stores all your data locally on your device. We do not transmit or store your personal reflections on any server. You are solely responsible for the decisions you make and the actions you take based on the outputs of this system.
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
