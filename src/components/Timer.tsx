import React from 'react';

interface TimerProps {
  mode: 'time' | 'words';
  duration: number;
  timeLeft: number;
  wordsLeft: number;
  testStarted: boolean;
}

const Timer: React.FC<TimerProps> = ({ mode, duration, timeLeft, wordsLeft, testStarted }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center text-2xl mb-4">
      {mode === 'time' ? (
        <span>{testStarted ? formatTime(timeLeft) : formatTime(duration)}</span>
      ) : (
        <span>{testStarted ? wordsLeft : duration} words</span>
      )}
    </div>
  );
};

export default Timer;