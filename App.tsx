
import React, { useState, useEffect, useCallback } from 'react';
import { CardType, Player, GameResult } from './types';
import Scoreboard from './components/Scoreboard';
import GameBoard from './components/GameBoard';
import GameOverModal from './components/GameOverModal';
import HostControls from './components/HostControls';
import GameHistoryModal from './components/GameHistoryModal';

type GameState = 'pre-game' | 'memorize' | 'playing' | 'game-over';

const EMOJI_VALUES = ['😀', '🎉', '🚀', '🌟', '🍕', '💡', '💖', '🤖', '👑', '🎸'];

const shuffleCards = (): CardType[] => {
  const cards = [...EMOJI_VALUES, ...EMOJI_VALUES]
    .map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [mismatchedCards, setMismatchedCards] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('A');
  const [scores, setScores] = useState<{ A: number; B: number }>({ A: 0, B: 0 });
  const [isChecking, setIsChecking] = useState(false);
  const [gameState, setGameState] = useState<GameState>('pre-game');
  const [moves, setMoves] = useState(0);
  const [turnDuration, setTurnDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(turnDuration);
  const [showAll, setShowAll] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('emojiFlipHistory');
      if (storedHistory) {
        setGameHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load game history from localStorage", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('emojiFlipHistory', JSON.stringify(gameHistory));
    } catch (error) {
      console.error("Failed to save game history to localStorage", error);
    }
  }, [gameHistory]);

  const resetGame = useCallback(() => {
    setCards([]);
    setFlippedCards([]);
    setMismatchedCards([]);
    setCurrentPlayer('A');
    setScores({ A: 0, B: 0 });
    setIsChecking(false);
    setMoves(0);
    setTurnDuration(20);
    setTimeLeft(20);
    setShowAll(false);
    setIsPaused(false);
    setGameState('pre-game');
  }, []);

  const startGame = () => {
    const initialCards = shuffleCards().map(card => ({ ...card, isFlipped: true }));
    setCards(initialCards);
    setGameState('memorize');

    setTimeout(() => {
      setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: false })));
      setGameState('playing');
      setTimeLeft(turnDuration);
    }, 3000);
  };

  const handleCardClick = (id: number) => {
    if (gameState !== 'playing' || isChecking || flippedCards.length === 2 || showAll || isPaused) return;

    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    const newCards = cards.map(card =>
      card.id === id ? { ...card, isFlipped: true } : card
    );

    setCards(newCards);
    setFlippedCards(newFlippedCards);
  };
  
  const endTheGame = useCallback(() => {
    if (gameState === 'game-over') return;

    const winner = scores.A > scores.B ? 'Team A' : scores.B > scores.A ? 'Team B' : 'Tie';
    const newResult: GameResult = { winner, scores, date: new Date().toISOString() };
    
    setGameHistory(prevHistory => [newResult, ...prevHistory]);
    setGameState('game-over');
  }, [scores, gameState]);


  const checkForMatch = useCallback(() => {
    if (flippedCards.length !== 2) return;

    setIsChecking(true);
    setMoves(prev => prev + 1);

    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard && secondCard) {
      if (firstCard.value === secondCard.value) {
        setScores(prevScores => ({ ...prevScores, [currentPlayer]: prevScores[currentPlayer] + 1 }));
        setCards(prevCards => prevCards.map(card => card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card));
        setFlippedCards([]);
        setIsChecking(false);
        setTimeLeft(turnDuration);
      } else {
        setMismatchedCards([firstId, secondId]);
        setTimeout(() => {
          setCards(prevCards => prevCards.map(card => card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card));
          setCurrentPlayer(prev => (prev === 'A' ? 'B' : 'A'));
          setFlippedCards([]);
          setMismatchedCards([]);
          setIsChecking(false);
          setTimeLeft(turnDuration);
        }, 1500);
      }
    }
  }, [flippedCards, cards, currentPlayer, turnDuration]);

  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0 || showAll || isPaused) return;
    const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, gameState, showAll, isPaused]);

  useEffect(() => {
    if (timeLeft > 0 || gameState !== 'playing' || isPaused) return;
    if (flippedCards.length === 1) {
      setCards(prevCards => prevCards.map(card => card.id === flippedCards[0] ? { ...card, isFlipped: false } : card));
    }
    setFlippedCards([]);
    setCurrentPlayer(prev => (prev === 'A' ? 'B' : 'A'));
    setTimeLeft(turnDuration);
  }, [timeLeft, gameState, flippedCards, isPaused, turnDuration]);

  useEffect(() => {
    if (gameState === 'playing' && !showAll) checkForMatch();
  }, [checkForMatch, gameState, showAll]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      endTheGame();
    }
  }, [cards, endTheGame]);

  const handleFlipAllCards = () => {
    setShowAll(prev => {
      const nextShowAll = !prev;
      setCards(currentCards => currentCards.map(card => card.isMatched ? card : { ...card, isFlipped: nextShowAll }));
      if (!nextShowAll) setFlippedCards([]);
      return nextShowAll;
    });
  };

  const handleEndTurn = () => {
    if (isChecking) return;
    if (flippedCards.length > 0) {
      setCards(prevCards => prevCards.map(card => flippedCards.includes(card.id) ? { ...card, isFlipped: false } : card));
    }
    setFlippedCards([]);
    setCurrentPlayer(prev => (prev === 'A' ? 'B' : 'A'));
    setTimeLeft(turnDuration);
  };

  const handleAwardPoint = (team: Player) => setScores(prev => ({ ...prev, [team]: prev[team] + 1 }));
  const handleDeductPoint = (team: Player) => setScores(prev => ({ ...prev, [team]: Math.max(0, prev[team] - 1) }));
  const handleTogglePause = () => setIsPaused(prev => !prev);
  const handleChangeTime = (newTime: number) => {
    const clamped = Math.max(5, Math.min(60, newTime));
    setTurnDuration(clamped);
    setTimeLeft(clamped);
  };
  const handleResetTime = () => setTimeLeft(turnDuration);
  
  const handleShowHistory = () => setShowHistoryModal(true);
  const handleClearHistory = () => {
    setGameHistory([]);
    setShowHistoryModal(false);
  };

  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
        <header className="mb-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wider text-cyan-400">Emoji Flip Challenge</h1>
          <p className="text-lg md:text-2xl text-slate-400 mt-2">
            {gameState === 'pre-game' ? 'Click Start to begin the game.' : gameState === 'memorize' ? 'Memorize the emojis!' : `Find matching pairs! You have ${turnDuration} seconds per turn.`}
          </p>
        </header>

        {gameState === 'pre-game' ? (
          <div className="mt-16 flex flex-col items-center gap-4">
            <button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 px-10 rounded-lg text-2xl md:text-3xl transition-transform transform hover:scale-105 animate-pulse">Start Game</button>
            <button onClick={handleShowHistory} className="bg-slate-700 hover:bg-slate-600 text-cyan-400 font-semibold py-2 px-6 rounded-lg text-lg transition-transform transform hover:scale-105">Game History</button>
          </div>
        ) : (
          <>
            <Scoreboard scores={scores} currentPlayer={currentPlayer} timeLeft={timeLeft} isPaused={isPaused} />
            <main className="w-full flex-grow flex items-center justify-center my-4 animate-fadeIn">
              <GameBoard cards={cards} onCardClick={handleCardClick} mismatchedCards={mismatchedCards} />
            </main>
            {gameState === 'playing' && (
              <HostControls onFlipAllCards={handleFlipAllCards} onEndTurn={handleEndTurn} onAwardPoint={handleAwardPoint} onDeductPoint={handleDeductPoint} onTogglePause={handleTogglePause} onChangeTime={handleChangeTime} onResetTime={handleResetTime} onEndGame={endTheGame} onResetGame={resetGame} showAll={showAll} isPaused={isPaused} turnDuration={turnDuration} />
            )}
          </>
        )}
      </div>

      {gameState === 'game-over' && <GameOverModal scores={scores} moves={moves} onPlayAgain={resetGame} />}
      {showHistoryModal && <GameHistoryModal history={gameHistory} onClear={handleClearHistory} onClose={() => setShowHistoryModal(false)} />}
    </div>
  );
};

export default App;
