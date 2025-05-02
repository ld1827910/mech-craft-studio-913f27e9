
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const ExportButton: React.FC = () => {
  return (
    <div className="mt-8 pt-4 border-t">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="w-full bg-mechanical-blue hover:bg-mechanical-darkblue text-white py-3 rounded font-medium transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">Export Configuration</span>
            <div className="absolute inset-0 bg-mechanical-darkblue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Download your configuration as a file</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ExportButton;
