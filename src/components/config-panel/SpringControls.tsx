
import React from 'react';
import { PartParameter } from '@/hooks/useMockGraphQL';
import ParameterSlider from './ParameterSlider';
import CollapsibleSection from './CollapsibleSection';

interface SpringControlsProps {
  parameters: PartParameter[];
  onParameterChange: (id: string, value: number) => void;
}

const SpringControls: React.FC<SpringControlsProps> = ({ parameters, onParameterChange }) => {
  // Update: Fixed parameter grouping to prevent duplicates
  const basicParams = ['radius', 'thickness', 'coils', 'height'];
  const advancedParams = ['tension', 'resolution', 'waveAmplitude', 'radialSegments', 'taper'];
  
  // Filter parameters to prevent duplicates using ID as the key
  const basicParameters = parameters.filter(p => basicParams.includes(p.id));
  const advancedParameters = parameters.filter(p => advancedParams.includes(p.id) && !basicParams.includes(p.id));
  
  return (
    <div className="mt-4 space-y-2">
      <CollapsibleSection title="Basic Dimensions" defaultOpen={true}>
        {basicParameters.map(param => (
          <ParameterSlider key={param.id} parameter={param} onParameterChange={onParameterChange} />
        ))}
      </CollapsibleSection>
      
      {advancedParameters.length > 0 && (
        <CollapsibleSection title="Advanced Settings" defaultOpen={false}>
          {advancedParameters.map(param => (
            <ParameterSlider key={param.id} parameter={param} onParameterChange={onParameterChange} />
          ))}
        </CollapsibleSection>
      )}
    </div>
  );
};

export default SpringControls;
