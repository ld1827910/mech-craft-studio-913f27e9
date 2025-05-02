
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Save, Printer } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  const handleExport = (format: string) => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      
      toast({
        title: "Export Complete",
        description: `Your design has been exported as ${format}`,
        duration: 3000,
      });
    }, 1000);
  };
  
  const handleSaveConfiguration = () => {
    toast({
      title: "Configuration Saved",
      description: "Your current settings have been saved",
      duration: 3000,
    });
  };
  
  const handleRequestQuote = () => {
    toast({
      title: "Quote Requested",
      description: "We'll contact you shortly with manufacturing details",
      duration: 3000,
    });
  };
  
  return (
    <div className="mt-8 pt-4 border-t flex flex-col gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            className="w-full bg-mechanical-blue hover:bg-mechanical-darkblue" 
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Design
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => handleExport('STL')} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            <span>STL for 3D Printing</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('STEP')} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            <span>STEP for CAD</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport('OBJ')} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            <span>OBJ Format</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSaveConfiguration} className="cursor-pointer">
            <Save className="mr-2 h-4 w-4" />
            <span>Save Configuration</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Design</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
            <Printer className="mr-2 h-4 w-4" />
            <span>Print Specifications</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="outline"
        className="w-full border-mechanical-blue text-mechanical-blue"
        onClick={handleRequestQuote}
      >
        Request Manufacturing Quote
      </Button>
    </div>
  );
};

export default ExportButton;
