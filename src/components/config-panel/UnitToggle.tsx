
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useUnits } from '@/hooks/useUnits';

const UnitToggle: React.FC = () => {
  const { unitSystem, toggleUnitSystem } = useUnits();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium">Units:</span>
      <ToggleGroup 
        type="single" 
        value={unitSystem}
        onValueChange={(value) => {
          if (value === 'metric' || value === 'imperial') {
            toggleUnitSystem();
          }
        }}
        className="border rounded-md"
      >
        <ToggleGroupItem 
          value="metric" 
          size="sm" 
          className="text-xs px-2 py-1 h-auto"
        >
          mm
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="imperial" 
          size="sm" 
          className="text-xs px-2 py-1 h-auto"
        >
          in
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default UnitToggle;
