
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
  const [isAnimatingMatch, setIsAnimatingMatch] = React.useState(false);
  const prevIsMatched = React.useRef(isMatched);

  React.useEffect(() => {
    if (isMatched && !prevIsMatched.current) {
      setIsAnimatingMatch(true);
      const timer = setTimeout(() => {
        setIsAnimatingMatch(false);
      }, 800); // Animation duration
      return () => clearTimeout(timer);
    }
    prevIsMatched.current = isMatched;
  }, [isMatched]);
  
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
    'relative w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 lg:w-24 lg:h-36 cursor-pointer rounded-lg',
    isMismatched ? 'animate-shake' : '',
    isAnimatingMatch ? 'animate-match-success' : '',
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
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 font-bold">{displayId}</span>
        </div>
        
        {/* Card Back (Visible side when flipped) */}
        <div 
          className={`absolute w-full h-full flex items-center justify-center rounded-lg shadow-lg ${isMatched ? 'bg-emerald-500' : 'bg-slate-700'}`} 
          style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
        >
          <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${isMatched ? 'text-slate-900' : 'text-cyan-400'}`}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
