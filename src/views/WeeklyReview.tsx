import React from 'react';
import { motion } from 'motion/react';
import { Layout, Card } from '../components/UI';
import { Decision, IdentityCheck } from '../types';
import { BarChart3, Target, ShieldAlert, Award, TrendingUp } from 'lucide-react';

interface WeeklyReviewProps {
  decisions: Decision[];
  identityChecks: IdentityCheck[];
  onBack: () => void;
}

export const WeeklyReview: React.FC<WeeklyReviewProps> = ({ decisions, identityChecks, onBack }) => {
  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  
  const weekDecisions = decisions.filter(d => d.createdAt >= oneWeekAgo);
  const total = weekDecisions.length;
  const excuses = weekDecisions.filter(d => d.truthType === 'excuse').length;
  const wins = weekDecisions.filter(d => d.reflection?.didFollow === true).length;
  const losses = weekDecisions.filter(d => d.reflection?.didFollow === false).length;
  
  const followRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  
  const identityWins = identityChecks.filter(c => c.didAct).length;
  const identityLosses = identityChecks.filter(c => !c.didAct).length;

  const commonBlocks = weekDecisions.reduce((acc, d) => {
    acc[d.block] = (acc[d.block] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topBlock = Object.entries(commonBlocks).sort((a: [string, number], b: [string, number]) => b[1] - a[1])[0];

  return (
    <Layout title="Weekly Review" showBack onBack={onBack}>
      <div className="space-y-6 pb-12">
        <Card className="bg-ink text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Performance</h3>
            <BarChart3 size={20} className="text-primary-warm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-white/50 uppercase font-bold">Follow-through</div>
              <div className="text-3xl font-bold">{followRate}%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-white/50 uppercase font-bold">Decisions</div>
              <div className="text-3xl font-bold">{total}</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col items-center gap-2 text-center">
            <ShieldAlert className="text-primary-warm" />
            <div className="text-2xl font-bold">{excuses}</div>
            <div className="text-xs text-secondary-warm font-bold uppercase">Excuses</div>
          </Card>
          <Card className="flex flex-col items-center gap-2 text-center">
            <Award className="text-accent-calm" />
            <div className="text-2xl font-bold">{wins}</div>
            <div className="text-xs text-secondary-warm font-bold uppercase">Wins</div>
          </Card>
        </div>

        <Card>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Target size={18} className="text-primary-warm" />
            Common Obstacle
          </h3>
          {topBlock ? (
            <div className="flex items-center justify-between">
              <span className="font-medium">{topBlock[0]}</span>
              <span className="text-primary-warm font-bold">{topBlock[1]} times</span>
            </div>
          ) : (
            <p className="text-secondary-warm text-sm">No data yet.</p>
          )}
        </Card>

        <Card>
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-accent-calm" />
            Identity Score
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <span className="text-accent-calm font-bold">Wins: {identityWins}</span>
              <span className="text-secondary-warm/30">|</span>
              <span className="text-error-soft font-bold">Losses: {identityLosses}</span>
            </div>
            <div className="text-xs font-bold text-secondary-warm uppercase">
              {identityWins > identityLosses ? "Serious Student" : "Needs Focus"}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
