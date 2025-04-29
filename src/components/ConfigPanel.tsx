
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { PartParameter, Material } from '@/hooks/useMockGraphQL';

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
        return parameters.filter(p => ['teeth', 'radius', 'thickness', 'hole'].includes(p.id));
      case 'pipe':
        return parameters.filter(p => ['length', 'radius', 'thickness'].includes(p.id));
      case 'spring':
        return parameters.filter(p => ['radius', 'thickness', 'coils', 'height'].includes(p.id));
      case 'bolt':
        return parameters.filter(p => ['headRadius', 'shaftRadius', 'length'].includes(p.id));
      case 'nut':
        return parameters.filter(p => ['radius', 'height', 'holeRadius'].includes(p.id));
      default:
        return [];
    }
  };

  const partTitle = selectedPart.charAt(0).toUpperCase() + selectedPart.slice(1);
  
  // Determine if the current part supports auto-rotation
  // Currently all parts except 'nut' support auto-rotation
  const supportsAutoRotation = selectedPart !== 'nut';

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

              <div>
                <h3 className="text-lg font-medium mb-4">Dimensions</h3>
                {getPartParameters().map((param) => (
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
                ))}
              </div>

              <div>
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
