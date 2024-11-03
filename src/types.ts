export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'smart-contracts' | 'directives' | 'state-management' | 'routing' | 'security' | 'performance';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  template?: string;
  solution?: string;
  hint?: string;
  solved?: boolean;
  timeLimit?: number;
  bonusPoints?: number;
  achievement?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface User {
  id: string;
  username: string;
  points: number;
  solvedChallenges: string[];
  achievements: string[];
  rank: number;
  timeRecords: Record<string, number>;
}