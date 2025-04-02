import React from 'react';

const ResultsScreen = ({ results, onTryAgain }) => {
  const { wpm, accuracy, correctChars, incorrectChars } = results;
  
  return (
    <div className="results-screen">
      <h2>Test Results</h2>
      
      <div className="results-card">
        <div className="result-item">
          <span className="result-label">Words Per Minute:</span>
          <span className="result-value">{wpm}</span>
        </div>
        
        <div className="result-item">
          <span className="result-label">Accuracy:</span>
          <span className="result-value">{accuracy}%</span>
        </div>
        
        <div className="stats-section">
          <h3>Character Stats</h3>
          <div className="char-stats">
            <div className="stat">
              <span className="stat-label">Correct:</span>
              <span className="stat-value correct">{correctChars}</span>
            </div>
            
            <div className="stat">
              <span className="stat-label">Incorrect:</span>
              <span className="stat-value incorrect">{incorrectChars}</span>
            </div>
            
            <div className="stat">
              <span className="stat-label">Total:</span>
              <span className="stat-value">{correctChars + incorrectChars}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button className="try-again-button" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  );
};

export default ResultsScreen; 