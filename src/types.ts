export type TruthType = 'real' | 'excuse';
export type DecisionStatus = 'pending' | 'done' | 'skipped';

export interface Reflection {
  didFollow: boolean;
  outcome: string;
  learning: string;
}

export interface Decision {
  id: string;
  createdAt: number;
  goal: string;
  block: string;
  truthType: TruthType;
  nextStep: string;
  decision: string;
  status: DecisionStatus;
  reflection?: Reflection;
}

export interface UserConfig {
  userName: string;
  why: string;
  createdAt: number;
}

export interface IdentityCheck {
  date: string; // YYYY-MM-DD
  didAct: boolean;
}

export type View = 'home' | 'clarity-flow' | 'decision-log' | 'reflect' | 'insights' | 'weekly-review' | 'setup-why' | 'about';
