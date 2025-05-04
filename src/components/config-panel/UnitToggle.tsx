
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useUnits } from '@/hooks/useUnits';
import { Ruler } from 'lucide-react';

const UnitToggle: React.FC = () => {
  const { unitSystem, toggleUnitSystem } = useUnits();

  return (
    <div className="flex items-center gap-2">
      <Ruler className="h-4 w-4 text-muted-foreground" />
      <ToggleGroup 
        type="single" 
        value={unitSystem}
        onValueChange={(value) => {
          if (value) {
            toggleUnitSystem();
          }
        }}
        className="border rounded-md bg-background shadow-sm smooth-transition"
      >
        <ToggleGroupItem 
          value="metric" 
          size="sm" 
          className="text-xs px-3 py-1.5 h-auto data-[state=on]:bg-primary data-[state=on]:text-primary-foreground smooth-transition"
        >
          mm
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="imperial" 
          size="sm" 
          className="text-xs px-3 py-1.5 h-auto data-[state=on]:bg-primary data-[state=on]:text-primary-foreground smooth-transition"
        >
          in
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default UnitToggle;
