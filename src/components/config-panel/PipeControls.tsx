
import React from 'react';
import { PartParameter } from '@/hooks/useMockGraphQL';
import ParameterSlider from './ParameterSlider';
import CollapsibleSection from './CollapsibleSection';

interface PipeControlsProps {
  parameters: PartParameter[];
  onParameterChange: (id: string, value: number) => void;
}

const PipeControls: React.FC<PipeControlsProps> = ({ parameters, onParameterChange }) => {
  // Group parameters by category
  const basicParams = ['length', 'radius', 'thickness'];
  const advancedParams = ['segments', 'bevelSize', 'taper'];
  
  const basicParameters = parameters.filter(p => basicParams.includes(p.id));
  const advancedParameters = parameters.filter(p => advancedParams.includes(p.id));
  
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

export default PipeControls;
