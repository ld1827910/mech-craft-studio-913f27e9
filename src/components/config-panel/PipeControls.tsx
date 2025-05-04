
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
  
  const usedParameterIds = new Set();
  
  // Get basic parameters first
  const basicParameters = parameters.filter(p => {
    if (basicParams.includes(p.id) && !usedParameterIds.has(p.id)) {
      usedParameterIds.add(p.id);
      return true;
    }
    return false;
  });
  
  // Then get advanced parameters that weren't already included in basic
  const advancedParameters = parameters.filter(p => {
    if (advancedParams.includes(p.id) && !usedParameterIds.has(p.id)) {
      usedParameterIds.add(p.id);
      return true;
    }
    return false;
  });
  
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
