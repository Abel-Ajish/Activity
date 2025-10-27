import React from 'react';
import { GameResult } from '../types.ts';

interface GameHistoryModalProps {
  history: GameResult[];
  onClear: () => void;
  onClose: () => void;
}

const GameHistoryModal: React.FC<GameHistoryModalProps> = ({ history, onClear, onClose }) => {

  const handleClearClick = () => {
    if (window.confirm('Are you sure you want to clear the entire game history? This cannot be undone.')) {
      onClear();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 text-center max-w-lg w-full border-2 border-cyan-500 animate-scaleIn flex flex-col" style={{maxHeight: '80vh'}}>
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-4">Game History</h2>
        
        <div className="flex-grow overflow-y-auto my-4 pr-2">
          {history.length > 0 ? (
            <ul className="space-y-3 text-left">
              {history.map((game, index) => (
                <li key={index} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className={`font-bold text-lg ${game.winner === 'Tie' ? 'text-yellow-400' : 'text-white'}`}>
                      {game.winner.includes('Team') ? `${game.winner} Won` : 'Tie Game'}
                    </span>
                    <span className="text-sm text-slate-400">
                      {new Date(game.date).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-md text-slate-300 mt-1">
                    Score: {game.scores.A} (A) vs {game.scores.B} (B)
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-lg">No game history yet. Play a game to see results here!</p>
          )}
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onClose} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                Close
            </button>
            {history.length > 0 && (
                <button onClick={handleClearClick} className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">
                    Clear History
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default GameHistoryModal;
