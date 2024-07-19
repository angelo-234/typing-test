import React from 'react';

interface WordProps {
  word: string;
  isActive: boolean;
  isCompleted: boolean;
  typedText: string;
  cursorPosition: number;
}

const Word: React.FC<WordProps> = ({ word, isActive, isCompleted, typedText, cursorPosition }) => {
  return (
    <span className={`mr-2 mb-2 inline-block ${isActive ? 'text-text' : ''} ${isCompleted ? 'text-text-inactive' : ''}`}>
      {word.split('').map((char, index) => {
        let charClass = '';
        if (isActive && index < typedText.length) {
          charClass = typedText[index] === char ? 'text-primary' : 'text-error';
        }
        return (
          <span key={index} className={`relative ${charClass}`}>
            {char}
            {isActive && index === cursorPosition && (
              <span className="absolute left-0 top-0 h-full w-0.5 bg-primary animate-pulse"></span>
            )}
          </span>
        );
      })}
      {isActive && cursorPosition === word.length && (
        <span className="relative">
          <span className="absolute left-0 top-0 h-full w-0.5 bg-primary animate-pulse"></span>
        </span>
      )}
    </span>
  );
};

export default Word;