
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, BookOpen, Moon, Sun, Github, Database, Zap } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-gradient-to-r from-mechanical-darkblue to-mechanical-blue text-white shadow-md sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center space-x-3">
          <div className="bg-white rounded-full p-1.5 shadow-lg">
            <svg className="h-7 w-7 text-mechanical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 1 0 0-11zM5 12a7 7 0 1 1 14 0 7 7 0 0 1-14 0z"></path>
              <path d="M12 9v3l1.5 1.5"></path>
              <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl md:text-2xl tracking-tight">MechCraft Studio</h1>
            <p className="text-xs text-white/80 hidden md:block">Professional Mechanical Part Designer</p>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="hidden md:flex items-center mr-2">
            <a href="#" className="text-sm text-white/90 hover:text-white px-3 py-2 rounded-md transition-colors">Documentation</a>
            <a href="#" className="text-sm text-white/90 hover:text-white px-3 py-2 rounded-md transition-colors">Examples</a>
            <a href="#" className="text-sm text-white/90 hover:text-white px-3 py-2 rounded-md transition-colors">API</a>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share design</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View source</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Feature announcement banner */}
      <div className="bg-white/10 backdrop-blur-sm text-center py-1.5 px-4 text-xs md:text-sm border-t border-white/10">
        <span className="inline-flex items-center">
          <Zap className="h-3.5 w-3.5 mr-1.5 animate-pulse-light" />
          <span>New: Advanced Animation Simulation Tools Available!</span>
          <Button variant="link" size="sm" className="text-white/90 hover:text-white underline ml-2 p-0 h-auto">
            Try Now
          </Button>
        </span>
      </div>
    </header>
  );
};

export default Header;
