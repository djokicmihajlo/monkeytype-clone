import React, { useState } from 'react';
import './App.css';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const [testDuration, setTestDuration] = useState(15);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [testKey, setTestKey] = useState(0);

  const handleDurationChange = (duration) => {
    setTestDuration(duration);
  };

  const handleTestStart = () => {
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
    setIsTestRunning(false);
    setTestKey(prev => prev + 1);
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
        {!testCompleted ? (
          <TestScreen 
            key={testKey}
            duration={testDuration}
            isTestRunning={isTestRunning}
            onTestStart={handleTestStart}
            onTestComplete={handleTestComplete}
            onDurationChange={handleDurationChange}
          />
        ) : (
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
