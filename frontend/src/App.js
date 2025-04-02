import React, { useState } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [testDuration, setTestDuration] = useState(15);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  const startTest = (duration) => {
    setTestDuration(duration);
    setIsTestRunning(true);
    setTestCompleted(false);
    setTestResults(null);
  };

  const handleTestComplete = (results) => {
    setTestResults(results);
    setIsTestRunning(false);
    setTestCompleted(true);
  };

  const handleTryAgain = () => {
    setTestCompleted(false);
    setTestResults(null);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app" data-theme={theme}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </div>

      <div className="container">
        {!isTestRunning && !testCompleted && (
          <StartScreen onStartTest={startTest} />
        )}
        
        {isTestRunning && (
          <TestScreen 
            duration={testDuration}
            onTestComplete={handleTestComplete}
          />
        )}
        
        {!isTestRunning && testCompleted && (
          <ResultsScreen 
            results={testResults}
            onTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  );
}

export default App;
