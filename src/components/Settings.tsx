import React from 'react';

interface SettingsProps {
  mode: 'time' | 'words';
  duration: number;
  onModeChange: (mode: 'time' | 'words') => void;
  onDurationChange: (duration: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ mode, duration, onModeChange, onDurationChange }) => {
  return (
    <div className="mb-8 flex justify-center items-center space-x-4 text-xl">
      <div className="flex space-x-4">
        <button
          onClick={() => onModeChange('time')}
          className={`px-4 py-2 rounded ${mode === 'time' ? 'bg-primary text-background' : 'text-text-inactive'}`}
        >
          time
        </button>
        <button
          onClick={() => onModeChange('words')}
          className={`px-4 py-2 rounded ${mode === 'words' ? 'bg-primary text-background' : 'text-text-inactive'}`}
        >
          words
        </button>
      </div>
      <div className="text-primary font-bold">|</div>
      <div className="flex space-x-4">
        {mode === 'time' && (
          <>
            {[15, 30, 60, 120].map((seconds) => (
              <button
                key={seconds}
                onClick={() => onDurationChange(seconds)}
                className={`px-4 py-2 rounded ${duration === seconds ? 'bg-primary text-background' : 'text-text-inactive'}`}
              >
                {seconds}
              </button>
            ))}
          </>
        )}
        {mode === 'words' && (
          <>
            {[10, 25, 50, 100].map((words) => (
              <button
                key={words}
                onClick={() => onDurationChange(words)}
                className={`px-4 py-2 rounded ${duration === words ? 'bg-primary text-background' : 'text-text-inactive'}`}
              >
                {words}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;