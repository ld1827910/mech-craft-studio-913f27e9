
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NutProps {
  parameters: {
    radius: number;
    height: number;
    holeRadius: number;
    chamferSize?: number;
    sides?: number;
    texture?: number;
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

  // Create a metallic material with reflection properties
  const nutMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: materialColor,
      metalness: 0.8,
      roughness: 0.2,
      envMapIntensity: 1.0,
      flatShading: false,
    });
    return mat;
  }, [materialColor]);

  const nutGeometry = useMemo(() => {
    // Size multiplier for the nut to make it properly visible
    const sizeMultiplier = 3.0;
    
    const { radius, height, holeRadius } = parameters;
    const sides = parameters.sides ?? 6; // Default to hex nut (6 sides)
    const chamferSize = parameters.chamferSize ?? 0.1; // Default chamfer
    const texture = parameters.texture ?? 0; // Default smooth
    
    // Apply size multiplier to all dimensions
    const scaledRadius = radius * sizeMultiplier;
    const scaledHeight = height * sizeMultiplier;
    const scaledHoleRadius = holeRadius * sizeMultiplier;
    
    // Safety check: ensure hole radius doesn't exceed 80% of total radius
    const maxHoleRadius = scaledRadius * 0.8;
    const safeHoleRadius = Math.min(scaledHoleRadius, maxHoleRadius);
    
    // Create the basic nut shape (hexagonal by default)
    const shape = new THREE.Shape();
    for (let i = 0; i < sides; i++) {
      const angle = (i * Math.PI * 2) / sides;
      const x = scaledRadius * Math.cos(angle);
      const y = scaledRadius * Math.sin(angle);
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    }
    shape.closePath();

    // Create the hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, safeHoleRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    // Extrusion settings with chamfer (bevel)
    const extrudeSettings = {
      depth: scaledHeight,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: chamferSize * scaledRadius,
      bevelThickness: chamferSize * scaledHeight,
      curveSegments: Math.max(sides * 2, 16) // Higher segments for smoother edges
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Apply texture if needed
    if (texture > 0) {
      const positionAttribute = geometry.getAttribute('position');
      const vertex = new THREE.Vector3();
      
      // Apply slight random displacement to surface vertices based on texture intensity
      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
        
        // Only apply texture to outer surface, not to hole or top/bottom faces
        if (distFromCenter > safeHoleRadius && Math.abs(vertex.y) < scaledHeight / 2 + chamferSize * scaledHeight) {
          // Scale texture based on parameter value (0-10)
          const textureIntensity = texture * 0.005;
          vertex.x += (Math.random() - 0.5) * textureIntensity * scaledRadius;
          vertex.z += (Math.random() - 0.5) * textureIntensity * scaledRadius;
          positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
      }
      
      geometry.computeVertexNormals();
    }
    
    // Add thread texture inside the hole
    const threadDetail = Math.floor(sides * 2);
    const innerPositions = [];
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    // Find inner hole vertices
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
      
      // Check if vertex is part of the inner hole
      if (distFromCenter <= safeHoleRadius * 1.1) {
        innerPositions.push(i);
      }
    }
    
    // Add thread pattern to inner hole
    for (let i = 0; i < innerPositions.length; i++) {
      const index = innerPositions[i];
      vertex.fromBufferAttribute(positionAttribute, index);
      
      // Simple thread pattern based on y-position
      const threadDepth = safeHoleRadius * 0.08;
      const threadPitch = scaledHeight / 8;
      const threadOffset = Math.sin((vertex.y / threadPitch) * Math.PI * 2) * threadDepth;
      
      // Calculate direction to center
      const dirX = -vertex.x;
      const dirZ = -vertex.z;
      const len = Math.sqrt(dirX * dirX + dirZ * dirZ);
      
      if (len > 0) {
        // Move vertex inward/outward based on thread pattern
        const normX = dirX / len;
        const normZ = dirZ / len;
        
        vertex.x += normX * threadOffset;
        vertex.z += normZ * threadOffset;
        
        positionAttribute.setXYZ(index, vertex.x, vertex.y, vertex.z);
      }
    }
    
    geometry.computeVertexNormals();
    geometry.center();
    
    return geometry;
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });
  
  // Create reflection environment
  const envMap = useMemo(() => {
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
    cubeRenderTarget.texture.type = THREE.HalfFloatType;
    return cubeRenderTarget.texture;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={nutGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.85} 
          roughness={0.2}
          envMap={envMap}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
