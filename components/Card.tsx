
import React from 'react';

interface CardProps {
  id: number;
  displayId: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  isMismatched: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, displayId, value, isFlipped, isMatched, isMismatched, onClick }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onClick(id);
    }
  };

  const cardInnerStyle = {
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d' as 'preserve-3d',
  };

  const cardClasses = [
    'w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-36 lg:w-32 lg:h-48 cursor-pointer rounded-lg',
    isMismatched ? 'animate-shake' : '',
  ].join(' ');

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
    >
      <div
        className="relative w-full h-full"
        style={cardInnerStyle}
      >
        {/* Card Front (Hidden side) */}
        <div className="absolute w-full h-full flex items-center justify-center bg-cyan-600 rounded-lg shadow-md" style={{ backfaceVisibility: 'hidden' }}>
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 font-bold">{displayId}</span>
        </div>
        
        {/* Card Back (Visible side when flipped) */}
        <div 
          className={`absolute w-full h-full flex items-center justify-center rounded-lg shadow-lg ${isMatched ? 'bg-emerald-500 animate-glow' : 'bg-slate-700'}`} 
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold ${isMatched ? 'text-slate-900' : 'text-cyan-400'}`}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;