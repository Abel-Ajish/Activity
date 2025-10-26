import React, { useState, useEffect } from 'react';
import { Player } from '../types';

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
  showAll: boolean;
  isPaused: boolean;
  turnDuration: number;
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
  showAll, 
  isPaused,
  turnDuration
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
    <div className="w-full max-w-5xl mx-auto mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 animate-fadeIn">
      <h3 className="text-xl font-bold text-center text-slate-400 mb-4 tracking-wider">
        Host Controls
      </h3>
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4">
        
        {/* General Controls Section */}
        <div className="flex-1 flex flex-col p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-500 text-center mb-3 tracking-wider uppercase">General</h4>
          <div className="grid grid-cols-2 gap-3 flex-grow">
            <button onClick={onFlipAllCards} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-3 rounded-lg transition text-sm sm:text-base">
              {showAll ? 'Hide All' : 'Reveal All'}
            </button>
            <button onClick={onEndTurn} className="bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-3 rounded-lg transition text-sm sm:text-base">
              End Turn
            </button>
            <button onClick={onEndGame} className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm sm:text-base">
              End Game
            </button>
            <button onClick={onResetGame} className="bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm sm:text-base">
              Reset Game
            </button>
          </div>
        </div>

        {/* Team Score Controls Section */}
        <div className="flex-1 flex flex-col p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-500 text-center mb-3 tracking-wider uppercase">Team Scores</h4>
          <div className="flex-grow flex items-center justify-around">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300 text-lg">A:</span>
              <button onClick={() => onAwardPoint('A')} className="bg-green-600 hover:bg-green-500 text-white font-bold w-9 h-9 rounded-full transition text-xl">+</button>
              <button onClick={() => onDeductPoint('A')} className="bg-red-600 hover:bg-red-500 text-white font-bold w-9 h-9 rounded-full transition text-xl">-</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300 text-lg">B:</span>
              <button onClick={() => onAwardPoint('B')} className="bg-green-600 hover:bg-green-500 text-white font-bold w-9 h-9 rounded-full transition text-xl">+</button>
              <button onClick={() => onDeductPoint('B')} className="bg-red-600 hover:bg-red-500 text-white font-bold w-9 h-9 rounded-full transition text-xl">-</button>
            </div>
          </div>
        </div>

        {/* Timer Controls Section */}
        <div className="flex-1 flex flex-col p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-500 text-center mb-3 tracking-wider uppercase">Timer</h4>
          <div className="flex-grow flex flex-col items-center justify-center gap-2">
             <button
                onClick={onTogglePause}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition w-full max-w-xs text-sm"
              >
                {isPaused ? 'Resume Timer' : 'Pause Timer'}
              </button>
              <div className="flex items-center justify-center gap-2 w-full max-w-xs">
                <input
                  type="number"
                  value={timeValue}
                  onChange={(e) => setTimeValue(e.target.value)}
                  className="w-16 bg-slate-700 text-white rounded p-2 text-center font-mono"
                  min="5" max="60"
                />
                <button onClick={handleSetTimeClick} className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm">Set</button>
                <button onClick={onResetTime} className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg transition text-sm">Reset</button>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HostControls;
