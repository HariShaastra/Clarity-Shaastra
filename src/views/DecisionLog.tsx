import React from 'react';
import { motion } from 'motion/react';
import { Layout, Card, Button } from '../components/UI';
import { Decision } from '../types';
import { Calendar, CheckCircle2, Circle, XCircle, ChevronRight } from 'lucide-react';

interface DecisionLogProps {
  decisions: Decision[];
  onBack: () => void;
  onSelect: (decision: Decision) => void;
}

export const DecisionLog: React.FC<DecisionLogProps> = ({ decisions, onBack, onSelect }) => {
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle2 size={18} className="text-accent-calm" />;
      case 'skipped': return <XCircle size={18} className="text-error-soft" />;
      default: return <Circle size={18} className="text-secondary-warm" />;
    }
  };

  return (
    <Layout title="Decision Log" showBack onBack={onBack}>
      <div className="space-y-4 pb-12">
        {decisions.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto text-secondary-warm">
              <Calendar size={32} />
            </div>
            <p className="text-secondary-warm">No decisions yet. Start your first clarity flow!</p>
          </div>
        ) : (
          decisions.map((decision, index) => (
            <motion.div
              key={decision.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button 
                onClick={() => onSelect(decision)}
                className="w-full text-left"
              >
                <Card className="hover:border-primary-warm/30 transition-all active:scale-[0.98]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 text-xs text-secondary-warm uppercase tracking-wider font-semibold">
                        {getStatusIcon(decision.status)}
                        <span>{formatDate(decision.createdAt)}</span>
                      </div>
                      <h3 className="text-lg font-bold leading-tight">{decision.decision}</h3>
                      <p className="text-sm text-secondary-warm line-clamp-1">Goal: {decision.goal}</p>
                    </div>
                    <ChevronRight size={20} className="text-secondary-warm/30 mt-6" />
                  </div>
                </Card>
              </button>
            </motion.div>
          ))
        )}
      </div>
    </Layout>
  );
};
