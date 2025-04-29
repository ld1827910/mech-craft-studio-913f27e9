
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PipeProps {
  parameters: {
    length: number;
    radius: number;
    thickness: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function PipeModel({ parameters, material, autoRotate = false }: PipeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  
  const materialColor = useMemo(() => {
    switch(material) {
      case 'steel': return new THREE.Color('#A5A5A5');
      case 'aluminum': return new THREE.Color('#D6D6D6');
      case 'brass': return new THREE.Color('#CFB53B');
      case 'copper': return new THREE.Color('#B87333');
      default: return new THREE.Color('#A5A5A5');
    }
  }, [material]);

  // Calculate dimensions
  const { length, radius, thickness } = parameters;
  const innerRadius = Math.max(radius - thickness, 0.1); // Ensure inner radius is never negative

  // Rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5;
      if (innerMeshRef.current) {
        innerMeshRef.current.rotation.z += delta * 0.5;
      }
    }
  });

  return (
    <group>
      {/* Outer pipe */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry 
          args={[radius, radius, length, 32, 1, false]} 
        />
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Inner hole (creating a true hollow pipe) */}
      <mesh ref={innerMeshRef} position={[0, 0, 0]}>
        <cylinderGeometry 
          args={[innerRadius, innerRadius, length + 0.05, 32, 1, false]} 
        />
        <meshStandardMaterial 
          color="black"
          opacity={0}
          transparent={true}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* End caps - if we want to visualize the thickness */}
      <mesh position={[0, length/2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[innerRadius, radius, 32]} />
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.7} 
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh position={[0, -length/2, 0]} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[innerRadius, radius, 32]} />
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.7} 
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
