
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpringProps {
  parameters: {
    radius: number;
    thickness: number;
    coils: number;
    height: number;
    tension?: number;  // Controls spring tension/compression
    resolution?: number;  // Controls smoothness
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
    // Use provided values or defaults
    const tension = parameters.tension ?? 0;  
    const resolution = parameters.resolution ?? 256;  // Higher resolution for smoother spring
    
    // Calculate total points based on resolution and coils
    const totalPoints = Math.max(Math.floor(coils * resolution), 256);
    
    // Create points for a helical spring
    const points = [];
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      
      // Standard helix parameters
      const angle = t * Math.PI * 2 * coils;
      
      // Apply tension effect (0 = normal, positive = stretched, negative = compressed)
      const verticalPosition = t * height - height / 2;
      
      // Calculate spring position with tension effect
      const tensionFactor = 1 + tension * 0.1; // Adjust tension effect
      const dynamicRadius = radius * (1 + Math.sin(angle * 0.5) * (tension * 0.03));
      
      // Create point on the helix
      const x = dynamicRadius * Math.cos(angle);
      const y = verticalPosition + Math.sin(angle * 2) * (tension * height * 0.02);
      const z = dynamicRadius * Math.sin(angle);
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    // Create a smooth curve from the points
    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = false; // Spring should not be closed
    
    // Create tube geometry with more segments for smoothness
    const tubeSegments = Math.max(totalPoints, 256); // Increased for smoother curve
    const radialSegments = Math.max(16, Math.ceil(thickness * 24)); // More detail for thicker springs
    
    return new THREE.TubeGeometry(
      curve, 
      tubeSegments, 
      thickness / 2, 
      radialSegments, 
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
    <mesh ref={meshRef} geometry={springGeometry} castShadow receiveShadow>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.8} 
        roughness={0.2}
        flatShading={false}
      />
    </mesh>
  );
}
