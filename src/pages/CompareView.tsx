
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThreeScene from '@/components/ThreeScene';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMockGraphQL, Material } from '@/hooks/useMockGraphQL';

const CompareView: React.FC = () => {
  const { data } = useMockGraphQL();
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([
    { id: 'steel', name: 'Steel', color: '#A5A5A5' },
    { id: 'aluminum', name: 'Aluminum', color: '#D8D8D8' },
  ]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto py-8 px-4">
          <div className="flex items-center mb-8">
            <Link to="/">
              <Button variant="ghost" className="mr-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Configurator
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Compare Designs</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Design A - Steel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ThreeScene 
                    parameters={data?.parameters || []} 
                    material={selectedMaterials[0]}
                    selectedPart="gear"
                    autoRotate={true} 
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Properties:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Weight: 7.85 g/cm³</li>
                    <li>Tensile Strength: 400 MPa</li>
                    <li>Hardness: Medium</li>
                    <li>Corrosion Resistance: Low</li>
                    <li>Cost: $</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Design B - Aluminum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ThreeScene 
                    parameters={data?.parameters || []} 
                    material={selectedMaterials[1]}
                    selectedPart="gear"
                    autoRotate={true} 
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Properties:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Weight: 2.7 g/cm³</li>
                    <li>Tensile Strength: 310 MPa</li>
                    <li>Hardness: Low</li>
                    <li>Corrosion Resistance: High</li>
                    <li>Cost: $$</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Comparison Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Weight Difference:</h3>
                    <p>Steel is approximately 2.9 times heavier than aluminum for the same volume.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Strength-to-Weight Ratio:</h3>
                    <p>Aluminum has a better strength-to-weight ratio making it ideal for applications where weight is critical.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Cost Analysis:</h3>
                    <p>Steel is generally more cost-effective but may require additional treatments for corrosion resistance.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Recommendation:</h3>
                    <p>For applications requiring high wear resistance and durability, steel is recommended. For lightweight applications with moderate strength requirements, aluminum would be more suitable.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompareView;
