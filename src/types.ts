export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'smart-contracts' | 'cryptography' | 'web3' | 'blockchain';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  code?: string;
  solved?: boolean;
}

export interface User {
  id: string;
  username: string;
  points: number;
  solvedChallenges: string[];
  rank: number;
}