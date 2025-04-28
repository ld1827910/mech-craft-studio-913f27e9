
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface PipeProps {
  parameters: {
    length: number;
    radius: number;
    thickness: number;
  };
  material: string;
}

export default function PipeModel({ parameters, material }: PipeProps) {
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

  const pipeGeometry = useMemo(() => {
    const { length, radius, thickness } = parameters;
    return new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      32,
      1,
      true
    );
  }, [parameters]);

  return (
    <mesh ref={meshRef} geometry={pipeGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
