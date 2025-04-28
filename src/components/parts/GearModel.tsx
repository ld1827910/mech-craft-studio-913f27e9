
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

  // Generate gear geometry with teeth
  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    // Create basic gear shape with teeth
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = Math.max(0.1, hole); // Ensure minimum hole size
    const teethHeight = radius * 0.2;
    
    // Create center hole first
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    
    if (teeth <= 0) {
      // If no teeth, just create a disc with center hole
      shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
      shape.holes.push(holePath);
    } else {
      // Create gear with teeth
      const angleStep = (Math.PI * 2) / teeth;
      const toothWidth = (Math.PI * 2 * radius) / (teeth * 4); // Width for each tooth
      
      for (let i = 0; i < teeth; i++) {
        const startAngle = i * angleStep - toothWidth / (2 * radius);
        const midAngle = i * angleStep;
        const endAngle = i * angleStep + toothWidth / (2 * radius);
        
        // Start at inner point before tooth
        if (i === 0) {
          shape.moveTo(
            outerRadius * Math.cos(startAngle),
            outerRadius * Math.sin(startAngle)
          );
        }
        
        // Draw tooth outer edge with smooth curve
        shape.bezierCurveTo(
          outerRadius * Math.cos(startAngle),
          outerRadius * Math.sin(startAngle),
          (outerRadius + teethHeight) * Math.cos(midAngle - toothWidth / (4 * radius)),
          (outerRadius + teethHeight) * Math.sin(midAngle - toothWidth / (4 * radius)),
          (outerRadius + teethHeight) * Math.cos(midAngle),
          (outerRadius + teethHeight) * Math.sin(midAngle)
        );
        
        shape.bezierCurveTo(
          (outerRadius + teethHeight) * Math.cos(midAngle),
          (outerRadius + teethHeight) * Math.sin(midAngle),
          (outerRadius + teethHeight) * Math.cos(midAngle + toothWidth / (4 * radius)),
          (outerRadius + teethHeight) * Math.sin(midAngle + toothWidth / (4 * radius)),
          outerRadius * Math.cos(endAngle),
          outerRadius * Math.sin(endAngle)
        );
        
        // Arc to next tooth start
        if (i < teeth - 1) {
          shape.absarc(
            0, 0,
            outerRadius,
            endAngle,
            startAngle + angleStep,
            false
          );
        } else {
          // Close the shape by connecting back to the first point
          shape.absarc(
            0, 0,
            outerRadius,
            endAngle,
            startAngle + 0.0001,
            false
          );
        }
      }
    }
    
    // Add center hole
    shape.holes.push(holePath);
    
    // Extrude settings for smooth transitions
    const extrudeSettings = {
      steps: 2,
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.1,
      bevelSize: thickness * 0.05,
      bevelOffset: 0,
      bevelSegments: 5,
    };
    
    const gearBaseGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Center the geometry on its axis
    gearBaseGeometry.center();
    
    // Rotate to correct orientation
    gearBaseGeometry.rotateX(Math.PI / 2);
    
    return gearBaseGeometry;
  }, [parameters]); // Regenerate when any parameter changes

  // Smooth rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      // Slower, smoother rotation
      meshRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={gearGeometry} 
      position={[0, 0, 0]}
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
