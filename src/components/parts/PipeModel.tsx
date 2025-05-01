
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PipeProps {
  parameters: {
    length: number;
    radius: number;
    thickness: number;
    segments?: number;     // For controlling smoothness
    bevelSize?: number;    // Controls end bevels
    taper?: number;        // For tapered pipes (0 = uniform)
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

  // Generate pipe geometry with proper hollow center
  const pipeGeometry = useMemo(() => {
    // Extract parameters with defaults
    const { length, radius, thickness } = parameters;
    const segments = parameters.segments ?? 32;      // Higher for smoother surfaces
    const bevelSize = parameters.bevelSize ?? 0.1;   // Bevel effect at pipe ends
    const taper = parameters.taper ?? 0;             // Taper effect (0-1)
    
    // Ensure thickness is valid - cap it at 90% of radius
    const maxThickness = radius * 0.9;
    const safeThickness = thickness > maxThickness ? maxThickness : thickness;
    
    // Calculate inner radius
    const innerRadius = Math.max(radius - safeThickness, 0.1);
    
    // For tapered pipes, calculate dimensions for both ends
    const topRadius = radius * (1 + taper * 0.5);
    const bottomRadius = radius * (1 - taper * 0.5);
    const topInner = innerRadius * (1 + taper * 0.5);
    const bottomInner = innerRadius * (1 - taper * 0.5);
    
    // Create a shape for the pipe cross-section (ring shape)
    const shape = new THREE.Shape();
    
    // Draw outer circle
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    // Create hole (inner circle)
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude settings with bevels for smoother appearance
    const extrudeSettings = {
      depth: length,
      bevelEnabled: true,
      bevelThickness: length * bevelSize * 0.1,
      bevelSize: radius * bevelSize * 0.2,
      bevelOffset: 0,
      bevelSegments: Math.max(3, Math.floor(segments / 8)),
      curveSegments: segments,
      steps: Math.max(1, Math.floor(length / 2))
    };
    
    // Extrude the shape to create a 3D pipe
    const extrudedGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Center and orient correctly
    extrudedGeometry.center();
    extrudedGeometry.rotateX(Math.PI / 2);
    
    // Compute vertex normals for smoother shading
    extrudedGeometry.computeVertexNormals();
    
    return extrudedGeometry;
  }, [parameters]);

  // Rotation animation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow geometry={pipeGeometry}>
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.7} 
          roughness={0.3}
          side={THREE.DoubleSide}
          flatShading={false}
        />
      </mesh>
    </group>
  );
}
