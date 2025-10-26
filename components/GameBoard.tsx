
import React from 'react';
import { CardType } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
  mismatchedCards: number[];
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, mismatchedCards }) => {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3 md:gap-4 p-2" style={{ perspective: '1000px' }}>
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