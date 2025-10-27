
import React from 'react';
import { CardType } from '../types.ts';
import Card from './Card.tsx';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  mismatchedCards: number[];
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, mismatchedCards }) => {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2" style={{ perspective: '1000px' }}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          displayId={index + 1}
          value={card.value}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          isMismatched={mismatchedCards.includes(card.id)}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default GameBoard;
