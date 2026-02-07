
export enum LifePath {
  PRODUCTIVE = 'PRODUCTIVE',
  STRONGER = 'STRONGER',
  EXTROVERT = 'EXTROVERT',
  DISCIPLINE = 'DISCIPLINE',
  MENTAL_HEALTH = 'MENTAL_HEALTH'
}

export type AppTab = 'DASHBOARD' | 'LEADERBOARD' | 'PROFILE';

export interface Mission {
  id: string;
  text: string;
  type?: string;
  completed: boolean;
  xp: number;
}

export interface UserState {
  isLoggedIn: boolean;
  username: string;
  selectedPath: LifePath | null;
  xp: number;
  level: number;
  dailyMissions: Mission[];
  completedSessions: number;
  lastMissionDate: string; // ISO string
  badges: string[];
}

export interface FocusSession {
  isActive: boolean;
  startTime: number | null;
  remainingSeconds: number;
}
