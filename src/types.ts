export type AppView = 'simulator' | 'cards' | 'metrics';

export interface SlideData {
  id: number;
  part: string;
  partNumber: number;
  title: string;
  subtitle: string;
  heroMetric?: {
    value: string;
    label: string;
    subtext?: string;
    isProblem?: boolean;
  };
  imageUrl?: string;
  imageCaption?: string;
  imageTone?: 'cool' | 'warm';
  stats?: { label: string; value: string; highlight?: boolean; detail?: string }[];
  bulletPoints: { title?: string; text: string }[];
  callout?: { title: string; text: string; type?: 'warning' | 'solution' | 'insight' };
  tableData?: { col1: string; col2: string }[];
  speakerNotes: string;
}

export interface SecretDreamCard {
  id: string;
  title: string;
  category: string;
  text: string;
  resourceCost: string;
}

export interface CompensationCard {
  id: string;
  title: string;
  effect: string;
  rule: string;
}

export type PitchSlide = SlideData;

export interface WorkshopRole {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CrisisCard {
  id: string;
  title: string;
  category: 'work' | 'health' | 'money' | 'relations';
  text: string;
  challenge: string;
  discussionPrompts: string[];
}

export interface ShameQuestion {
  id: string;
  question: string;
  category: 'money' | 'intimacy' | 'burnout' | 'boundaries';
  directorAnswer: string;
  artistAnswer: string;
  takeaway: string;
}

export interface Hypothesis {
  id: number;
  title: string;
  problem: string;
  solution: string;
  metric: string;
  targetOutcome: string;
  status: 'proven' | 'testing' | 'planned';
}

export interface UserPosition {
  id: string;
  name?: string;
  selfScore: number; // 0-100 (I)
  weScore: number;   // 0-100 (WE)
  futureSelfScore: number;
  futureWeScore: number;
}
