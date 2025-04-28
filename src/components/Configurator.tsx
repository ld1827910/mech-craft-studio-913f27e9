
import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import ConfigPanel from './ConfigPanel';
import { useMockGraphQL, PartParameter, Material } from '@/hooks/useMockGraphQL';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Cog, CircleDot, Cylinder, Bolt, Hexagon } from 'lucide-react';

const Configurator: React.FC = () => {
  const { loading, error, data } = useMockGraphQL();
  const [parameters, setParameters] = useState<PartParameter[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>({ 
    id: 'steel', 
    name: 'Steel', 
    color: '#A5A5A5' 
  });
  const [selectedPart, setSelectedPart] = useState('gear');

  // Initialize parameters and materials from GraphQL data
  React.useEffect(() => {
    if (data) {
      setParameters(data.parameters);
      setMaterials(data.materials);
      setSelectedMaterial(data.materials[0]);
    }
  }, [data]);

  const handleParameterChange = (id: string, value: number) => {
    setParameters(prev => 
      prev.map(param => 
        param.id === id ? { ...param, value } : param
      )
    );
  };

  const handleMaterialChange = (material: Material) => {
    setSelectedMaterial(material);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <p>Error loading configurator data. Please try again later.</p>
      </div>
    );
  }

  const partOptions = [
    { id: 'gear', name: 'Gear', icon: Cog },
    { id: 'pipe', name: 'Pipe', icon: Cylinder },
    { id: 'spring', name: 'Spring', icon: CircleDot },
    { id: 'bolt', name: 'Bolt', icon: Bolt },
    { id: 'nut', name: 'Nut', icon: Hexagon },
  ];

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Select Part Type</h2>
        <RadioGroup
          value={selectedPart}
          onValueChange={setSelectedPart}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {partOptions.map((part) => (
            <div key={part.id} className="flex items-center space-x-2">
              <RadioGroupItem value={part.id} id={part.id} />
              <Label htmlFor={part.id} className="flex items-center gap-2 cursor-pointer">
                <part.icon className="w-5 h-5" />
                {part.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 h-[500px] md:h-[600px]">
          <ThreeScene 
            parameters={parameters} 
            material={selectedMaterial}
            selectedPart={selectedPart}
            isLoading={loading} 
          />
        </div>
        <div className="w-full md:w-1/3">
          <ConfigPanel
            parameters={parameters}
            materials={materials}
            selectedMaterial={selectedMaterial}
            onParameterChange={handleParameterChange}
            onMaterialChange={handleMaterialChange}
            selectedPart={selectedPart}
            isLoading={loading}
          />
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Customize Parameters</h3>
            <p className="text-gray-600">Adjust dimensions and specifications to match your exact requirements.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Choose Materials</h3>
            <p className="text-gray-600">Select from various materials with different properties and appearances.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Export Design</h3>
            <p className="text-gray-600">Save your configuration or request a quote for manufacturing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
