import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 text-text-secondary">
      <div className="text-text-primary font-bold text-xl">monkeytype</div>
      <div className="flex space-x-4">
        <button className="hover:text-text-primary">☰</button>
        <button className="hover:text-text-primary">👤</button>
      </div>
    </header>
  );
};

export default Header;