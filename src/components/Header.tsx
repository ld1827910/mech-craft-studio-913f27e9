
import React from 'react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-mechanical-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m14.5 9.5-5 5" />
            <path d="m9.5 9.5 5 5" />
          </svg>
          <h1 className="font-bold text-xl md:text-2xl tracking-tight">MechCraft Studio</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
