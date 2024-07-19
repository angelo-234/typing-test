import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Settings from './components/Settings';
import TypingTest from './components/TypingTest';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mode, setMode] = useState<'time' | 'words'>('time');
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    if (mode === 'words' && duration === 30) {
      setDuration(50);
    } else if (mode === 'time' && duration === 50) {
      setDuration(30);
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        <Settings
          mode={mode}
          duration={duration}
          onModeChange={setMode}
          onDurationChange={setDuration}
        />
        <TypingTest mode={mode} duration={duration} />
      </main>
      <Footer />
    </div>
  );
};

export default App;