import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  onColorChange: (color: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, primaryColor, onColorChange }) => {
  const colors = ['#637AB7', '#FF5733', '#33FF57', '#5733FF', '#FF33F5'];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-background text-text p-4 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-2xl">&times;</button>
      <h2 className="text-xl mb-4">Settings</h2>
      <div>
        <h3 className="mb-2">Primary Color</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => onColorChange(color)}
              className={`w-8 h-8 rounded-full ${
                color === primaryColor ? 'ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: color }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;