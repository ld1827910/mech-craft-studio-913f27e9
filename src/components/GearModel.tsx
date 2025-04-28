
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// Import BufferGeometryUtils from three/examples/jsm/utils
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

interface GearModelProps {
  parameters: {
    teeth: number;
    radius: number;
    thickness: number;
    hole: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function GearModel({ parameters, material, autoRotate = false }: GearModelProps) {
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

  // Generate gear geometry
  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    // Create gear shape
    const shape = new THREE.Shape();
    
    // Outer circle
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    // Inner circle (hole)
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude settings
    const extrudeSettings = {
      steps: 1,
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 3
    };
    
    // Create extruded geometry
    const baseGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    let geometriesToMerge = [baseGeometry];
    
    // Add teeth
    if (teeth > 0) {
      const toothWidth = (Math.PI * 2 * radius) / (teeth * 3);
      const toothDepth = radius * 0.15;
      
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        
        // Create tooth
        const toothShape = new THREE.Shape();
        
        // Starting point (on main gear circumference)
        const startX = Math.cos(angle - toothWidth / (2 * radius)) * radius;
        const startY = Math.sin(angle - toothWidth / (2 * radius)) * radius;
        
        // Outer point
        const outerX = Math.cos(angle) * (radius + toothDepth);
        const outerY = Math.sin(angle) * (radius + toothDepth);
        
        // End point (back on main gear circumference)
        const endX = Math.cos(angle + toothWidth / (2 * radius)) * radius;
        const endY = Math.sin(angle + toothWidth / (2 * radius)) * radius;
        
        toothShape.moveTo(startX, startY);
        toothShape.lineTo(outerX, outerY);
        toothShape.lineTo(endX, endY);
        toothShape.lineTo(startX, startY);
        
        const toothExtrudeSettings = {
          steps: 1,
          depth: thickness,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.05,
          bevelOffset: 0,
          bevelSegments: 2
        };
        
        const toothGeometry = new THREE.ExtrudeGeometry(toothShape, toothExtrudeSettings);
        geometriesToMerge.push(toothGeometry);
      }
      
      // All extruded geometries are buffer geometries in three.js r128+
      // Use the mergeGeometries function imported from BufferGeometryUtils
      const mergedGeometry = mergeGeometries(geometriesToMerge);
      
      // Center the geometry
      mergedGeometry.center();
      
      // Clean up the geometries to prevent memory leaks
      geometriesToMerge.forEach(geo => geo.dispose());
      
      return mergedGeometry;
    }
    
    // Center the geometry if we didn't create teeth
    baseGeometry.center();
    return baseGeometry;
  }, [parameters]);
  
  // Setup material
  const gearMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: materialColor,
      metalness: 0.7,
      roughness: 0.3,
    });
  }, [materialColor]);
  
  // Rotate gear
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={gearGeometry} material={gearMaterial} castShadow receiveShadow>
        <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
