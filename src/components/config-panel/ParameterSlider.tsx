
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PartParameter } from '@/hooks/useMockGraphQL';

interface ParameterSliderProps {
  parameter: PartParameter;
  onParameterChange: (id: string, value: number) => void;
}

const ParameterSlider: React.FC<ParameterSliderProps> = ({ parameter, onParameterChange }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <Label htmlFor={parameter.id} className="text-sm font-medium">
          {parameter.name}
        </Label>
        <span className="text-sm font-mono text-mechanical-gray">
          {parameter.value.toFixed(1)}
        </span>
      </div>
      <Slider
        id={parameter.id}
        min={parameter.min}
        max={parameter.max}
        step={parameter.step}
        value={[parameter.value]}
        onValueChange={(values) => onParameterChange(parameter.id, values[0])}
        className="mt-2"
        aria-label={parameter.name}
      />
    </div>
  );
};

export default ParameterSlider;
