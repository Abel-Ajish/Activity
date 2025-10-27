import React from 'react';
import { Player } from '../types.ts';

interface GameStatusHeaderProps {
  scores: { A: number; B: number };
  currentPlayer: Player;
  timeLeft: number;
  isPaused: boolean;
}

const GameStatusHeader: React.FC<GameStatusHeaderProps> = ({ scores, currentPlayer, timeLeft, isPaused }) => {
  const timerColor = isPaused ? 'text-yellow-500' : timeLeft <= 5 ? 'text-red-500' : 'text-cyan-400';
  const timerPulse = timeLeft <= 5 && !isPaused ? 'animate-pulse' : '';

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-1 flex justify-between items-center animate-fadeIn flex-shrink-0">
      {/* Left Corner: Timer */}
      <div className={`flex items-center gap-2 font-mono p-2 rounded-lg bg-slate-800/50 border border-slate-700`}>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 ${timerColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className={`text-xl sm:text-2xl font-bold w-8 text-center ${timerColor} ${timerPulse}`}>
          {isPaused ? '||' : timeLeft}
        </span>
      </div>

      {/* Center: Current Player */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-cyan-400">
          Team {currentPlayer}'s Turn
        </h2>
      </div>

      {/* Right Corner: Scores */}
      <div className="flex items-center gap-2 sm:gap-4 font-mono text-lg sm:text-xl p-2 rounded-lg bg-slate-800/50 border border-slate-700">
        <div className={`p-1 rounded transition-all duration-300 ${currentPlayer === 'A' ? 'text-cyan-300' : 'text-slate-400'}`}>
            <span className="font-semibold">A:</span>
            <span className="font-bold ml-2 w-4 inline-block text-center">{scores.A}</span>
        </div>
        <div className="border-l border-slate-600 h-6"></div>
        <div className={`p-1 rounded transition-all duration-300 ${currentPlayer === 'B' ? 'text-cyan-300' : 'text-slate-400'}`}>
            <span className="font-semibold">B:</span>
            <span className="font-bold ml-2 w-4 inline-block text-center">{scores.B}</span>
        </div>
      </div>
    </div>
  );
};

export default GameStatusHeader;