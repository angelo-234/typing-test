import React from 'react';

interface HeaderProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ showSidebar, setShowSidebar }) => {
  return (
    <header className="flex justify-between items-center p-4 text-text-secondary">
      <div className="text-text-primary font-bold text-xl">angietype</div>
      <div className="flex space-x-4">
        <button 
          className="hover:text-text-primary"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          ☰
        </button>
        <button className="hover:text-text-primary">👤</button>
      </div>
    </header>
  );
};

export default Header;