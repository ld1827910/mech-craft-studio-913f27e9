
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NutProps {
  parameters: {
    radius: number;
    height: number;
    holeRadius: number;
    chamferSize?: number; // New parameter for edge chamfer
    sides?: number; // New parameter for number of sides (hex=6, square=4, etc)
    texture?: number; // New parameter for surface texture
  };
  material: string;
  autoRotate?: boolean;
}

export default function NutModel({ parameters, material, autoRotate = false }: NutProps) {
  const meshRef = useRef<THREE.Mesh>(null);
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

  const nutGeometry = useMemo(() => {
    const { radius, height, holeRadius } = parameters;
    const sides = parameters.sides ?? 6; // Default to hex nut (6 sides)
    const chamferSize = parameters.chamferSize ?? 0.1; // Default chamfer
    const texture = parameters.texture ?? 0; // Default smooth
    
    // Safety check: ensure hole radius doesn't exceed 80% of total radius
    const maxHoleRadius = radius * 0.8;
    const safeHoleRadius = Math.min(holeRadius, maxHoleRadius);
    
    // Create the basic nut shape
    const shape = new THREE.Shape();
    for (let i = 0; i < sides; i++) {
      const angle = (i * Math.PI * 2) / sides;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    }
    shape.closePath();

    // Create the hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, safeHoleRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    // Extrusion settings with chamfer (bevel)
    const extrudeSettings = {
      depth: height,
      bevelEnabled: chamferSize > 0,
      bevelSegments: 3,
      bevelSize: chamferSize * radius,
      bevelThickness: chamferSize * height,
      curveSegments: Math.max(sides * 2, 12) // Higher segments for smoother edges
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Apply texture if needed
    if (texture > 0) {
      const positionAttribute = geometry.getAttribute('position');
      const vertex = new THREE.Vector3();
      
      // Apply slight random displacement to surface vertices
      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
        
        // Only apply texture to outer surface, not to hole or top/bottom faces
        if (distFromCenter > safeHoleRadius && Math.abs(vertex.y) < height / 2 + chamferSize * height) {
          vertex.x += (Math.random() - 0.5) * texture * 0.05;
          vertex.z += (Math.random() - 0.5) * texture * 0.05;
          positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
      }
      
      geometry.computeVertexNormals();
    }
    
    geometry.center();
    return geometry;
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={nutGeometry}>
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
