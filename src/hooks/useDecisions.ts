import { useState, useEffect } from 'react';
import { Decision, UserConfig, IdentityCheck } from '../types';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';

const STORAGE_KEY = 'clarity_shaastra_data';

export function useDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);
  const [identityChecks, setIdentityChecks] = useState<IdentityCheck[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Connection Test
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) {
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
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Listen for User Config
    const configUnsub = onSnapshot(doc(db, 'users', user.uid), (snap) => {
      if (snap.exists()) {
        setUserConfig(snap.data() as UserConfig);
      }
    });

    // Listen for Decisions
    const decisionsQuery = query(collection(db, 'users', user.uid, 'decisions'), orderBy('createdAt', 'desc'));
    const decisionsUnsub = onSnapshot(decisionsQuery, (snap) => {
      const docs = snap.docs.map(d => d.data() as Decision);
      setDecisions(docs);
    });

    // Listen for Identity Checks
    const identityUnsub = onSnapshot(collection(db, 'users', user.uid, 'identityChecks'), (snap) => {
      const docs = snap.docs.map(d => d.data() as IdentityCheck);
      setIdentityChecks(docs);
    });

    setLoading(false);

    return () => {
      configUnsub();
      decisionsUnsub();
      identityUnsub();
    };
  }, [user]);

  const addDecision = async (decision: Decision) => {
    if (user) {
      await setDoc(doc(db, 'users', user.uid, 'decisions', decision.id), decision);
    } else {
      const newDecisions = [decision, ...decisions];
      setDecisions(newDecisions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions: newDecisions, userConfig, identityChecks }));
    }
  };

  const updateDecision = async (id: string, updates: Partial<Decision>) => {
    if (user) {
      const decisionRef = doc(db, 'users', user.uid, 'decisions', id);
      const snap = await getDoc(decisionRef);
      if (snap.exists()) {
        await setDoc(decisionRef, { ...snap.data(), ...updates });
      }
    } else {
      const newDecisions = decisions.map((d) => (d.id === id ? { ...d, ...updates } : d));
      setDecisions(newDecisions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions: newDecisions, userConfig, identityChecks }));
    }
  };

  const deleteDecision = async (id: string) => {
    if (user) {
      await deleteDoc(doc(db, 'users', user.uid, 'decisions', id));
    } else {
      const newDecisions = decisions.filter((d) => d.id !== id);
      setDecisions(newDecisions);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions: newDecisions, userConfig, identityChecks }));
    }
  };

  const setUserProfile = async (name: string, why: string) => {
    const newConfig = { userName: name, why, createdAt: Date.now() };
    if (user) {
      await setDoc(doc(db, 'users', user.uid), newConfig);
    } else {
      setUserConfig(newConfig);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions, userConfig: newConfig, identityChecks }));
    }
  };

  const updateWhy = async (why: string) => {
    if (userConfig) {
      const newConfig = { ...userConfig, why };
      if (user) {
        await setDoc(doc(db, 'users', user.uid), newConfig);
      } else {
        setUserConfig(newConfig);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions, userConfig: newConfig, identityChecks }));
      }
    }
  };

  const addIdentityCheck = async (didAct: boolean) => {
    const date = new Date().toISOString().split('T')[0];
    const check = { date, didAct };
    if (user) {
      await setDoc(doc(db, 'users', user.uid, 'identityChecks', date), check);
    } else {
      const newChecks = identityChecks.filter(c => c.date !== date);
      newChecks.push(check);
      setIdentityChecks(newChecks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ decisions, userConfig, identityChecks: newChecks }));
    }
  };

  return {
    decisions,
    userConfig,
    identityChecks,
    user,
    loading,
    addDecision,
    updateDecision,
    deleteDecision,
    setUserProfile,
    updateWhy,
    addIdentityCheck,
  };
}
