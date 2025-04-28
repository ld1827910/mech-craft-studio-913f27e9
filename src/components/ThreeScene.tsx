
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, PerspectiveCamera } from '@react-three/fiber';
import GearModel from './GearModel';
import { PartParameter, Material } from '@/hooks/useMockGraphQL';

interface ThreeSceneProps {
  parameters: PartParameter[];
  material: Material;
  isLoading?: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ parameters, material, isLoading = false }) => {
  // Transform parameters array to object structure needed by GearModel
  const gearParams = {
    teeth: parameters.find(p => p.id === 'teeth')?.value || 20,
    radius: parameters.find(p => p.id === 'radius')?.value || 5,
    thickness: parameters.find(p => p.id === 'thickness')?.value || 1,
    hole: parameters.find(p => p.id === 'hole')?.value || 1,
  };

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-inner">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mechanical-blue"></div>
        </div>
      ) : (
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={40} />
          <color attach="background" args={['#f5f5f5']} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.7} />
            <directionalLight 
              position={[10, 10, 10]} 
              intensity={1} 
              castShadow 
              shadow-mapSize-width={1024} 
              shadow-mapSize-height={1024}
            />
            <GearModel 
              parameters={gearParams}
              material={material.id}
              autoRotate={true}
            />
            <Grid 
              args={[50, 50]} 
              cellSize={1}
              cellThickness={0.5}
              cellColor="#a0a0a0"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#2080ff"
              fadeDistance={50}
              fadeStrength={1}
              infiniteGrid={true}
              position={[0, -gearParams.thickness/2 - 0.01, 0]}
            />
          </Suspense>
          <OrbitControls 
            makeDefault 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={50}
          />
        </Canvas>
      )}
    </div>
  );
};

export default ThreeScene;
