
import React from 'react';
import { Player } from '../types.ts';

interface ScoreboardProps {
  scores: { A: number; B: number };
  currentPlayer: Player;
  timeLeft: number;
  isPaused: boolean;
}

const TeamScore: React.FC<{ team: Player; score: number; isActive: boolean }> = ({ team, score, isActive }) => {
    const baseClasses = 'flex flex-col items-center justify-center p-2 md:p-6 rounded-xl w-28 md:w-48 transition-all duration-300';
    const activeClasses = 'bg-cyan-500 text-slate-900 animate-pulse-glow';
    const inactiveClasses = 'bg-slate-800 text-cyan-400 scale-100';
    
    return (
        <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            <span className="text-lg md:text-2xl font-semibold tracking-wider">Team {team}</span>
            <span key={score} className="text-4xl md:text-6xl font-bold mt-1 animate-scaleIn">{score}</span>
        </div>
    );
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, currentPlayer, timeLeft, isPaused }) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-8 my-2 md:my-6 animate-fadeIn">
      <TeamScore team="A" score={scores.A} isActive={currentPlayer === 'A'} />
      <div className="flex flex-col items-center">
            <div className="text-slate-500 text-xs font-mono mb-1 tracking-widest">TIME</div>
            <div className={`
              w-14 h-14 md:w-20 md:h-20 rounded-full border-2 md:border-4 flex items-center justify-center transition-colors
              ${isPaused ? 'border-yellow-500' : (timeLeft <= 5 ? 'border-red-500' : 'border-slate-600')}
              ${timeLeft <= 5 && !isPaused ? 'animate-pulse' : ''}
            `}>
                <span className={`
                  text-2xl md:text-4xl font-mono
                  ${isPaused ? 'text-yellow-500' : (timeLeft <= 5 ? 'text-red-500' : 'text-cyan-400')}
                `}>
                  {isPaused ? '||' : timeLeft}
                </span>
            </div>
        </div>
      <TeamScore team="B" score={scores.B} isActive={currentPlayer === 'B'} />
    </div>
  );
};

export default Scoreboard;
