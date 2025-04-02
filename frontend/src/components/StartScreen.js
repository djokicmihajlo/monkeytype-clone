import React, { useState } from 'react';

const StartScreen = ({ onStartTest }) => {
  const durations = [15, 30, 60];
  const [selectedDuration, setSelectedDuration] = useState(15);

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleStartTest = () => {
    onStartTest(selectedDuration);
  };

  return (
    <div className="start-screen">
      <h1>MonkeyType Clone</h1>
      <div className="timer-selection">
        <p>Test Duration:</p>
        <div className="duration-options">
          {durations.map((duration) => (
            <button
              key={duration}
              className={`duration-option ${duration === selectedDuration ? 'selected' : ''}`}
              onClick={() => handleDurationChange(duration)}
            >
              {duration}s
            </button>
          ))}
        </div>
      </div>
      <button className="start-button" onClick={handleStartTest}>
        Start Test
      </button>
    </div>
  );
};

export default StartScreen; 