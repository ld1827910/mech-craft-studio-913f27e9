
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

  // Generate gear geometry with teeth and center hole
  const gearGeometry = useMemo(() => {
    const { teeth, radius, thickness, hole } = parameters;
    
    // Create basic gear shape with teeth
    const shape = new THREE.Shape();
    const outerRadius = radius;
    const innerRadius = Math.max(0.1, hole); // Ensure minimum hole size
    const toothHeight = radius * 0.2;
    
    // Create gear outline as a circle
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    
    // Create center hole
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // If teeth parameter is greater than 0, add teeth
    if (teeth > 0) {
      // Remove the original circle outline
      shape.curves = [];
      
      const angleStep = (Math.PI * 2) / teeth;
      const toothAngle = angleStep * 0.4; // Width of tooth as fraction of angle step
      
      for (let i = 0; i < teeth; i++) {
        const startAngle = i * angleStep;
        const midAngle = startAngle + (angleStep / 2);
        const endAngle = startAngle + angleStep;
        
        // Start point of tooth (on base circle)
        const startX = outerRadius * Math.cos(startAngle);
        const startY = outerRadius * Math.sin(startAngle);
        
        // Tooth peak (first corner)
        const toothPeak1X = (outerRadius + toothHeight) * Math.cos(startAngle + toothAngle);
        const toothPeak1Y = (outerRadius + toothHeight) * Math.sin(startAngle + toothAngle);
        
        // Tooth valley (middle of tooth top)
        const toothValleyX = (outerRadius + toothHeight * 0.7) * Math.cos(midAngle);
        const toothValleyY = (outerRadius + toothHeight * 0.7) * Math.sin(midAngle);
        
        // Tooth peak (second corner)
        const toothPeak2X = (outerRadius + toothHeight) * Math.cos(endAngle - toothAngle);
        const toothPeak2Y = (outerRadius + toothHeight) * Math.sin(endAngle - toothAngle);
        
        // End point (back on base circle)
        const endX = outerRadius * Math.cos(endAngle);
        const endY = outerRadius * Math.sin(endAngle);
        
        // Draw the tooth with bezier curves for smooth transitions
        if (i === 0) {
          shape.moveTo(startX, startY);
        }
        
        // Create a smooth curve to the first peak
        shape.bezierCurveTo(
          startX * 1.05, startY * 1.05,
          toothPeak1X * 0.95, toothPeak1Y * 0.95,
          toothPeak1X, toothPeak1Y
        );
        
        // Create a smooth curve to the valley
        shape.bezierCurveTo(
          toothPeak1X * 1.02, toothPeak1Y * 1.02,
          toothValleyX * 0.98, toothValleyY * 0.98,
          toothValleyX, toothValleyY
        );
        
        // Create a smooth curve to the second peak
        shape.bezierCurveTo(
          toothValleyX * 1.02, toothValleyY * 1.02,
          toothPeak2X * 0.98, toothPeak2Y * 0.98,
          toothPeak2X, toothPeak2Y
        );
        
        // Create a smooth curve back to the base circle
        shape.bezierCurveTo(
          toothPeak2X * 0.95, toothPeak2Y * 0.95,
          endX * 1.05, endY * 1.05,
          endX, endY
        );
      }
      
      // Close the shape
      shape.closePath();
    }
    
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
      // Smooth rotation
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
