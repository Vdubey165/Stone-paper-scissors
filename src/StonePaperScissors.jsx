import React, { useState } from 'react';
import './StonePaperScissors.css';

const choices = [
  { id: 'stone', name: 'Stone', emoji: '✊' },
  { id: 'paper', name: 'Paper', emoji: '✋' },
  { id: 'scissors', name: 'Scissors', emoji: '✌️' }
];

const StonePaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [gameHistory, setGameHistory] = useState([]);

  const determineWinner = (player, computer) => {
    if (player === computer) return 'draw';
    
    const rules = {
      stone: 'scissors',
      paper: 'stone',
      scissors: 'paper'
    };
    
    return rules[player] === computer ? 'player' : 'computer';
  };

  const playGame = (choice) => {
    const computerSelection = choices[Math.floor(Math.random() * choices.length)].id;
    
    setPlayerChoice(choice);
    setComputerChoice(computerSelection);
    
    const gameResult = determineWinner(choice, computerSelection);
    setResult(gameResult);
    
    setScore(prev => ({
      ...prev,
      player: gameResult === 'player' ? prev.player + 1 : prev.player,
      computer: gameResult === 'computer' ? prev.computer + 1 : prev.computer
    }));
    
    setGameHistory(prev => [
      ...prev.slice(-4),
      {
        player: choice,
        computer: computerSelection,
        result: gameResult,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  const resetScore = () => {
    setScore({ player: 0, computer: 0 });
    setGameHistory([]);
  };

  const getResultClass = () => {
    if (!result) return '';
    if (result === 'player') return 'win';
    if (result === 'computer') return 'lose';
    return 'draw';
  };

  const getChoiceEmoji = (choiceId) => {
    return choices.find(c => c.id === choiceId)?.emoji || '❓';
  };

  return (
    <div className="game-container">
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      
      <div className="game-header">
        <h1 className="game-title">Stone Paper Scissors</h1>
        <p className="game-subtitle">Make your move and outsmart the computer!</p>
      </div>
      
      <div className="score-display">
        <div className="score-item player-score">
          <div className="score-label">Player</div>
          <div className="score-value">{score.player}</div>
        </div>
        <div className="score-item computer-score">
          <div className="score-label">Computer</div>
          <div className="score-value">{score.computer}</div>
        </div>
      </div>
      
      <div className="choices-container">
        <h2 className="choices-title">Choose Your Weapon</h2>
        <div className="choices-row">
          {choices.map(choice => (
            <div key={choice.id} className="choice-card">
              <button 
                className="choice-btn"
                onClick={() => playGame(choice.id)}
                aria-label={`Choose ${choice.name}`}
              >
                <span className="choice-emoji">{choice.emoji}</span>
                <span className="choice-name">{choice.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {result !== null && (
        <div className="results-section">
          <div className="battle-area">
            <div className="choice-display player-choice">
              <div className="choice-emoji-large">{getChoiceEmoji(playerChoice)}</div>
              <div className="choice-label">You</div>
            </div>
            <div className="vs-badge">VS</div>
            <div className="choice-display computer-choice">
              <div className="choice-emoji-large">{getChoiceEmoji(computerChoice)}</div>
              <div className="choice-label">Computer</div>
            </div>
          </div>
          
          <div className={`result-message ${getResultClass()}`}>
            {result === 'draw' ? "It's a draw! 🤝" : 
             result === 'player' ? 'You win! 🎉' : 'Computer wins! 💻'}
          </div>
          
          <div className="action-buttons">
            <button onClick={resetGame} className="action-btn primary">
              Play Again
            </button>
            <button onClick={resetScore} className="action-btn secondary">
              Reset Score
            </button>
          </div>
          
          {gameHistory.length > 0 && (
            <div className="game-history">
              <h3 className="history-title">Recent Games</h3>
              <div className="history-list">
                {gameHistory.map((game, index) => (
                  <div key={index} className={`history-item ${game.result}`}>
                    <span className="history-time">{game.timestamp}:</span>
                    <span className="history-choices">
                      {getChoiceEmoji(game.player)} vs {getChoiceEmoji(game.computer)}
                    </span>
                    <span className="history-result">
                      → {game.result === 'draw' ? 'Draw' : game.result === 'player' ? 'You won' : 'Computer won'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StonePaperScissors;