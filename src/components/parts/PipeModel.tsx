
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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
    
    // Create a cylinder for the outer pipe
    const outerCylinder = new THREE.CylinderGeometry(
      radius, // top radius
      radius, // bottom radius
      length, // height
      32, // radial segments
      2, // height segments
      true // open-ended
    );
    
    // Create a cylinder for the inner hole
    const innerCylinder = new THREE.CylinderGeometry(
      innerRadius, // top radius
      innerRadius, // bottom radius
      length + 0.2, // slightly longer to ensure clean boolean operation
      32, // radial segments
      2, // height segments
      true // open-ended
    );
    
    // Position for CSG operations
    outerCylinder.rotateX(Math.PI / 2);
    innerCylinder.rotateX(Math.PI / 2);
    
    // Create end caps for the pipe (optional)
    const ringGeometry = new THREE.RingGeometry(
      innerRadius, 
      radius, 
      32 // segments
    );
    
    // Create two end caps
    const endCap1 = ringGeometry.clone();
    endCap1.rotateY(Math.PI / 2);
    endCap1.translate(0, 0, length / 2);
    
    const endCap2 = ringGeometry.clone();
    endCap2.rotateY(-Math.PI / 2);
    endCap2.translate(0, 0, -length / 2);
    
    // Combine all geometries
    const geometries = [outerCylinder];
    
    if (innerRadius < radius) { // Only if we have thickness
      geometries.push(endCap1, endCap2);
    }
    
    // Create merged buffer geometry
    const mergedGeometry = THREE.BufferGeometryUtils.mergeBufferGeometries(
      geometries.map(g => g.toNonIndexed())
    );
    
    // Compute vertex normals for proper lighting
    mergedGeometry.computeVertexNormals();
    
    // Make the inner cylinder a hole by using CSG operations
    // This approach allows for cleaner holes without floating point issues
    const outerMesh = new THREE.Mesh(mergedGeometry);
    const innerMesh = new THREE.Mesh(innerCylinder);
    
    // Use Three.js CSG operations to subtract inner cylinder from outer geometry
    const pipeWithHole = THREE.CSG.subtract(outerMesh, innerMesh);
    
    // Center the geometry
    const resultGeometry = pipeWithHole.geometry;
    resultGeometry.center();
    
    return resultGeometry;
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={pipeGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
