
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PartParameter, Material } from '@/hooks/useMockGraphQL';
import AutoRotateToggle from './config-panel/AutoRotateToggle';
import MaterialSelector from './config-panel/MaterialSelector';
import ExportButton from './config-panel/ExportButton';
import GearControls from './config-panel/GearControls';
import PipeControls from './config-panel/PipeControls';
import SpringControls from './config-panel/SpringControls';
import BoltControls from './config-panel/BoltControls';
import NutControls from './config-panel/NutControls';
import CollapsibleSection from './config-panel/CollapsibleSection';

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
  const filteredParameters = getPartParameters();

  const renderPartControls = () => {
    switch(selectedPart) {
      case 'gear':
        return <GearControls parameters={filteredParameters} onParameterChange={onParameterChange} />;
      case 'pipe':
        return <PipeControls parameters={filteredParameters} onParameterChange={onParameterChange} />;
      case 'spring':
        return <SpringControls parameters={filteredParameters} onParameterChange={onParameterChange} />;
      case 'bolt':
        return <BoltControls parameters={filteredParameters} onParameterChange={onParameterChange} />;
      case 'nut':
        return <NutControls parameters={filteredParameters} onParameterChange={onParameterChange} />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full h-full overflow-auto shadow-lg border-mechanical-blue/10">
      <CardHeader className="bg-mechanical-blue text-white sticky top-0 z-10">
        <CardTitle className="text-xl flex items-center">
          <span className="flex-1">{partTitle} Configuration</span>
          <AutoRotateToggle 
            autoRotate={autoRotate} 
            onAutoRotateChange={onAutoRotateChange} 
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 max-h-[calc(100vh-200px)] overflow-auto">
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
          <div className="space-y-4">
            {renderPartControls()}
            
            <CollapsibleSection title="Material Options" defaultOpen={false}>
              <MaterialSelector 
                materials={materials}
                selectedMaterial={selectedMaterial}
                onMaterialChange={onMaterialChange}
              />
            </CollapsibleSection>

            <div className="pt-4">
              <ExportButton />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
