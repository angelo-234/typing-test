import React, { useState, useEffect, useCallback } from 'react';
import { getComplementaryColor } from './utils/colorUtils';
import Header from './components/Header';
import Settings from './components/Settings';
import TypingTest from './components/TypingTest';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mode, setMode] = useState<'time' | 'words'>('time');
  const [duration, setDuration] = useState(30);
  const [primaryColor, setPrimaryColor] = useState('#637AB7');
  const [errorColor, setErrorColor] = useState('#ca4754');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    //document.documentElement.style.setProperty('--error-color', errorColor);
  }, []); 

  const handleColorChange = (color: string) => {
    setPrimaryColor(color);
    document.documentElement.style.setProperty('--primary-color', color);
    //const errorColor = getComplementaryColor(color);
    //document.documentElement.style.setProperty('--error-color', errorColor);
  };

  useEffect(() => {
    if (mode === 'words' && duration === 30) {
      setDuration(50);
    } else if (mode === 'time' && duration === 50) {
      setDuration(30);
    }
  }, [mode]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.contains(event.target as Node) && showSidebar) {
      setShowSidebar(false);
    }
  }, [showSidebar]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);


  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 flex flex-col">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className="flex-grow flex flex-col items-center justify-center">
        <TypingTest
          mode={mode}
          duration={duration}
          onModeChange={setMode}
          onDurationChange={setDuration}
          primaryColor={primaryColor}
          onColorChange={handleColorChange}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;