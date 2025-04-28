
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
    const innerRadius = hole;
    const teethHeight = radius * 0.2;
    
    if (teeth <= 0) {
      // If no teeth, just create a disc
      shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
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
            (outerRadius) * Math.cos(startAngle),
            (outerRadius) * Math.sin(startAngle)
          );
        }
        
        // Draw tooth outer edge
        shape.lineTo(
          (outerRadius + teethHeight) * Math.cos(midAngle),
          (outerRadius + teethHeight) * Math.sin(midAngle)
        );
        
        // End of tooth
        shape.lineTo(
          (outerRadius) * Math.cos(endAngle),
          (outerRadius) * Math.sin(endAngle)
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
            startAngle + 0.0001, // Add tiny offset to avoid zero length path
            false
          );
        }
      }
    }
    
    // Add center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude the 2D gear shape to create a 3D model
    const extrudeSettings = {
      steps: 2,
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.1,
      bevelSize: thickness * 0.05,
      bevelOffset: 0,
      bevelSegments: 3,
    };
    
    const gearBaseGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Center the geometry on its axis
    gearBaseGeometry.center();
    
    // Rotate to correct orientation
    gearBaseGeometry.rotateX(Math.PI / 2);
    
    return gearBaseGeometry;
  }, [parameters]); // Regenerate when any parameter changes

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.z += delta * 0.2;
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
        metalness={0.7} 
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
