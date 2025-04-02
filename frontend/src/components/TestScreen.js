import React, { useState, useEffect, useRef } from 'react';
import WordDisplay from './WordDisplay';
import { words } from '../words';

const TestScreen = ({ duration, onTestComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentInput, setCurrentInput] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [testWords, setTestWords] = useState([]);
  const inputRef = useRef(null);
  
  // Generate a random set of words for the test
  useEffect(() => {
    const randomWords = [];
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }
    setTestWords(randomWords);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      // Calculate final results
      const wpm = Math.round((correctChars / 5) * (60 / duration));
      const accuracy = Math.round(
        (correctChars / (correctChars + incorrectChars)) * 100
      );
      
      // Pass results to parent component
      onTestComplete({ wpm, accuracy, correctChars, incorrectChars });
    }
  }, [timeLeft, correctChars, incorrectChars, duration, onTestComplete]);

  // Focus on input when test starts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Only update input if test is still running
    if (timeLeft > 0) {
      setCurrentInput(value);
    }
  };

  const handleKeyDown = (e) => {
    if (timeLeft === 0) return;
    
    // Check if space is pressed (word completed)
    if (e.key === ' ') {
      e.preventDefault();
      const currentWord = testWords[activeWordIndex];
      const typedWord = currentInput.trim();
      
      // Calculate correct/incorrect characters
      let correctCount = 0;
      let incorrectCount = 0;
      
      for (let i = 0; i < typedWord.length; i++) {
        if (i < currentWord.length && typedWord[i] === currentWord[i]) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
      
      // Check for missing characters (also counted as incorrect)
      if (currentWord.length > typedWord.length) {
        incorrectCount += currentWord.length - typedWord.length;
      }
      
      // Update the character counts
      setCorrectChars(prev => prev + correctCount);
      setIncorrectChars(prev => prev + incorrectCount);
      
      // Move to next word and clear input
      setActiveWordIndex(prev => prev + 1);
      setCurrentInput('');
    }
  };

  return (
    <div className="test-screen">
      <div className="timer">Time left: {timeLeft}s</div>
      
      <WordDisplay 
        words={testWords}
        activeWordIndex={activeWordIndex}
        typedWord={currentInput}
      />
      
      <input
        ref={inputRef}
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="typing-input"
        autoFocus
      />
    </div>
  );
};

export default TestScreen; 