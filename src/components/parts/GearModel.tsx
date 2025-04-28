
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
    
    // Base gear shape (this will be a cylinder for the main gear body)
    const baseGeometry = new THREE.CylinderGeometry(radius, radius, thickness, 32);
    
    // Create hole in the middle
    const holeGeometry = new THREE.CylinderGeometry(hole, hole, thickness * 1.2, 32);
    const baseGear = new THREE.Mesh(baseGeometry);
    const holeGear = new THREE.Mesh(holeGeometry);
    
    // Create a BSP tree for subtraction
    const mainGear = baseGear;
    
    // Create gear teeth if teeth count is greater than 0
    if (teeth > 0) {
      const toothWidth = (2 * Math.PI * radius) / (teeth * 3); // Width of each tooth
      const toothHeight = radius * 0.2; // Height of the tooth
      const toothDepth = thickness; // Same as gear thickness
      
      // Create a group to hold all teeth
      const teethGroup = new THREE.Group();
      
      // Create each tooth and add it to the group
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        
        // Create tooth geometry
        const toothGeometry = new THREE.BoxGeometry(
          toothWidth,
          toothHeight,
          toothDepth
        );
        
        // Position the tooth at the edge of the gear
        const tooth = new THREE.Mesh(toothGeometry);
        tooth.position.x = (radius + toothHeight / 2) * Math.cos(angle);
        tooth.position.y = (radius + toothHeight / 2) * Math.sin(angle);
        
        // Rotate the tooth to point outward
        tooth.rotation.z = angle;
        
        teethGroup.add(tooth);
      }
      
      return { baseGeometry, teethGeometry: teethGroup };
    }
    
    return { baseGeometry };
  }, [parameters]);

  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={gearGeometry.baseGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.7} 
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Create a hole in the center */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[parameters.hole, parameters.hole, parameters.thickness * 1.2, 32]} />
        <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.3} side={THREE.DoubleSide} transparent opacity={0} />
      </mesh>
      
      {/* Render gear teeth */}
      {gearGeometry.teethGeometry && 
        <primitive 
          object={gearGeometry.teethGeometry} 
          position={[0, 0, 0]}
        >
          <meshStandardMaterial 
            color={materialColor} 
            metalness={0.7} 
            roughness={0.3}
            side={THREE.DoubleSide}
          />
        </primitive>
      }
    </group>
  );
}
