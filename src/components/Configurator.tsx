
import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import ConfigPanel from './ConfigPanel';
import { useMockGraphQL, PartParameter, Material } from '@/hooks/useMockGraphQL';
import { Cog, CircleDot, Cylinder, Bolt, Hexagon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

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
  const [autoRotate, setAutoRotate] = useState(false);
  const { toast } = useToast();

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
    
    toast({
      title: "Material Updated",
      description: `Changed material to ${material.name}`,
      duration: 2000,
    });
  };
  
  const handleSaveDesign = () => {
    toast({
      title: "Design Saved",
      description: "Your design has been saved to your history",
      duration: 2000,
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <p>Error loading configurator data. Please try again later.</p>
      </div>
    );
  }

  const partOptions = [
    { id: 'gear', name: 'Gear', icon: Cog, description: 'Configure gear teeth, radius and other parameters' },
    { id: 'pipe', name: 'Pipe', icon: Cylinder, description: 'Design cylindrical pipes with custom dimensions' },
    { id: 'spring', name: 'Spring', icon: CircleDot, description: 'Create springs with adjustable coil and tension settings' },
    { id: 'bolt', name: 'Bolt', icon: Bolt, description: 'Customize bolts with different head types and thread patterns' },
    { id: 'nut', name: 'Nut', icon: Hexagon, description: 'Design nuts with variable sides and textures' },
  ];

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Select Component Type</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveDesign}>
              Save Design
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {partOptions.map((part) => (
            <div 
              key={part.id}
              onClick={() => setSelectedPart(part.id)} 
              className={`flex flex-col items-center p-4 rounded-lg cursor-pointer border-2 transition-all ${
                selectedPart === part.id 
                  ? 'border-mechanical-blue bg-mechanical-blue/5 dark:bg-mechanical-blue/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                selectedPart === part.id 
                  ? 'bg-mechanical-blue text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                <part.icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{part.name}</span>
              <span className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400 hidden md:block">{part.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div id="3d-configurator" className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 h-[500px] md:h-[600px]">
          <ThreeScene 
            parameters={parameters} 
            material={selectedMaterial}
            selectedPart={selectedPart}
            isLoading={loading}
            autoRotate={autoRotate} 
          />
        </div>
        <div className="w-full lg:w-1/3">
          <ConfigPanel
            parameters={parameters}
            materials={materials}
            selectedMaterial={selectedMaterial}
            onParameterChange={handleParameterChange}
            onMaterialChange={handleMaterialChange}
            selectedPart={selectedPart}
            isLoading={loading}
            autoRotate={autoRotate}
            onAutoRotateChange={setAutoRotate}
          />
        </div>
      </div>
      
      <div id="how-it-works" className="mt-16 scroll-mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-6">1</div>
            <h3 className="text-xl font-semibold mb-3">Customize Parameters</h3>
            <p className="text-gray-600 dark:text-gray-300">Fine-tune dimensions and specifications with precision controls to match your exact engineering requirements.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-6">2</div>
            <h3 className="text-xl font-semibold mb-3">Select Materials</h3>
            <p className="text-gray-600 dark:text-gray-300">Choose from various industry-standard materials with different mechanical properties and visual appearances.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-6">3</div>
            <h3 className="text-xl font-semibold mb-3">Export & Manufacture</h3>
            <p className="text-gray-600 dark:text-gray-300">Download your custom design for 3D printing or request a manufacturing quote for production-grade components.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gray-100 dark:bg-gray-700 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Precision Engineering</h3>
            <p className="text-gray-600 dark:text-gray-300">Our configurator ensures all components meet industry standards with tolerances within ±0.1mm for perfect fitment.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Material Properties</h3>
            <p className="text-gray-600 dark:text-gray-300">Material selection includes density, tensile strength, and thermal properties to ensure optimal performance.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Real-time Visualization</h3>
            <p className="text-gray-600 dark:text-gray-300">Inspect your components from any angle with our interactive 3D viewer powered by advanced WebGL technology.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Manufacturing Ready</h3>
            <p className="text-gray-600 dark:text-gray-300">Export designs in industry-standard formats compatible with CNC machines and 3D printers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;
