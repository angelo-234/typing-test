import React from 'react';
import Word from './Word';

interface TextDisplayProps {
  text: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  typedText: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, currentWordIndex, currentCharIndex, typedText }) => {
  return (
    <div className="text-2xl mb-8 text-left relative h-40 overflow-hidden">
      <div className="flex flex-wrap">
        {text.map((word, index) => (
          <Word
            key={index}
            word={word}
            isActive={index === currentWordIndex}
            isCompleted={index < currentWordIndex}
            typedText={index === currentWordIndex ? typedText : ''}
            cursorPosition={index === currentWordIndex ? currentCharIndex : -1}
          />
        ))}
      </div>
    </div>
  );
};

export default TextDisplay;