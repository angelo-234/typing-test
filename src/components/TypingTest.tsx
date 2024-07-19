import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from './TextDisplay';
import TypingInput from './TypingInput';
import Timer from './Timer';
import { useTypingTest } from '../hooks/UseTypingTest';

interface TypingTestProps {
  mode: 'time' | 'words';
  duration: number;
}

const TypingTest: React.FC<TypingTestProps> = ({ mode, duration }) => {
  const [testStarted, setTestStarted] = useState(false);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  const {
    text,
    currentWordIndex,
    currentCharIndex,
    inputValue,
    isFinished,
    timeLeft,
    wordCount,
    wpm,
    accuracy,
    startTest,
    handleInputChange,
    handleInputSubmit,
    restartTest,
    nextTest,
    typedText,
    wordsLeft,
  } = useTypingTest(mode, duration);

  useEffect(() => {
    startTest(); // Generate initial text
  }, [mode, duration]);

  const handleTypingStart = () => {
    if (!testStarted) {
      setTestStarted(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        ref={textDisplayRef}
        className="cursor-text"
        tabIndex={0}
      >
        <TextDisplay
          text={text}
          currentWordIndex={currentWordIndex}
          currentCharIndex={currentCharIndex}
          typedText={typedText}
        />
      </div>
      {!isFinished && (
        <Timer
          mode={mode}
          duration={duration}
          timeLeft={timeLeft}
          wordsLeft={wordsLeft}
          testStarted={testStarted}
        />
      )}
      <TypingInput
        value={inputValue}
        onChange={(value) => {
          handleTypingStart();
          handleInputChange(value);
        }}
        onSubmit={handleInputSubmit}
        disabled={isFinished}
      />
      {isFinished && (
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={restartTest}
            className="bg-primary text-background px-4 py-2 rounded"
          >
            Restart
          </button>
          <button
            onClick={nextTest}
            className="bg-primary text-background px-4 py-2 rounded"
          >
            Next Test
          </button>
        </div>
      )}
      {isFinished && (
        <div className="mt-4 text-center">
          <p className="text-xl">WPM: {Math.round(wpm)}</p>
          <p className="text-xl">Accuracy: {accuracy.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default TypingTest;