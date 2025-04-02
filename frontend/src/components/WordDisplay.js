import React from 'react';

const WordDisplay = ({ words, activeWordIndex, typedWord }) => {
  // For determining which word is current, typed correctly or incorrectly
  const getWordClass = (index) => {
    if (index < activeWordIndex) {
      return 'word completed';
    }
    if (index === activeWordIndex) {
      return 'word active';
    }
    return 'word';
  };

  // For highlighting characters that are correct or incorrect in current word
  const getCharClass = (wordIdx, charIdx, char) => {
    if (wordIdx !== activeWordIndex) return '';
    
    if (charIdx >= typedWord.length) return '';
    
    return typedWord[charIdx] === char ? 'correct' : 'incorrect';
  };

  return (
    <div className="word-display">
      <div className="words-container">
        {words.map((word, wordIdx) => (
          <div key={wordIdx} className={getWordClass(wordIdx)}>
            {word.split('').map((char, charIdx) => (
              <span 
                key={charIdx}
                className={getCharClass(wordIdx, charIdx, char)}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordDisplay; 