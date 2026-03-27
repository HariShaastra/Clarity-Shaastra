/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { View, Decision } from './types';
import { useDecisions } from './hooks/useDecisions';
import { Home } from './views/Home';
import { ClarityFlow } from './views/ClarityFlow';
import { DecisionLog } from './views/DecisionLog';
import { ReflectionView } from './views/ReflectionView';
import { Insights } from './views/Insights';
import { WeeklyReview } from './views/WeeklyReview';
import { SetupWhy } from './views/SetupWhy';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { 
    decisions, 
    userConfig, 
    identityChecks, 
    addDecision, 
    updateDecision, 
    setUserProfile,
    updateWhy,
    addIdentityCheck 
  } = useDecisions();
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);

  useEffect(() => {
    if (!userConfig && currentView !== 'setup-why') {
      setCurrentView('setup-why');
    }
  }, [userConfig, currentView]);

  const latestDecision = decisions[0];
  const pendingReflection = decisions.find(d => d.status === 'pending' && !d.reflection);

  const handleClarityComplete = (decision: Decision) => {
    addDecision(decision);
    setCurrentView('home');
  };

  const handleReflectionComplete = (reflection: any) => {
    const idToReflect = selectedDecisionId || pendingReflection?.id;
    if (idToReflect) {
      updateDecision(idToReflect, { 
        reflection, 
        status: reflection.didFollow ? 'done' : 'skipped' 
      });
    }
    setSelectedDecisionId(null);
    setCurrentView('home');
  };

  const navigateToReflect = (decision: Decision) => {
    setSelectedDecisionId(decision.id);
    setCurrentView('reflect');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home 
            onNavigate={setCurrentView} 
            latestDecision={latestDecision} 
            userConfig={userConfig}
            identityChecks={identityChecks}
            onIdentityCheck={addIdentityCheck}
            onUpdateWhy={updateWhy}
          />
        );
      case 'setup-why':
        return (
          <SetupWhy onComplete={(name, why) => {
            setUserProfile(name, why);
            setCurrentView('home');
          }} />
        );
      case 'clarity-flow':
        return (
          <ClarityFlow 
            onComplete={handleClarityComplete} 
            onCancel={() => setCurrentView('home')} 
          />
        );
      case 'decision-log':
        return (
          <DecisionLog 
            decisions={decisions} 
            onBack={() => setCurrentView('home')}
            onSelect={navigateToReflect}
          />
        );
      case 'reflect':
        const decisionToReflect = selectedDecisionId 
          ? decisions.find(d => d.id === selectedDecisionId) 
          : pendingReflection;
          
        if (!decisionToReflect) {
          setCurrentView('home');
          return null;
        }
        return (
          <ReflectionView 
            decision={decisionToReflect} 
            onComplete={handleReflectionComplete}
            onBack={() => {
              setSelectedDecisionId(null);
              setCurrentView('home');
            }}
          />
        );
      case 'insights':
        return (
          <Insights 
            decisions={decisions} 
            onBack={() => setCurrentView('home')} 
          />
        );
      case 'weekly-review':
        return (
          <WeeklyReview 
            decisions={decisions} 
            identityChecks={identityChecks}
            onBack={() => setCurrentView('home')} 
          />
        );
      default:
        return <Home 
          onNavigate={setCurrentView} 
          userConfig={userConfig} 
          identityChecks={identityChecks}
          onIdentityCheck={addIdentityCheck}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-warm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
