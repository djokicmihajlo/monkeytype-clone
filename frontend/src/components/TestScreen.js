import React, { useState, useEffect, useRef } from 'react';
import WordDisplay from './WordDisplay';
import { words } from '../words';

const TestScreen = ({ duration, isTestRunning, onTestStart, onTestComplete, onDurationChange }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [currentInput, setCurrentInput] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [testWords, setTestWords] = useState([]);
  const [completedWords, setCompletedWords] = useState(0);  // Track completed words for WPM
  const inputRef = useRef(null);
  const durations = [15, 30, 60];

  // Generate a random set of words for the test
  useEffect(() => {
    const randomWords = [];
    for (let i = 0; i < 100; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }
    setTestWords(randomWords);
  }, []);

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Timer countdown
  useEffect(() => {
    if (isTestRunning && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (isTestRunning && timeLeft === 0) {
      // Calculate final results using the formula: (CORRECT characters typed / 5) × (60 / time in seconds)
      // Only count CORRECT characters, not incorrect ones
      const timeInSeconds = duration;
      const wpm = Math.round((correctChars / 5) * (60 / timeInSeconds));
      
      // Calculate accuracy
      const totalChars = correctChars + incorrectChars;
      const accuracy = totalChars > 0 
        ? Math.round((correctChars / totalChars) * 100) 
        : 0;
      
      // Pass results to parent component
      onTestComplete({ 
        wpm, 
        accuracy, 
        correctChars, 
        incorrectChars,
        completedWords
      });
    }
  }, [timeLeft, isTestRunning, correctChars, incorrectChars, duration, onTestComplete, completedWords]);

  // Ensure input always has focus
  useEffect(() => {
    const ensureFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Focus on initial render
    ensureFocus();

    // Add click event listener to the entire document
    document.addEventListener('click', ensureFocus);

    return () => {
      document.removeEventListener('click', ensureFocus);
    };
  }, []);

  const handleDurationChange = (newDuration) => {
    onDurationChange(newDuration);
    // Reset test state when changing duration
    setCurrentInput('');
    setActiveWordIndex(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setCompletedWords(0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Start the test on first keystroke if not already running
    if (!isTestRunning && value.length > 0) {
      onTestStart();
    }
    
    // Always update the input during the test
    setCurrentInput(value);
  };

  const handleKeyDown = (e) => {
    // Don't do anything if timer has ended
    if (isTestRunning && timeLeft === 0) return;
    
    // Check if space is pressed (word completed)
    if (e.key === ' ') {
      e.preventDefault();
      
      // Ignore empty input or if test hasn't started
      if (!currentInput.trim() || !isTestRunning) return;
      
      const currentWord = testWords[activeWordIndex];
      const typedWord = currentInput.trim();
      
      // Calculate correct/incorrect characters
      let correctCount = 0;
      let incorrectCount = 0;
      
      // First count matching characters at the beginning of the word
      let i = 0;
      while (i < typedWord.length && i < currentWord.length && typedWord[i] === currentWord[i]) {
        correctCount++;
        i++;
      }
      
      // Count remaining typed characters as incorrect (extra or mistyped)
      if (i < typedWord.length) {
        incorrectCount += typedWord.length - i;
      }
      
      // Count missing characters as incorrect
      if (currentWord.length > typedWord.length) {
        incorrectCount += currentWord.length - typedWord.length;
      }
      
      // Update the character counts
      setCorrectChars(prev => prev + correctCount);
      setIncorrectChars(prev => prev + incorrectCount);
      
      // Increment completed words counter if word was typed correctly
      if (currentWord === typedWord) {
        setCompletedWords(prev => prev + 1);
      }
      
      // Move to next word and clear input
      setActiveWordIndex(prev => prev + 1);
      setCurrentInput('');
    }
  };

  return (
    <div className="test-screen">
      <div className="test-header">
        <div className="timer">
          {isTestRunning ? (
            `Time left: ${timeLeft}s`
          ) : (
            <h2>MonkeyType Clone</h2>
          )}
        </div>
        
        <div className="duration-options">
          {durations.map((durationOption) => (
            <button
              key={durationOption}
              className={`duration-option ${durationOption === duration ? 'selected' : ''}`}
              onClick={() => handleDurationChange(durationOption)}
              disabled={isTestRunning}
            >
              {durationOption}s
            </button>
          ))}
        </div>
      </div>
      
      <div className="word-display">
        <div className="test-instructions">
          {!isTestRunning && (
            <div className="start-typing-message">Start typing to begin the test...</div>
          )}
        </div>
        <WordDisplay 
          words={testWords}
          activeWordIndex={activeWordIndex}
          typedWord={currentInput}
        />
      </div>
      
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