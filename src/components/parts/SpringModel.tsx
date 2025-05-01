
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpringProps {
  parameters: {
    radius: number;
    thickness: number;
    coils: number;
    height: number;
    tension?: number;       // Controls spring tension/compression
    resolution?: number;    // Controls smoothness
    waveAmplitude?: number; // Controls wave effect in spring
    radialSegments?: number; // Controls tube roundness
    taper?: number;         // Tapering from one end to another
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
    // Extract parameters with defaults and safety limits
    const { radius, coils, height } = parameters;
    
    // Safe parameters with limits to prevent model distortion
    const thickness = Math.min(parameters.thickness, radius * 0.5);  // Limit thickness
    const tension = Math.max(-0.5, Math.min(0.5, parameters.tension ?? 0)); // Limit tension to [-0.5, 0.5]
    const resolution = parameters.resolution ?? 256;
    const waveAmplitude = parameters.waveAmplitude ?? 0;
    const radialSegments = parameters.radialSegments ?? 16;
    const taper = Math.max(-0.4, Math.min(0.4, parameters.taper ?? 0)); // Limit taper
    
    // Calculate total points based on resolution and coils
    const totalPoints = Math.max(Math.floor(coils * resolution / 8), 64) * 8;
    
    // Create points for a helical spring
    const points = [];
    for (let i = 0; i <= totalPoints; i++) {
      const t = i / totalPoints;
      
      // Standard helix parameters
      const angle = t * Math.PI * 2 * coils;
      
      // Apply tension effect (0 = normal, positive = stretched, negative = compressed)
      const verticalPosition = t * height - height / 2;
      
      // Apply taper effect to radius
      const taperFactor = 1 + taper * (t - 0.5) * 2;
      const dynamicRadius = radius * taperFactor;
      
      // Calculate spring position with tension and wave effects
      const tensionFactor = 1 + tension * 0.5;
      const waveEffect = waveAmplitude * Math.sin(angle * 4) * dynamicRadius * 0.2;
      
      // Create point on the helix
      const x = dynamicRadius * Math.cos(angle) + waveEffect * Math.cos(angle * 0.5);
      const y = verticalPosition / tensionFactor + Math.sin(angle * 2) * (tension * height * 0.02);
      const z = dynamicRadius * Math.sin(angle) + waveEffect * Math.sin(angle * 0.5);
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    // Create a smooth curve from the points
    const curve = new THREE.CatmullRomCurve3(points);
    curve.closed = false; // Spring should not be closed
    
    // Create tube geometry with more segments for smoothness
    const tubeSegments = Math.max(totalPoints, 128); // Increased for smoother curve
    const safeTubeSegments = Math.min(tubeSegments, 512); // Cap to prevent performance issues
    
    // Determine radial segments based on thickness for optimal geometry
    const tubeRadialSegments = Math.max(radialSegments, Math.ceil(thickness * 24));
    const safeRadialSegments = Math.min(tubeRadialSegments, 32); // Cap to prevent performance issues
    
    return new THREE.TubeGeometry(
      curve, 
      safeTubeSegments, 
      thickness / 2, 
      safeRadialSegments, 
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
