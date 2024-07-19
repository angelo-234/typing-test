import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-text-secondary text-sm p-4 flex justify-center space-x-4">
      <a href="#" className="hover:text-text-primary">github</a>
      <a href="#" className="hover:text-text-primary">discord</a>
      <a href="#" className="hover:text-text-primary">twitter</a>
      <a href="#" className="hover:text-text-primary">privacy</a>
    </footer>
  );
};

export default Footer;