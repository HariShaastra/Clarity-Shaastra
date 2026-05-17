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
import { About } from './views/About';
import { Login } from './views/Login';
import { AnimatePresence, motion } from 'motion/react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const { 
    decisions, 
    userConfig, 
    identityChecks, 
    user,
    loading,
    addDecision, 
    updateDecision, 
    setUserProfile,
    updateWhy,
    addIdentityCheck 
  } = useDecisions();
  const [selectedDecisionId, setSelectedDecisionId] = useState<string | null>(null);
  const [hasSkippedLogin, setHasSkippedLogin] = useState(() => localStorage.getItem('skip_login') === 'true');

  useEffect(() => {
    if (loading) return;
    
    if (!user && !userConfig && !hasSkippedLogin && currentView !== 'login') {
      setCurrentView('login');
    } else if (user && currentView === 'login') {
      setCurrentView('home');
    } else if ((user || hasSkippedLogin) && !userConfig && currentView !== 'setup-why' && currentView !== 'login') {
      setCurrentView('setup-why');
    }
  }, [user, userConfig, currentView, loading, hasSkippedLogin]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      // If logging out, we can choose to clear skip_login to re-prompt
      if (!u && user) {
        localStorage.removeItem('skip_login');
        setHasSkippedLogin(false);
      }
    });
    return () => unsubscribeAuth();
  }, [user]);

  const handleSkipLogin = () => {
    setHasSkippedLogin(true);
    localStorage.setItem('skip_login', 'true');
    setCurrentView('home');
  };

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
            isLoggedIn={!!user}
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
      case 'about':
        return (
          <About 
            onBack={() => setCurrentView('home')} 
          />
        );
      case 'login':
        return (
          <Login 
            onLoginSuccess={() => setCurrentView('home')} 
            onSkip={handleSkipLogin}
          />
        );
      default:
        return <Home 
          onNavigate={setCurrentView} 
          userConfig={userConfig} 
          identityChecks={identityChecks}
          onIdentityCheck={addIdentityCheck}
          onUpdateWhy={updateWhy}
          isLoggedIn={!!user}
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
