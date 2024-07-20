import { useState, useEffect, useCallback } from 'react';
import { generateText } from '../utils/textGenerator';
import { calculateWPM, calculateAccuracy } from '../utils/calculateStats';

export const useTypingTest = (mode: 'time' | 'words', duration: number) => {
  const [text, setText] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mode === 'time' ? duration : 0);
  const [wordCount, setWordCount] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [wordsLeft, setWordsLeft] = useState(mode === 'words' ? duration : 0);
  const [timerStarted, setTimerStarted] = useState(false);

  const startTest = useCallback(() => {
    const newText = generateText(mode === 'words' ? duration : 45);
    setText(newText);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setInputValue('');
    setStartTime(Date.now());
    setEndTime(null);
    setIsFinished(false);
    setTimeLeft(mode === 'time' ? duration : 0);
    setWordCount(0);
    setCorrectChars(0);
    setTotalChars(0);
    setTypedText('');
    setWordsLeft(mode === 'words' ? duration : 0);
    setTimerStarted(false);
  }, [mode, duration]);

  const restartTest = () => {
    startTest();
  };

  const nextTest = () => {
    startTest();
  };

  const handleInputChange = (value: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    if (!timerStarted) {
        setTimerStarted(true);
        setStartTime(Date.now());
      }
    setInputValue(value);
    setTypedText(value);
    setCurrentCharIndex(value.length);
    const currentWord = text[currentWordIndex];
    setTotalChars((prev) => prev + 1);
    if (value[value.length - 1] === currentWord[value.length - 1]) {
      setCorrectChars((prev) => prev + 1);
    }
  };
  
    const handleInputSubmit = () => {
        const currentWord = text[currentWordIndex];
        if (inputValue.trim() === currentWord) {
        const newWordIndex = currentWordIndex + 1;
        setCurrentWordIndex(newWordIndex);
        setCurrentCharIndex(0);
        setInputValue('');
        setTypedText('');
        setWordCount((prev) => prev + 1);
        if (mode === 'words') {
            const newWordsLeft = wordsLeft - 1;
            setWordsLeft(newWordsLeft);
            if (newWordsLeft <= 0 || newWordIndex >= text.length) {
            setIsFinished(true);
            setEndTime(Date.now());
            }
        } else if (newWordIndex >= text.length) {
            setIsFinished(true);
            setEndTime(Date.now());
        }
        }
    };

    useEffect(() => {
        if (timerStarted && !isFinished) {
          const timer = setInterval(() => {
            if (mode === 'time') {
              setTimeLeft((prev) => {
                if (prev <= 0) {
                  clearInterval(timer);
                  setIsFinished(true);
                  setEndTime(Date.now());
                  return 0;
                }
                return prev - 1;
              });
            } else if (mode === 'words') {
              if (wordsLeft <= 0) {
                clearInterval(timer);
                setIsFinished(true);
                setEndTime(Date.now());
              }
            }
          }, 1000);
          return () => clearInterval(timer);
        }
      }, [timerStarted, isFinished, mode, wordsLeft]);

  const wpm = calculateWPM(wordCount, startTime, endTime);
  const accuracy = calculateAccuracy(correctChars, totalChars);

  return {
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
  };
};