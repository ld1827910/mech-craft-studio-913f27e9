
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpringProps {
  parameters: {
    radius: number;
    thickness: number;
    coils: number;
    height: number;
    tension?: number;  // Added tension parameter
    resolution?: number;  // Added resolution parameter
  };
  material: string;
  autoRotate?: boolean;
}

export default function SpringModel({ parameters, material, autoRotate = false }: SpringProps) {
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

  const springGeometry = useMemo(() => {
    const { radius, thickness, coils, height } = parameters;
    // Default values for new parameters if not provided
    const tension = parameters.tension ?? 0;  
    const resolution = parameters.resolution ?? 24;  // points per coil
    
    // Calculate total points based on resolution and coils
    const totalPoints = Math.max(coils * resolution, 24);
    
    // Create a smoother curve with custom parameters
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: totalPoints + 1 }, (_, i) => {
        const t = i / totalPoints;
        const angle = t * Math.PI * 2 * coils;
        
        // Apply tension effect to radius
        const dynamicRadius = radius * (1 + Math.sin(t * Math.PI * coils) * (tension * 0.2));
        
        // Create helical path with smooth progression
        return new THREE.Vector3(
          dynamicRadius * Math.cos(angle),
          height * t - height/2,
          dynamicRadius * Math.sin(angle)
        );
      }),
      true // closed curve
    );
    
    // Create tube geometry with more segments for smoothness
    const segments = Math.max(coils * 8, 64);
    const tubeSegments = Math.max(8, Math.floor(thickness * 10)); // More tube segments for thicker springs
    
    return new THREE.TubeGeometry(
      curve, 
      segments, 
      thickness/2, 
      tubeSegments, 
      false
    );
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={springGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
        flatShading={false}
      />
    </mesh>
  );
}
