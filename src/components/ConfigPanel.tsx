
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
import UnitToggle from './config-panel/UnitToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sliders, Palette, FileCog } from 'lucide-react';

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
    <Card className="w-full h-full overflow-hidden border-gray-200 dark:border-gray-700 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-mechanical-blue to-mechanical-darkblue text-white sticky top-0 z-10 p-4">
        <CardTitle className="text-xl flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileCog className="h-5 w-5" />
            {partTitle} Configuration
          </span>
          <div className="flex items-center gap-3">
            <UnitToggle />
            <AutoRotateToggle 
              autoRotate={autoRotate} 
              onAutoRotateChange={onAutoRotateChange} 
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="w-full rounded-none border-b grid grid-cols-2 bg-transparent">
            <TabsTrigger value="parameters" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-mechanical-blue rounded-none">
              <Sliders className="h-4 w-4 mr-2" />
              Parameters
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-mechanical-blue rounded-none">
              <Palette className="h-4 w-4 mr-2" />
              Materials
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameters" className="p-4 max-h-[calc(100vh-200px)] overflow-auto">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {renderPartControls()}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="materials" className="p-4 max-h-[calc(100vh-200px)] overflow-auto">
            <MaterialSelector 
              materials={materials}
              selectedMaterial={selectedMaterial}
              onMaterialChange={onMaterialChange}
            />
          </TabsContent>
        </Tabs>
        
        <div className="p-4 border-t">
          <ExportButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigPanel;
