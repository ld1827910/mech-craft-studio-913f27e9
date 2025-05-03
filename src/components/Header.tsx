
import React from 'react';
import { Button } from '@/components/ui/button';
import { Cog } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-mechanical-darkblue to-mechanical-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1.5">
            <Cog className="h-6 w-6 text-mechanical-blue" />
          </div>
          <h1 className="font-bold text-xl md:text-2xl tracking-tight">MechCraft Studio</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
