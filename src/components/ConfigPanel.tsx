import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PartParameter, Material } from '@/hooks/useMockGraphQL';
import { Hexagon, Circle, Circle as CircleIcon } from 'lucide-react';

interface ConfigPanelProps {
  parameters: PartParameter[];
  materials: Material[];
  selectedMaterial: Material;
  selectedPart: string;
  onParameterChange: (id: string, value: number) => void;
  onMaterialChange: (material: Material) => void;
  isLoading?: boolean;
  autoRotate?: boolean;
  onAutoRotateChange?: (enabled: boolean) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  parameters,
  materials,
  selectedMaterial,
  selectedPart,
  onParameterChange,
  onMaterialChange,
  isLoading = false,
  autoRotate = false,
  onAutoRotateChange,
}) => {
  const getPartParameters = () => {
    switch(selectedPart) {
      case 'gear':
        return parameters.filter(p => ['teeth', 'radius', 'thickness', 'hole', 
                                      'toothDepthRatio', 'toothWidth', 'bevelSize'].includes(p.id));
      case 'pipe':
        return parameters.filter(p => ['length', 'radius', 'thickness', 
                                      'segments', 'bevelSize', 'taper'].includes(p.id));
      case 'spring':
        return parameters.filter(p => ['radius', 'thickness', 'coils', 'height', 'tension', 
                                      'resolution', 'waveAmplitude', 'radialSegments', 'taper'].includes(p.id));
      case 'bolt':
        return parameters.filter(p => ['headRadius', 'shaftRadius', 'length', 'headHeight', 
                                      'threadDepth', 'threadPitch', 'threadSegments', 'headType', 
                                      'countersink'].includes(p.id));
      case 'nut':
        return parameters.filter(p => ['radius', 'height', 'holeRadius', 'chamferSize', 
                                      'sides', 'texture'].includes(p.id));
      default:
        return [];
    }
  };

  const partTitle = selectedPart.charAt(0).toUpperCase() + selectedPart.slice(1);
  
  // Determine if the current part supports auto-rotation
  // All parts now support auto-rotation
  const supportsAutoRotation = true;

  // Group parameters by category
  const groupParameters = (params: PartParameter[]) => {
    // Basic dimensions first
    const basicParams = [
      'radius', 'thickness', 'length', 'height', 'hole', 'teeth', 'coils', 
      'headRadius', 'shaftRadius', 'holeRadius', 'headHeight', 'sides'
    ];
    
    const advancedParams = [
      'toothDepthRatio', 'toothWidth', 'bevelSize', 'segments', 'taper', 
      'tension', 'resolution', 'waveAmplitude', 'radialSegments',
      'threadDepth', 'threadPitch', 'threadSegments', 'headType', 
      'countersink', 'chamferSize', 'texture'
    ];
    
    const basic = params.filter(p => basicParams.includes(p.id));
    const advanced = params.filter(p => advancedParams.includes(p.id));
    
    return { basic, advanced };
  };

  const { basic, advanced } = groupParameters(getPartParameters());

  // Create specialized controls for certain parameter types
  const renderSpecializedControl = (param: PartParameter) => {
    // Head type toggle for bolt
    if (param.id === 'headType') {
      const headType = param.value;
      return (
        <div className="mb-6">
          <Label className="text-sm font-medium mb-2 block">Head Type</Label>
          <ToggleGroup 
            type="single" 
            value={headType.toString()} 
            onValueChange={(value) => {
              if (value) onParameterChange(param.id, parseInt(value, 10));
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="0" aria-label="Hex Head">
              <Hexagon className="h-4 w-4 mr-1" />
              <span>Hex</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="1" aria-label="Socket Head">
              <CircleIcon className="h-4 w-4 mr-1" />
              <span>Socket</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="2" aria-label="Button Head">
              <Circle className="h-4 w-4 mr-1" />
              <span>Button</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      );
    }
    
    // Sides toggle for nut
    if (param.id === 'sides') {
      const sides = param.value;
      return (
        <div className="mb-6">
          <Label className="text-sm font-medium mb-2 block">Sides</Label>
          <ToggleGroup 
            type="single" 
            value={sides.toString()} 
            onValueChange={(value) => {
              if (value) onParameterChange(param.id, parseInt(value, 10));
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
      );
    }
    
    // Default slider control
    return (
      <div key={param.id} className="mb-6">
        <div className="flex justify-between mb-2">
          <Label htmlFor={param.id} className="text-sm font-medium">
            {param.name}
          </Label>
          <span className="text-sm font-mono text-mechanical-gray">
            {param.value.toFixed(1)}
          </span>
        </div>
        <Slider
          id={param.id}
          min={param.min}
          max={param.max}
          step={param.step}
          value={[param.value]}
          onValueChange={(values) => onParameterChange(param.id, values[0])}
          className="mt-2"
          aria-label={param.name}
        />
      </div>
    );
  };

  return (
    <Card className="w-full h-full overflow-auto">
      <CardHeader className="bg-mechanical-blue text-white">
        <CardTitle className="text-xl">{partTitle} Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {supportsAutoRotation && (
                <div className="flex items-center justify-between py-2 border-b">
                  <Label htmlFor="auto-rotate" className="text-sm font-medium">
                    Auto Rotation
                  </Label>
                  <Switch
                    id="auto-rotate"
                    checked={autoRotate}
                    onCheckedChange={onAutoRotateChange}
                  />
                </div>
              )}

              <div className='mt-6'>
                <h3 className="text-lg font-medium mb-4">Basic Dimensions</h3>
                {basic.map((param) => renderSpecializedControl(param))}              
              </div>

              {advanced.length > 0 && (
                <div className='mt-6 pt-4 border-t'>
                  <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                  {advanced.map((param) => renderSpecializedControl(param))}              
                </div>
              )}

              <div className='mt-6 pt-4 border-t'>
                <h3 className="text-lg font-medium mb-4">Material</h3>
                <div className="grid grid-cols-2 gap-3">
                  {materials.map((material) => (
                    <button
                      key={material.id}
                      onClick={() => onMaterialChange(material)}
                      className={`p-3 rounded border-2 transition-all ${
                        selectedMaterial.id === material.id
                          ? 'border-mechanical-blue bg-mechanical-lightblue/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      aria-pressed={selectedMaterial.id === material.id}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-6 h-6 rounded-full mr-2"
                          style={{ backgroundColor: material.color }}
                          aria-hidden="true"
                        ></div>
                        <span>{material.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t">
              <button
                className="w-full bg-mechanical-blue hover:bg-mechanical-darkblue text-white py-3 rounded font-medium transition-colors"
              >
                Export Configuration
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
