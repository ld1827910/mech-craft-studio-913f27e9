
import React from 'react';
import { PartParameter } from '@/hooks/useMockGraphQL';
import ParameterSlider from './ParameterSlider';

interface GearControlsProps {
  parameters: PartParameter[];
  onParameterChange: (id: string, value: number) => void;
}

const GearControls: React.FC<GearControlsProps> = ({ parameters, onParameterChange }) => {
  // Group parameters by category
  const basicParams = ['teeth', 'radius', 'thickness', 'hole'];
  const advancedParams = ['toothDepthRatio', 'toothWidth', 'bevelSize'];
  
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

export default GearControls;
