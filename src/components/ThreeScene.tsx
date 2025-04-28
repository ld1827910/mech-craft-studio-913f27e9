
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, PerspectiveCamera } from '@react-three/drei';
import GearModel from './parts/GearModel';
import PipeModel from './parts/PipeModel';
import SpringModel from './parts/SpringModel';
import BoltModel from './parts/BoltModel';
import NutModel from './parts/NutModel';
import { PartParameter, Material } from '@/hooks/useMockGraphQL';

interface ThreeSceneProps {
  parameters: PartParameter[];
  material: Material;
  isLoading?: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ parameters, material, isLoading = false }) => {
  const getParameterValue = (id: string, defaultValue: number) => 
    parameters.find(p => p.id === id)?.value || defaultValue;

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
            />
            
            {/* Display different parts based on selected part type */}
            <group position={[0, 0, 0]}>
              <GearModel 
                parameters={{
                  teeth: getParameterValue('teeth', 20),
                  radius: getParameterValue('radius', 5),
                  thickness: getParameterValue('thickness', 1),
                  hole: getParameterValue('hole', 1),
                }}
                material={material.id}
                autoRotate={true}
              />
              
              <PipeModel
                parameters={{
                  length: 5,
                  radius: 1,
                  thickness: 0.2,
                }}
                material={material.id}
              />
              
              <SpringModel
                parameters={{
                  radius: 1,
                  thickness: 0.1,
                  coils: 5,
                  height: 5,
                }}
                material={material.id}
              />
              
              <BoltModel
                parameters={{
                  headRadius: 0.8,
                  shaftRadius: 0.4,
                  length: 3,
                }}
                material={material.id}
              />
              
              <NutModel
                parameters={{
                  radius: 0.8,
                  height: 0.6,
                  holeRadius: 0.4,
                }}
                material={material.id}
              />
            </group>

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
              position={[0, -5, 0]}
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
