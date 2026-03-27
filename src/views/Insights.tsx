import React from 'react';
import { motion } from 'motion/react';
import { Layout, Card } from '../components/UI';
import { Decision } from '../types';
import { Brain, Target, ShieldAlert, TrendingUp } from 'lucide-react';

interface InsightsProps {
  decisions: Decision[];
  onBack: () => void;
}

export const Insights: React.FC<InsightsProps> = ({ decisions, onBack }) => {
  const total = decisions.length;
  const excuses = decisions.filter(d => d.truthType === 'excuse').length;
  const followedThrough = decisions.filter(d => d.reflection?.didFollow === true).length;
  const reflectedCount = decisions.filter(d => !!d.reflection).length;
  
  const followRate = reflectedCount > 0 ? Math.round((followedThrough / reflectedCount) * 100) : 0;
  
  const insights = [
    {
      title: "Self-Honesty",
      value: `${excuses} Excuses`,
      desc: "Number of times you identified an excuse this week.",
      icon: <ShieldAlert className="text-primary-warm" />,
      bg: "bg-primary-warm/5"
    },
    {
      title: "Follow-through",
      value: `${followRate}%`,
      desc: "Percentage of decisions you actually acted upon.",
      icon: <Target className="text-accent-calm" />,
      bg: "bg-accent-calm/5"
    },
    {
      title: "Growth",
      value: `${reflectedCount} Lessons`,
      desc: "Total insights gained from your reflections.",
      icon: <TrendingUp className="text-ink" />,
      bg: "bg-ink/5"
    }
  ];

  return (
    <Layout title="Insights" showBack onBack={onBack}>
      <div className="space-y-6 pb-12">
        <div className="grid grid-cols-1 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${insight.bg}`}>
                  {insight.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-secondary-warm uppercase tracking-wider">{insight.title}</h3>
                  <div className="text-2xl font-bold">{insight.value}</div>
                  <p className="text-sm text-secondary-warm">{insight.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {total > 5 && excuses > total * 0.5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-ink text-white">
              <div className="flex items-center gap-3 mb-2">
                <Brain size={20} className="text-primary-warm" />
                <h3 className="font-bold">Pattern Detected</h3>
              </div>
              <p className="text-sm text-white/70">
                You've been marking obstacles as "Excuses" quite frequently. 
                Try breaking your next step into even smaller pieces.
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};
