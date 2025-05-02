
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PartParameter } from '@/hooks/useMockGraphQL';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface ParameterSliderProps {
  parameter: PartParameter;
  onParameterChange: (id: string, value: number) => void;
}

const ParameterSlider: React.FC<ParameterSliderProps> = ({ parameter, onParameterChange }) => {
  // Helper function to get description for parameters
  const getParameterDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      // Gear parameters
      teeth: "Number of teeth around the gear's circumference",
      radius: "Distance from the center to the outer edge",
      thickness: "Thickness of the component (z-axis)",
      hole: "Size of the center mounting hole",
      toothDepthRatio: "Ratio of tooth depth to gear radius",
      toothWidth: "Width of each individual tooth",
      bevelSize: "Size of the edge bevel or chamfer",
      
      // Pipe parameters
      length: "Overall length of the pipe",
      segments: "Number of segments around the circumference (higher = smoother)",
      taper: "Tapering effect applied to the pipe (negative values create inverse taper)",
      
      // Spring parameters
      coils: "Number of complete coils in the spring",
      height: "Overall height of the spring",
      tension: "Compression/extension of the spring",
      resolution: "Resolution of the spring curve (higher = smoother)",
      waveAmplitude: "Amplitude of wave pattern on the spring surface",
      radialSegments: "Number of segments around the spring wire",
      
      // Bolt parameters
      headRadius: "Radius of the bolt head",
      shaftRadius: "Radius of the bolt shaft",
      headHeight: "Height of the bolt head",
      threadDepth: "Depth of the thread pattern",
      threadPitch: "Distance between thread peaks",
      threadSegments: "Number of thread segments (higher = smoother)",
      headType: "Style of the bolt head (hex, socket, etc.)",
      countersink: "Amount of countersinking on socket heads",
      
      // Nut parameters
      sides: "Number of sides (4=square, 6=hex, 8=octagonal)",
      holeRadius: "Radius of the center hole",
      chamferSize: "Size of the edge chamfer",
      texture: "Surface texture roughness"
    };
    
    return descriptions[id] || "Adjust parameter value";
  };
  
  // Calculate percentage for the progress bar
  const valuePercentage = ((parameter.value - parameter.min) / (parameter.max - parameter.min)) * 100;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-1">
          <Label htmlFor={parameter.id} className="text-sm font-medium">
            {parameter.name}
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <HelpCircle className="h-4 w-4 text-mechanical-lightblue cursor-help" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p>{getParameterDescription(parameter.id)}</p>
              <div className="mt-1 text-xs text-mechanical-lightgray">
                Range: {parameter.min} - {parameter.max}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-mechanical-blue/10 rounded text-sm font-mono text-mechanical-blue">
            {parameter.value.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="relative mt-1">
        <div className="absolute inset-0 h-2 bg-mechanical-lightgray/20 rounded-full" />
        <div 
          className="absolute inset-y-0 left-0 h-2 bg-mechanical-blue/30 rounded-full" 
          style={{ width: `${valuePercentage}%` }}
        />
        <Slider
          id={parameter.id}
          min={parameter.min}
          max={parameter.max}
          step={parameter.step}
          value={[parameter.value]}
          onValueChange={(values) => onParameterChange(parameter.id, values[0])}
          aria-label={parameter.name}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-mechanical-gray">{parameter.min}</span>
        <span className="text-xs text-mechanical-gray">{parameter.max}</span>
      </div>
    </div>
  );
};

export default ParameterSlider;
