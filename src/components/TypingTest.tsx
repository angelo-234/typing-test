import React, { useState, useEffect, useRef } from 'react';
import TextDisplay from './TextDisplay';
import TypingInput from './TypingInput';
import Timer from './Timer';
import Settings from './Settings';
import Sidebar from './Sidebar';
import { useTypingTest } from '../hooks/UseTypingTest';

interface TypingTestProps {
    mode: 'time' | 'words';
    duration: number;
    onModeChange: (mode: 'time' | 'words') => void;
    onDurationChange: (duration: number) => void;
    primaryColor: string;
    onColorChange: (color: string) => void;
}

const TypingTest: React.FC<TypingTestProps> = ({ mode, duration, onModeChange, onDurationChange, primaryColor, onColorChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showSettings, setShowSettings] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

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
        timerStarted,
    } = useTypingTest(mode, duration);

    useEffect(() => {
        startTest();
    }, [mode, duration]);

    useEffect(() => {
        if (timerStarted) {
            setShowSettings(false);
        }
    }, [timerStarted]);

    const handleAreaClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleReset = () => {
        restartTest();
        setShowSettings(true);
    };

    const handleRestart = () => {
        restartTest();
        setShowSettings(true);
    };

    const handleNext = () => {
        nextTest()
        setShowSettings(true);
    };

    return (
        <div className="w-full max-w-4xl mx-auto cursor-default" onClick={handleAreaClick}>
            {showSettings && (
                <Settings
                    mode={mode}
                    duration={duration}
                    onModeChange={onModeChange}
                    onDurationChange={onDurationChange}
                />
            )}
            <TextDisplay
                text={text}
                currentWordIndex={currentWordIndex}
                currentCharIndex={currentCharIndex}
                typedText={typedText}
            />
            {!isFinished && (
                <div className="flex justify-between items-center mb-4">
                    <Timer
                        mode={mode}
                        duration={duration}
                        timeLeft={timeLeft}
                        wordsLeft={wordsLeft}
                        testStarted={timerStarted}
                    />

                    <button
                        onClick={handleReset}
                        className="bg-primary text-background px-4 py-2 rounded"
                    >
                        Reset
                    </button>
                </div>
            )}
            <TypingInput
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onSubmit={handleInputSubmit}
                disabled={isFinished}
            />
            {isFinished && (
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={handleRestart}
                        className="bg-primary text-background px-4 py-2 rounded"
                    >
                        Restart
                    </button>
                    <button
                        onClick={handleNext}
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
            <Sidebar
                isOpen={showSidebar}
                onClose={() => setShowSidebar(false)}
                primaryColor={primaryColor}
                onColorChange={onColorChange}
            />
        </div>
    );
};

export default TypingTest;