import React, { useState, useEffect } from 'react';
import { Player } from '../types.ts';

interface HostControlsProps {
  onFlipAllCards: () => void;
  onEndTurn: () => void;
  onAwardPoint: (team: Player) => void;
  onDeductPoint: (team: Player) => void;
  onTogglePause: () => void;
  onChangeTime: (time: number) => void;
  onResetTime: () => void;
  onEndGame: () => void;
  onResetGame: () => void;
  onClose: () => void;
  showAll: boolean;
  isPaused: boolean;
  turnDuration: number;
  scores: { A: number; B: number };
  currentPlayer: Player;
  timeLeft: number;
}

const HostControls: React.FC<HostControlsProps> = ({ 
  onFlipAllCards, 
  onEndTurn, 
  onAwardPoint, 
  onDeductPoint, 
  onTogglePause,
  onChangeTime,
  onResetTime,
  onEndGame,
  onResetGame,
  onClose,
  showAll, 
  isPaused,
  turnDuration,
  scores,
  currentPlayer,
  timeLeft
}) => {
  const [timeValue, setTimeValue] = useState<string>(turnDuration.toString());

  useEffect(() => {
    setTimeValue(turnDuration.toString());
  }, [turnDuration]);

  const handleSetTimeClick = () => {
    const newTime = parseInt(timeValue, 10);
    if (!isNaN(newTime)) {
      onChangeTime(newTime);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-2 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700">
      <div className="flex justify-between items-center">
        <h3 className="text-lg sm:text-xl font-bold text-slate-400 tracking-wider">
          Host Controls
        </h3>
        <button 
          onClick={onClose}
          className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1.5 px-3 rounded-lg transition"
          aria-label="Hide host controls"
        >
          Hide
        </button>
      </div>

      <div id="host-controls-content" className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        
        {/* General Controls Section */}
        <div className="flex flex-col p-2 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-500 text-center mb-2 tracking-wider uppercase">General</h4>
          <div className="grid grid-cols-2 gap-2 flex-grow">
            <button onClick={onFlipAllCards} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1.5 px-2 rounded-lg transition text-sm sm:text-base">
              {showAll ? 'Hide All' : 'Reveal All'}
            </button>
            <button onClick={onEndTurn} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1.5 px-2 rounded-lg transition text-sm sm:text-base">
              End Turn
            </button>
            <button onClick={onEndGame} className="bg-red-700 hover:bg-red-600 text-white font-semibold py-1.5 px-2 rounded-lg transition text-sm sm:text-base">
              End Game
            </button>
            <button onClick={onResetGame} className="bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-1.5 px-2 rounded-lg transition text-sm sm:text-base">
              Reset Game
            </button>
          </div>
        </div>

        {/* Team Score Controls Section */}
        <div className="flex flex-col p-2 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-500 text-center mb-2 tracking-wider uppercase">Team Scores</h4>
          <div className="flex-grow flex items-center justify-around gap-1 sm:gap-2">
            <div className={`flex items-center gap-1 sm:gap-2 p-2 rounded-lg transition-all ${currentPlayer === 'A' ? 'bg-cyan-900/75' : ''}`}>
              <span className="font-semibold text-slate-300 text-base sm:text-lg">A:</span>
              <span className="font-bold text-white text-xl w-6 text-center">{scores.A}</span>
              <button onClick={() => onAwardPoint('A')} className="bg-green-600 hover:bg-green-500 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 rounded-full transition text-lg">+</button>
              <button onClick={() => onDeductPoint('A')} className="bg-red-600 hover:bg-red-500 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 rounded-full transition text-lg">-</button>
            </div>
            <div className={`flex items-center gap-1 sm:gap-2 p-2 rounded-lg transition-all ${currentPlayer === 'B' ? 'bg-cyan-900/75' : ''}`}>
              <span className="font-semibold text-slate-300 text-base sm:text-lg">B:</span>
              <span className="font-bold text-white text-xl w-6 text-center">{scores.B}</span>
              <button onClick={() => onAwardPoint('B')} className="bg-green-600 hover:bg-green-500 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 rounded-full transition text-lg">+</button>
              <button onClick={() => onDeductPoint('B')} className="bg-red-600 hover:bg-red-500 text-white font-bold w-7 h-7 sm:w-8 sm:h-8 rounded-full transition text-lg">-</button>
            </div>
          </div>
        </div>

        {/* Timer Controls Section */}
        <div className="flex flex-col p-2 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h4 className="text-xs sm:text-sm font-semibold text-slate-500 text-center mb-2 tracking-wider uppercase">Timer</h4>
          <div className="flex-grow flex flex-col items-center justify-center gap-2">
             <button
                onClick={onTogglePause}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-1.5 px-3 rounded-lg transition w-full max-w-xs text-sm"
              >
                {isPaused ? 'Resume Timer' : 'Pause Timer'}
              </button>
              <div className="flex items-center justify-center gap-2 w-full max-w-xs">
                 <div className={`w-12 h-12 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isPaused ? 'border-yellow-500' : (timeLeft <= 5 ? 'border-red-500' : 'border-slate-600')} ${timeLeft <= 5 && !isPaused ? 'animate-pulse' : ''}`}>
                    <span className={`text-xl font-mono ${isPaused ? 'text-yellow-500' : (timeLeft <= 5 ? 'text-red-500' : 'text-cyan-400')}`}>
                      {isPaused ? '||' : timeLeft}
                    </span>
                 </div>
                <input
                  type="number"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="w-14 bg-slate-700 text-white rounded p-1.5 text-center font-mono"
                  min="5" max="60"
                />
                <button onClick={handleSetTimeClick} className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-1.5 px-2 rounded-lg transition text-sm">Set</button>
                <button onClick={onResetTime} className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-1.5 px-2 rounded-lg transition text-sm">Reset</button>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HostControls;