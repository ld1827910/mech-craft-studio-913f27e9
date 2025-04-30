
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
  const groupRef = useRef<THREE.Group>(null);
  
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
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.z += delta * 0.5;
    }
  });

  // Generate pipe geometry
  const pipeGeometry = useMemo(() => {
    // Create a shape for the pipe cross-section (ring)
    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false); // Outer circle
    
    // Create the hole for the inner circle
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude settings
    const extrudeSettings = {
      steps: 1,
      depth: length,
      bevelEnabled: false
    };
    
    // Create extruded geometry
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    geometry.rotateX(Math.PI / 2); // Orient correctly
    
    return geometry;
  }, [radius, innerRadius, length]);

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow geometry={pipeGeometry}>
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
