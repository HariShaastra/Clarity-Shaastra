import { useState, useEffect } from 'react';
import { Decision, UserConfig, IdentityCheck } from '../types';

const STORAGE_KEY = 'clarity_shaastra_data';

export function useDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);
  const [identityChecks, setIdentityChecks] = useState<IdentityCheck[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setDecisions(data.decisions || []);
        setUserConfig(data.userConfig || null);
        setIdentityChecks(data.identityChecks || []);
      } catch (e) {
        console.error('Failed to parse data', e);
      }
    }
  }, []);

  const saveData = (newData: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const addDecision = (decision: Decision) => {
    const newDecisions = [decision, ...decisions];
    setDecisions(newDecisions);
    saveData({ decisions: newDecisions, userConfig, identityChecks });
  };

  const updateDecision = (id: string, updates: Partial<Decision>) => {
    const newDecisions = decisions.map((d) => (d.id === id ? { ...d, ...updates } : d));
    setDecisions(newDecisions);
    saveData({ decisions: newDecisions, userConfig, identityChecks });
  };

  const deleteDecision = (id: string) => {
    const newDecisions = decisions.filter((d) => d.id !== id);
    setDecisions(newDecisions);
    saveData({ decisions: newDecisions, userConfig, identityChecks });
  };

  const setUserProfile = (name: string, why: string) => {
    const newConfig = { userName: name, why, createdAt: Date.now() };
    setUserConfig(newConfig);
    saveData({ decisions, userConfig: newConfig, identityChecks });
  };

  const updateWhy = (why: string) => {
    if (userConfig) {
      const newConfig = { ...userConfig, why };
      setUserConfig(newConfig);
      saveData({ decisions, userConfig: newConfig, identityChecks });
    }
  };

  const addIdentityCheck = (didAct: boolean) => {
    const date = new Date().toISOString().split('T')[0];
    const newChecks = identityChecks.filter(c => c.date !== date);
    newChecks.push({ date, didAct });
    setIdentityChecks(newChecks);
    saveData({ decisions, userConfig, identityChecks: newChecks });
  };

  return {
    decisions,
    userConfig,
    identityChecks,
    addDecision,
    updateDecision,
    deleteDecision,
    setUserProfile,
    updateWhy,
    addIdentityCheck,
  };
}
