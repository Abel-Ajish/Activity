export interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Player = 'A' | 'B';

export interface GameResult {
  winner: 'Team A' | 'Team B' | 'Tie';
  scores: { A: number; B: number };
  date: string;
}
