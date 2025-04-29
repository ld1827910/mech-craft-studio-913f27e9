
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

  // Generate the spur gear geometry
  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    // Create the gear shape
    const shape = new THREE.Shape();
    
    // Calculate tooth parameters
    const toothDepth = radius * 0.2;
    const outerRadius = radius + toothDepth;
    const innerRadius = radius;
    const holeRadius = Math.max(hole, 0.1); // Ensure minimum hole size
    const angleStep = (Math.PI * 2) / teeth;
    const toothWidth = angleStep * 0.4;
    
    // Draw the gear teeth
    for (let i = 0; i < teeth; i++) {
      const angle = i * angleStep;
      
      // Points for this tooth
      const p1 = {
        x: innerRadius * Math.cos(angle),
        y: innerRadius * Math.sin(angle)
      };
      
      const p2 = {
        x: outerRadius * Math.cos(angle + toothWidth/2),
        y: outerRadius * Math.sin(angle + toothWidth/2)
      };
      
      const p3 = {
        x: outerRadius * Math.cos(angle + angleStep - toothWidth/2),
        y: outerRadius * Math.sin(angle + angleStep - toothWidth/2)
      };
      
      const p4 = {
        x: innerRadius * Math.cos(angle + angleStep),
        y: innerRadius * Math.sin(angle + angleStep)
      };
      
      // First tooth starts the shape
      if (i === 0) {
        shape.moveTo(p1.x, p1.y);
      }
      
      // Create curved transition to tooth peak
      shape.bezierCurveTo(
        innerRadius * 1.05 * Math.cos(angle + toothWidth/4),
        innerRadius * 1.05 * Math.sin(angle + toothWidth/4),
        outerRadius * 0.95 * Math.cos(angle + toothWidth/2),
        outerRadius * 0.95 * Math.sin(angle + toothWidth/2),
        p2.x, p2.y
      );
      
      // Straight line across tooth top
      shape.lineTo(p3.x, p3.y);
      
      // Create curved transition back to inner radius
      shape.bezierCurveTo(
        outerRadius * 0.95 * Math.cos(angle + angleStep - toothWidth/4),
        outerRadius * 0.95 * Math.sin(angle + angleStep - toothWidth/4),
        innerRadius * 1.05 * Math.cos(angle + angleStep),
        innerRadius * 1.05 * Math.sin(angle + angleStep),
        p4.x, p4.y
      );
    }
    
    // Close the shape
    shape.closePath();
    
    // Add the center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude settings with beveling for a more realistic look
    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.1,
      bevelSize: thickness * 0.05,
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
        metalness={0.8}
        roughness={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
