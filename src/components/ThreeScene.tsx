import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import GearModel from './parts/GearModel';
import PipeModel from './parts/PipeModel';
import SpringModel from './parts/SpringModel';
import BoltModel from './parts/BoltModel';
import NutModel from './parts/NutModel';
import { PartParameter, Material } from '@/hooks/useMockGraphQL';

interface ThreeSceneProps {
  parameters: PartParameter[];
  material: Material;
  selectedPart: string;
  isLoading?: boolean;
  autoRotate?: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ 
  parameters, 
  material, 
  selectedPart,
  isLoading = false,
  autoRotate = false
}) => {
  const getParameterValue = (id: string, defaultValue: number) => 
    parameters.find(p => p.id === id)?.value || defaultValue;

  const renderSelectedPart = () => {
    switch(selectedPart) {
      case 'gear':
        return (
          <GearModel 
            parameters={{
              teeth: getParameterValue('teeth', 20),
              radius: getParameterValue('radius', 5),
              thickness: getParameterValue('thickness', 1),
              hole: getParameterValue('hole', 1),
              toothDepthRatio: getParameterValue('toothDepthRatio', 0.15),
              toothWidth: getParameterValue('toothWidth', 0.5),
              bevelSize: getParameterValue('bevelSize', 0.02),
            }}
            material={material.id}
            autoRotate={autoRotate}
          />
        );
      case 'pipe':
        return (
          <PipeModel
            parameters={{
              length: getParameterValue('length', 5),
              radius: getParameterValue('radius', 1),
              thickness: getParameterValue('thickness', 0.2),
              segments: getParameterValue('segments', 32),
              bevelSize: getParameterValue('bevelSize', 0.1),
              taper: getParameterValue('taper', 0),
            }}
            material={material.id}
            autoRotate={autoRotate}
          />
        );
      case 'spring':
        return (
          <SpringModel
            parameters={{
              radius: getParameterValue('radius', 1),
              thickness: getParameterValue('thickness', 0.1),
              coils: getParameterValue('coils', 5),
              height: getParameterValue('height', 5),
              tension: getParameterValue('tension', 0),
              resolution: getParameterValue('resolution', 256),
              waveAmplitude: getParameterValue('waveAmplitude', 0),
              radialSegments: getParameterValue('radialSegments', 16),
              taper: getParameterValue('taper', 0),
            }}
            material={material.id}
            autoRotate={autoRotate}
          />
        );
      case 'bolt':
        return (
          <BoltModel
            parameters={{
              headRadius: getParameterValue('headRadius', 0.8),
              shaftRadius: getParameterValue('shaftRadius', 0.4),
              length: getParameterValue('length', 3),
              headHeight: getParameterValue('headHeight', 0.6),
              threadDepth: getParameterValue('threadDepth', 0.08),
              threadPitch: getParameterValue('threadPitch', 0.2),
              threadSegments: getParameterValue('threadSegments', 32),
              headType: getParameterValue('headType', 0),
              countersink: getParameterValue('countersink', 0),
            }}
            material={material.id}
            autoRotate={autoRotate}
          />
        );
      case 'nut':
        return (
          <NutModel
            parameters={{
              radius: getParameterValue('radius', 0.8),
              height: getParameterValue('height', 0.6),
              holeRadius: getParameterValue('holeRadius', 0.4), // This is correctly being passed
              chamferSize: getParameterValue('chamferSize', 0.1),
              sides: getParameterValue('sides', 6),
              texture: getParameterValue('texture', 0),
            }}
            material={material.id}
            autoRotate={autoRotate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-inner">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mechanical-blue"></div>
        </div>
      ) : (
        <Canvas shadows dpr={[1, 2]}>
          <color attach="background" args={['#f5f5f5']} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.7} />
            <directionalLight 
              position={[10, 10, 10]} 
              intensity={1} 
              castShadow 
            />
            
            <group position={[0, 0, 0]}>
              {renderSelectedPart()}
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
}

export default ThreeScene;
