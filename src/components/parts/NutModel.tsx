
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NutProps {
  parameters: {
    radius: number;
    thickness: number;
    holeRadius: number;
    sides?: number;
    chamferSize?: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function NutModel({ parameters, material, autoRotate = false }: NutProps) {
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

  const nutGeometry = useMemo(() => {
    if (!parameters.radius) return new THREE.BufferGeometry();
    
    const radius = parameters.radius;
    const thickness = parameters.thickness || 0.5;
    const sides = parameters.sides ?? 6; // Default to hex nut (6 sides)
    const chamferSize = parameters.chamferSize ?? 0.1;
    
    // Get holeRadius with proper constraints
    let holeRadius = parameters.holeRadius || radius * 0.3; // Default if not provided
    
    // Create the basic polygon shape based on sides
    const shape = new THREE.Shape();
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    }
    shape.closePath();
    
    // Create the center hole - apply safety constraints to prevent errors
    // Allow bigger holes but ensure they don't exceed structural integrity
    const maxHoleSize = radius * 0.9; // Allowing larger holes - increased from 0.85
    if (holeRadius > maxHoleSize) {
      holeRadius = maxHoleSize;
    }
    
    // Create the hole path
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    // Extrude settings
    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * chamferSize,
      bevelSize: radius * chamferSize,
      bevelOffset: 0,
      bevelSegments: 5
    };
    
    // Create the extruded geometry
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Center the geometry
    geometry.center();
    
    return geometry;
  }, [parameters]);

  // Animation for auto-rotation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={nutGeometry}
      castShadow
      receiveShadow
      // Position to make the nut stand upright with the hole facing forward
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial 
        color={materialColor}
        metalness={0.7}
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
