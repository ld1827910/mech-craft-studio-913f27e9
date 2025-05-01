
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AutoRotateToggleProps {
  autoRotate: boolean;
  onAutoRotateChange?: (enabled: boolean) => void;
}

const AutoRotateToggle: React.FC<AutoRotateToggleProps> = ({ autoRotate, onAutoRotateChange }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <Label htmlFor="auto-rotate" className="text-sm font-medium">
        Auto Rotation
      </Label>
      <Switch
        id="auto-rotate"
        checked={autoRotate}
        onCheckedChange={onAutoRotateChange}
      />
    </div>
  );
};

export default AutoRotateToggle;
