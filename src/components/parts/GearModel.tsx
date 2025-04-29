
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

  // Generate an improved spur gear geometry
  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    // Create the gear shape
    const shape = new THREE.Shape();
    
    // Calculate tooth parameters
    const toothDepth = radius * 0.25;
    const outerRadius = radius;
    const rootRadius = radius - toothDepth;
    const holeRadius = Math.max(hole, 0.1);
    const angleStep = (Math.PI * 2) / teeth;
    const toothWidth = angleStep * 0.5;
    const filletRadius = toothDepth * 0.2;
    
    // Helper for creating fillets
    const createFillet = (
      center: THREE.Vector2,
      startAngle: number,
      endAngle: number,
      radius: number,
      clockwise: boolean
    ) => {
      const curve = new THREE.EllipseCurve(
        center.x, center.y,
        radius, radius,
        startAngle, endAngle,
        clockwise
      );
      const points = curve.getPoints(8);
      return points;
    };
    
    // Draw the gear teeth
    for (let i = 0; i < teeth; i++) {
      const angle = i * angleStep;
      
      // Root circle points
      const p1 = new THREE.Vector2(
        rootRadius * Math.cos(angle - angleStep/4),
        rootRadius * Math.sin(angle - angleStep/4)
      );
      
      const p2 = new THREE.Vector2(
        rootRadius * Math.cos(angle + angleStep/4),
        rootRadius * Math.sin(angle + angleStep/4)
      );
      
      // Pitch circle points (where involute profile begins)
      const pitchRadius = (outerRadius + rootRadius) / 2;
      
      // Outer tooth points
      const topStart = new THREE.Vector2(
        outerRadius * Math.cos(angle - toothWidth/3),
        outerRadius * Math.sin(angle - toothWidth/3)
      );
      
      const topCenter = new THREE.Vector2(
        (outerRadius + toothDepth * 0.2) * Math.cos(angle),
        (outerRadius + toothDepth * 0.2) * Math.sin(angle)
      );
      
      const topEnd = new THREE.Vector2(
        outerRadius * Math.cos(angle + toothWidth/3),
        outerRadius * Math.sin(angle + toothWidth/3)
      );
      
      // First tooth starts the shape
      if (i === 0) {
        shape.moveTo(p1.x, p1.y);
      }
      
      // Create tooth profile with fillets
      shape.lineTo(p1.x, p1.y);
      
      // Involute curve from root to outer radius (addendum)
      const filletPoints1 = createFillet(
        new THREE.Vector2(
          rootRadius * 1.1 * Math.cos(angle - angleStep/6),
          rootRadius * 1.1 * Math.sin(angle - angleStep/6)
        ),
        angle - Math.PI/2, angle, filletRadius, false
      );
      
      for (const point of filletPoints1) {
        shape.lineTo(point.x, point.y);
      }
      
      // Top of tooth (slightly curved for realism)
      shape.quadraticCurveTo(
        topCenter.x, topCenter.y,
        topEnd.x, topEnd.y
      );
      
      // Involute curve from outer radius to root (dedendum)
      const filletPoints2 = createFillet(
        new THREE.Vector2(
          rootRadius * 1.1 * Math.cos(angle + angleStep/6),
          rootRadius * 1.1 * Math.sin(angle + angleStep/6)
        ),
        angle, angle + Math.PI/2, filletRadius, false
      );
      
      for (const point of filletPoints2) {
        shape.lineTo(point.x, point.y);
      }
      
      shape.lineTo(p2.x, p2.y);
    }
    
    // Close the shape
    shape.closePath();
    
    // Add the center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude settings
    const extrudeSettings = {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: thickness * 0.1,
      bevelSize: thickness * 0.05,
      bevelOffset: 0,
      bevelSegments: 6
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
