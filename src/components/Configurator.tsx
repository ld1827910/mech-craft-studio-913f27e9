
import React, { useState } from 'react';
import ThreeScene from './ThreeScene';
import ConfigPanel from './ConfigPanel';
import { useMockGraphQL, PartParameter, Material } from '@/hooks/useMockGraphQL';
import { Cog, CircleDot, Cylinder, Bolt, Hexagon, Download, Check, Share2, Save, ScissorsSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

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
      action: (
        <div className="shrink-0 flex items-center">
          <Badge variant="outline" className="mr-2 bg-green-500/20 text-green-600 border-green-500/30">
            <Check className="h-3 w-3 mr-1" />
            Success
          </Badge>
        </div>
      ),
    });
  };

  const handleExport = () => {
    toast({
      title: "Starting Export",
      description: "Preparing your files for download...",
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "Link copied to clipboard",
      duration: 2000,
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert className="max-w-md bg-red-500/10 border-red-500/30 text-red-600">
          <AlertDescription>
            Error loading configurator data. Please try again later or contact support if the issue persists.
          </AlertDescription>
        </Alert>
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
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-10 border border-gray-100 dark:border-gray-700 fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <ScissorsSquare className="h-6 w-6 mr-2 text-mechanical-blue" />
              Component Designer
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Select a component type below to get started</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center">
              <Share2 className="h-4 w-4 mr-1.5" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center">
              <Download className="h-4 w-4 mr-1.5" />
              Export
            </Button>
            <Button variant="default" size="sm" onClick={handleSaveDesign} className="flex items-center bg-mechanical-blue hover:bg-mechanical-darkblue">
              <Save className="h-4 w-4 mr-1.5" />
              Save Design
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {partOptions.map((part) => (
            <Card
              key={part.id}
              onClick={() => setSelectedPart(part.id)} 
              className={`cursor-pointer transition-all duration-200 border-2 hover:shadow-md ${
                selectedPart === part.id 
                  ? 'border-mechanical-blue bg-mechanical-blue/5 dark:bg-mechanical-blue/20 shadow-[0_0_0_1px_rgba(0,99,178,0.3)]'
                  : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                  selectedPart === part.id 
                    ? 'bg-mechanical-blue text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                }`}>
                  <part.icon className="w-6 h-6" />
                </div>
                <span className="font-medium">{part.name}</span>
                <span className="text-xs mt-1.5 text-gray-500 dark:text-gray-400 hidden md:block">{part.description}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="fade-in">
        <div id="3d-configurator" className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 h-[500px] md:h-[600px]">
            <Card className="w-full h-full overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
              <ThreeScene 
                parameters={parameters} 
                material={selectedMaterial}
                selectedPart={selectedPart}
                isLoading={loading}
                autoRotate={autoRotate} 
              />
            </Card>
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
      </div>
      
      <div id="how-it-works" className="mt-20 scroll-mt-20 fade-in">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden border-gray-100 dark:border-gray-700 shadow-md transition-all hover:shadow-lg">
            <div className="bg-mechanical-blue h-1.5 w-full"></div>
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-6 shadow-lg">1</div>
              <h3 className="text-xl font-semibold mb-3">Customize Parameters</h3>
              <p className="text-gray-600 dark:text-gray-300">Fine-tune dimensions and specifications with precision controls to match your exact engineering requirements.</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-gray-100 dark:border-gray-700 shadow-md transition-all hover:shadow-lg">
            <div className="bg-mechanical-blue h-1.5 w-full"></div>
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-6 shadow-lg">2</div>
              <h3 className="text-xl font-semibold mb-3">Select Materials</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose from various industry-standard materials with different mechanical properties and visual appearances.</p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-gray-100 dark:border-gray-700 shadow-md transition-all hover:shadow-lg">
            <div className="bg-mechanical-blue h-1.5 w-full"></div>
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-mechanical-blue flex items-center justify-center rounded-full text-white font-bold mb-6 shadow-lg">3</div>
              <h3 className="text-xl font-semibold mb-3">Export & Manufacture</h3>
              <p className="text-gray-600 dark:text-gray-300">Download your custom design for 3D printing or request a manufacturing quote for production-grade components.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-mechanical-blue/10 to-mechanical-lightblue/10 p-8 rounded-xl border border-mechanical-lightblue/20 fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex space-x-4">
            <div className="bg-mechanical-blue/20 p-2 rounded-full h-min">
              <svg className="h-6 w-6 text-mechanical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Precision Engineering</h3>
              <p className="text-gray-600 dark:text-gray-300">Our configurator ensures all components meet industry standards with tolerances within ±0.1mm for perfect fitment.</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-mechanical-blue/20 p-2 rounded-full h-min">
              <svg className="h-6 w-6 text-mechanical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Material Properties</h3>
              <p className="text-gray-600 dark:text-gray-300">Material selection includes density, tensile strength, and thermal properties to ensure optimal performance.</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-mechanical-blue/20 p-2 rounded-full h-min">
              <svg className="h-6 w-6 text-mechanical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Real-time Visualization</h3>
              <p className="text-gray-600 dark:text-gray-300">Inspect your components from any angle with our interactive 3D viewer powered by advanced WebGL technology.</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <div className="bg-mechanical-blue/20 p-2 rounded-full h-min">
              <svg className="h-6 w-6 text-mechanical-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Manufacturing Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">Export designs in industry-standard formats compatible with CNC machines and 3D printers.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Button variant="outline" size="sm">View All Projects</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden shadow-md hover:shadow-lg transition-all">
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Cog className="h-10 w-10 text-mechanical-blue/30" />
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">Precision Gear Assembly {item}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created 3 days ago</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Featured</Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Custom gear train designed for robotic actuation with high torque transmission.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-mechanical-blue flex items-center justify-center text-xs text-white">JD</div>
                    <div className="w-7 h-7 rounded-full bg-mechanical-darkblue flex items-center justify-center text-xs text-white">TK</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-mechanical-blue hover:text-mechanical-darkblue px-0">
                    View Details →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Configurator;
