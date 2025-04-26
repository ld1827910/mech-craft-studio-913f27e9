
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
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:bg-mechanical-darkblue">About</Button>
          <Button variant="ghost" className="text-white hover:bg-mechanical-darkblue">Features</Button>
          <Button variant="ghost" className="text-white hover:bg-mechanical-darkblue">Support</Button>
          <Button className="bg-white text-mechanical-blue hover:bg-mechanical-lightgray">Get Started</Button>
        </div>
        <Button className="md:hidden bg-transparent hover:bg-mechanical-darkblue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default Header;
