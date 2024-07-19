import React from 'react';

interface TypingInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const TypingInput: React.FC<TypingInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className="w-full bg-transparent border-none text-transparent text-2xl outline-none text-center mt-4 caret-primary"
      autoFocus
    />
  );
};

export default TypingInput;