
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
    
    // Create the pipe shape (a ring)
    const shape = new THREE.Shape();
    // Outer circle
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    // Inner circle (creating the hollow part)
    const holePath = new THREE.Path();
    // The inner radius is the outer radius minus the thickness
    const innerRadius = Math.max(radius - thickness, 0.1); // Ensure minimum inner radius
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude settings
    const extrudeSettings = {
      depth: length,
      bevelEnabled: false
    };
    
    // Create the extruded geometry
    const pipe = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Rotate to correct orientation and center
    pipe.rotateX(Math.PI / 2);
    pipe.center();
    
    return pipe;
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

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
