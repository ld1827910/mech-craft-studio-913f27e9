
import React from 'react';
import { PartParameter } from '@/hooks/useMockGraphQL';
import ParameterSlider from './ParameterSlider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import CollapsibleSection from './CollapsibleSection';

interface NutControlsProps {
  parameters: PartParameter[];
  onParameterChange: (id: string, value: number) => void;
}

const NutControls: React.FC<NutControlsProps> = ({ parameters, onParameterChange }) => {
  // Find parameters with specific IDs
  const radiusParam = parameters.find(p => p.id === 'radius');
  const heightParam = parameters.find(p => p.id === 'height');
  const holeRadiusParam = parameters.find(p => p.id === 'holeRadius');
  const chamferSizeParam = parameters.find(p => p.id === 'chamferSize');
  const sidesParam = parameters.find(p => p.id === 'sides');
  const textureParam = parameters.find(p => p.id === 'texture');
  
  return (
    <div className="mt-4 space-y-2">
      <CollapsibleSection title="Basic Dimensions" defaultOpen={true}>
        {radiusParam && <ParameterSlider parameter={radiusParam} onParameterChange={onParameterChange} />}
        {heightParam && <ParameterSlider parameter={heightParam} onParameterChange={onParameterChange} />}
        {holeRadiusParam && <ParameterSlider parameter={holeRadiusParam} onParameterChange={onParameterChange} />}
        
        {sidesParam && (
          <div className="mb-4">
            <Label className="text-sm font-medium mb-2 block">Sides</Label>
            <ToggleGroup 
              type="single" 
              value={sidesParam.value.toString()} 
              onValueChange={(value) => {
                if (value) onParameterChange(sidesParam.id, parseInt(value, 10));
              }}
              className="justify-start"
            >
              <ToggleGroupItem value="4" aria-label="Square Nut">
                <span>4</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="6" aria-label="Hex Nut">
                <span>6</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="8" aria-label="Octagonal Nut">
                <span>8</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </CollapsibleSection>
      
      <CollapsibleSection title="Advanced Settings" defaultOpen={false}>
        {chamferSizeParam && <ParameterSlider parameter={chamferSizeParam} onParameterChange={onParameterChange} />}
        {textureParam && <ParameterSlider parameter={textureParam} onParameterChange={onParameterChange} />}
      </CollapsibleSection>
    </div>
  );
};

export default NutControls;
