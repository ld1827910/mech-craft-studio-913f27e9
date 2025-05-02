
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface AutoRotateToggleProps {
  autoRotate: boolean;
  onAutoRotateChange?: (enabled: boolean) => void;
}

const AutoRotateToggle: React.FC<AutoRotateToggleProps> = ({ autoRotate, onAutoRotateChange }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center gap-1">
        <Label htmlFor="auto-rotate" className="text-sm font-medium">
          Auto Rotation
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <HelpCircle className="h-4 w-4 text-mechanical-lightblue cursor-help" />
            </span>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Enable automatic rotation of the 3D model</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Switch
        id="auto-rotate"
        checked={autoRotate}
        onCheckedChange={onAutoRotateChange}
      />
    </div>
  );
};

export default AutoRotateToggle;
