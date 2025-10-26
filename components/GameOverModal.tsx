
import React, { useEffect } from 'react';

// Assume confetti is available on the window object from the CDN script
declare const confetti: any;

interface GameOverModalProps {
  scores: { A: number; B: number };
  moves: number;
  onPlayAgain: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ scores, moves, onPlayAgain }) => {
  const winner = scores.A > scores.B ? 'Team A' : scores.B > scores.A ? 'Team B' : "It's a Tie!";
  const winnerMessage = winner.includes('Team') ? `${winner} wins!` : winner;

  useEffect(() => {
    if (winner.includes('Team')) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  }, [winner]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-slate-800 rounded-2xl shadow-xl p-6 md:p-10 text-center max-w-md w-full border-2 border-cyan-500 animate-scaleIn">
        <h2 className="text-3xl md:text-5xl font-bold text-cyan-400 mb-2">Game Over!</h2>
        <p className="text-2xl md:text-3xl font-semibold text-white mb-6">{winnerMessage}</p>
        
        <div className="flex justify-around text-lg md:text-xl mb-8">
            <div>
                <p className="text-slate-400">Team A</p>
                <p className="font-bold text-3xl">{scores.A}</p>
            </div>
            <div>
                <p className="text-slate-400">Team B</p>
                <p className="font-bold text-3xl">{scores.B}</p>
            </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-8 rounded-lg text-xl md:text-2xl transition-transform transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;