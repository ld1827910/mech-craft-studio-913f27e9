
import React from 'react';
import { PartParameter } from '@/hooks/useMockGraphQL';
import ParameterSlider from './ParameterSlider';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Hexagon, Circle } from 'lucide-react';

interface BoltControlsProps {
  parameters: PartParameter[];
  onParameterChange: (id: string, value: number) => void;
}

const BoltControls: React.FC<BoltControlsProps> = ({ parameters, onParameterChange }) => {
  // Find parameters with specific IDs
  const headRadiusParam = parameters.find(p => p.id === 'headRadius');
  const shaftRadiusParam = parameters.find(p => p.id === 'shaftRadius');
  const lengthParam = parameters.find(p => p.id === 'length');
  const headHeightParam = parameters.find(p => p.id === 'headHeight');
  const headTypeParam = parameters.find(p => p.id === 'headType');
  
  // Advanced parameters
  const threadDepthParam = parameters.find(p => p.id === 'threadDepth');
  const threadPitchParam = parameters.find(p => p.id === 'threadPitch');
  const threadSegmentsParam = parameters.find(p => p.id === 'threadSegments');
  const countersinkParam = parameters.find(p => p.id === 'countersink');
  
  return (
    <>
      <div className='mt-6'>
        <h3 className="text-lg font-medium mb-4">Basic Dimensions</h3>
        
        {headRadiusParam && <ParameterSlider parameter={headRadiusParam} onParameterChange={onParameterChange} />}
        {shaftRadiusParam && <ParameterSlider parameter={shaftRadiusParam} onParameterChange={onParameterChange} />}
        {lengthParam && <ParameterSlider parameter={lengthParam} onParameterChange={onParameterChange} />}
        {headHeightParam && <ParameterSlider parameter={headHeightParam} onParameterChange={onParameterChange} />}
        
        {headTypeParam && (
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">Head Type</Label>
            <ToggleGroup 
              type="single" 
              value={headTypeParam.value.toString()} 
              onValueChange={(value) => {
                if (value) onParameterChange(headTypeParam.id, parseInt(value, 10));
              }}
              className="justify-start"
            >
              <ToggleGroupItem value="0" aria-label="Hex Head">
                <Hexagon className="h-4 w-4 mr-1" />
                <span>Hex</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="1" aria-label="Socket Head">
                <Circle className="h-4 w-4 mr-1" />
                <span>Socket</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="2" aria-label="Button Head">
                <Circle className="h-4 w-4 mr-1" />
                <span>Button</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}
      </div>
      
      <div className='mt-6 pt-4 border-t'>
        <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
        {threadDepthParam && <ParameterSlider parameter={threadDepthParam} onParameterChange={onParameterChange} />}
        {threadPitchParam && <ParameterSlider parameter={threadPitchParam} onParameterChange={onParameterChange} />}
        {threadSegmentsParam && <ParameterSlider parameter={threadSegmentsParam} onParameterChange={onParameterChange} />}
        {countersinkParam && <ParameterSlider parameter={countersinkParam} onParameterChange={onParameterChange} />}
      </div>
    </>
  );
};

export default BoltControls;
