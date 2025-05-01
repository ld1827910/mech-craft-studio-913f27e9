
import React from 'react';
import { PartParameter } from '@/hooks/useMockGraphQL';
import ParameterSlider from './ParameterSlider';

interface SpringControlsProps {
  parameters: PartParameter[];
  onParameterChange: (id: string, value: number) => void;
}

const SpringControls: React.FC<SpringControlsProps> = ({ parameters, onParameterChange }) => {
  // Group parameters by category
  const basicParams = ['radius', 'thickness', 'coils', 'height'];
  const advancedParams = ['tension', 'resolution', 'waveAmplitude', 'radialSegments', 'taper'];
  
  const basicParameters = parameters.filter(p => basicParams.includes(p.id));
  const advancedParameters = parameters.filter(p => advancedParams.includes(p.id));
  
  return (
    <>
      <div className='mt-6'>
        <h3 className="text-lg font-medium mb-4">Basic Dimensions</h3>
        {basicParameters.map(param => (
          <ParameterSlider key={param.id} parameter={param} onParameterChange={onParameterChange} />
        ))}
      </div>
      
      {advancedParameters.length > 0 && (
        <div className='mt-6 pt-4 border-t'>
          <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
          {advancedParameters.map(param => (
            <ParameterSlider key={param.id} parameter={param} onParameterChange={onParameterChange} />
          ))}
        </div>
      )}
    </>
  );
};

export default SpringControls;
