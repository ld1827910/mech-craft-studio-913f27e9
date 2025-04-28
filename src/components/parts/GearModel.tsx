
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GearProps {
  parameters: {
    teeth: number;
    radius: number;
    thickness: number;
    hole: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function GearModel({ parameters, material, autoRotate = false }: GearProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialColor = useMemo(() => {
    switch(material) {
      case 'steel': return new THREE.Color('#A5A5A5');
      case 'aluminum': return new THREE.Color('#D6D6D6');
      case 'brass': return new THREE.Color('#CFB53B');
      case 'copper': return new THREE.Color('#B87333');
      default: return new THREE.Color('#A5A5A5');
    }
  }, [material]);

  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    const extrudeSettings = {
      steps: 1,
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3
    };

    const baseGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    baseGeometry.center();
    
    return baseGeometry;
  }, [parameters]);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={gearGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
