
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GearProps {
  parameters: {
    teeth: number;
    radius: number;
    thickness: number;
    hole: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function GearModel({ parameters, material, autoRotate = false }: GearProps) {
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

  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    // Create the basic gear shape
    const shape = new THREE.Shape();
    
    // Outer circle
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    // Create a basic spur gear
    if (teeth > 0) {
      // Remove the main shape and create a new one with teeth
      shape.curves = [];
      
      const toothDepth = radius * 0.15;
      const baseRadius = radius - toothDepth;
      const angleStep = (Math.PI * 2) / teeth;
      
      // Draw the gear teeth outline
        for (let i = 0; i < teeth; i++) {
        const angle1 = i * angleStep;
        const angle2 = angle1 + angleStep / 2;
        const angle3 = angle1 + angleStep;
        const angle5 = angle3

        // Tooth base point 1
        const x1 = baseRadius * Math.cos(angle1);
        const y1 = baseRadius * Math.sin(angle1);

        // Tooth tip
        const x3 = (radius) * Math.cos(angle2);
        const y3 = (radius) * Math.sin(angle2);

        // Tooth base point 2
       
        const x4 = baseRadius * Math.cos(angle3);
        const y4 = baseRadius * Math.sin(angle3);
        const x5 = baseRadius * Math.cos(angle5);
        const y5 = baseRadius * Math.sin(angle5);
        
        if (i === 0) {
          shape.moveTo(x1, y1);
        } else {
          shape.lineTo(x1, y1);
        }

        shape.lineTo(x3, y3);
        shape.lineTo(x4, y4);
        shape.lineTo(x5, y5);
      }
      
      shape.closePath();
    }
    
    // Add the center hole
    if (hole > 0) {
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
      shape.holes.push(holePath);
    }
    
    // Extrude settings
    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.05,
      bevelSize: thickness * 0.02,
      bevelOffset: 0,
      bevelSegments: 3
    };
    
    // Create the extruded geometry
    const gearGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Center and orient correctly
    gearGeometry.center();
    gearGeometry.rotateX(Math.PI / 2);
    
    return gearGeometry;
  }, [parameters]);

  // Rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={gearGeometry}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.6}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
