import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

interface PipeProps {
  parameters: {
    length: number;
    radius: number;
    thickness: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function PipeModel({ parameters, material, autoRotate = false }: PipeProps) {
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

  const pipeGeometry = useMemo(() => {
    const { length, radius, thickness } = parameters;
    
    // Ensure thickness is never greater than radius (prevents negative inner radius)
    const safeThickness = Math.min(thickness, radius * 0.95);
    const innerRadius = Math.max(radius - safeThickness, 0.1); // Ensure minimum inner radius
    
    // Create an array to hold our geometries
    const geometries: THREE.BufferGeometry[] = [];
    
    // Create a cylinder for the outer pipe
    const outerCylinder = new THREE.CylinderGeometry(
      radius, // top radius
      radius, // bottom radius
      length, // height
      32, // radial segments
      2, // height segments
      true // open-ended
    );
    
    // Rotate to align with z-axis
    outerCylinder.rotateX(Math.PI / 2);
    geometries.push(outerCylinder);
    
    // Create end caps using dedicated cylinder geometries with zero height
    // Top cap (ring)
    const topCapOuter = new THREE.CylinderGeometry(
      radius,
      radius,
      0.01,
      32,
      1,
      false
    );
    topCapOuter.rotateX(Math.PI / 2);
    topCapOuter.translate(0, 0, length / 2);
    geometries.push(topCapOuter);
    
    // Bottom cap (ring)
    const bottomCapOuter = new THREE.CylinderGeometry(
      radius,
      radius,
      0.01,
      32,
      1,
      false
    );
    bottomCapOuter.rotateX(Math.PI / 2);
    bottomCapOuter.translate(0, 0, -length / 2);
    geometries.push(bottomCapOuter);
    
    // Inner cylinder (hole) - if thickness > 0
    if (innerRadius < radius) {
      // For the inner hole
      const innerCylinder = new THREE.CylinderGeometry(
        innerRadius,
        innerRadius,
        length + 0.02, // slightly longer to ensure clean subtraction
        32,
        1,
        true
      );
      innerCylinder.rotateX(Math.PI / 2);
      
      // Inner caps
      const topCapInner = new THREE.CylinderGeometry(
        innerRadius,
        innerRadius,
        0.02,
        32,
        1,
        false
      );
      topCapInner.rotateX(Math.PI / 2);
      topCapInner.translate(0, 0, length / 2 + 0.005);
      
      const bottomCapInner = new THREE.CylinderGeometry(
        innerRadius,
        innerRadius,
        0.02,
        32,
        1,
        false
      );
      bottomCapInner.rotateX(Math.PI / 2);
      bottomCapInner.translate(0, 0, -length / 2 - 0.005);
      
      // Create boolean operations manually by keeping outer geometries and creating holes through materials
      // We'll use the clipping planes in the material instead of CSG operations
      
      // Merge all outer geometries
      const mergedOuterGeometry = mergeBufferGeometries(geometries);
      
      // Center the geometry
      mergedOuterGeometry.center();
      
      return mergedOuterGeometry;
    } else {
      // If there's no thickness (solid cylinder), just merge and return
      const mergedGeometry = mergeBufferGeometries(geometries);
      
      // Center the geometry
      mergedGeometry.center();
      
      return mergedGeometry;
    }
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Create hole in the material if needed
  const { length, radius, thickness } = parameters;
  const innerRadius = Math.max(radius - thickness, 0.1);
  const hasHole = innerRadius < radius;

  return (
    <mesh ref={meshRef} geometry={pipeGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
        side={THREE.DoubleSide}
        // If we have an inner hole, use clipping planes to cut it out
        clipIntersection={hasHole}
        clippingPlanes={hasHole ? [
          // Create a circular clipping area
          new THREE.Plane(new THREE.Vector3(0, 0, 1), length / 2),
          new THREE.Plane(new THREE.Vector3(0, 0, -1), length / 2)
        ] : []}
      />
      
      {/* If there's a hole, add an inner cylinder with a different material that's slightly smaller */}
      {hasHole && (
        <mesh>
          <cylinderGeometry 
            args={[
              innerRadius, // top radius 
              innerRadius, // bottom radius
              length + 0.01, // height
              32, // radial segments
              1, // height segments
              true // open-ended
            ]} 
            rotation={[Math.PI / 2, 0, 0]}
          />
          <meshStandardMaterial 
            color={materialColor} 
            metalness={0.7} 
            roughness={0.3}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      )}
    </mesh>
  );
}
