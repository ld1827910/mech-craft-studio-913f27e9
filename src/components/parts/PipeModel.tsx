
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
  const groupRef = useRef<THREE.Group>(null);
  
  const materialColor = useMemo(() => {
    switch(material) {
      case 'steel': return new THREE.Color('#A5A5A5');
      case 'aluminum': return new THREE.Color('#D6D6D6');
      case 'brass': return new THREE.Color('#CFB53B');
      case 'copper': return new THREE.Color('#B87333');
      default: return new THREE.Color('#A5A5A5');
    }
  }, [material]);

  // Calculate dimensions - ensure innerRadius works correctly with thickness
  const { length, radius, thickness } = parameters;
  
  // Generate pipe geometry with proper hollow center
  const pipeGeometry = useMemo(() => {
    // Ensure inner radius is calculated correctly from thickness
    const innerRadius = Math.max(radius - thickness, 0.1);
    
    // Create a cylinder geometry for the outer pipe
    const outerCylinder = new THREE.CylinderGeometry(
      radius,           // radiusTop
      radius,           // radiusBottom
      length,           // height
      32,               // radialSegments (increased for smoothness)
      1,                // heightSegments
      false             // openEnded
    );
    
    // Create a cylinder geometry for the inner hole
    const innerCylinder = new THREE.CylinderGeometry(
      innerRadius,      // radiusTop
      innerRadius,      // radiusBottom
      length + 0.2,     // height (slightly larger to ensure complete subtraction)
      32,               // radialSegments (increased for smoothness)
      1,                // heightSegments
      false             // openEnded
    );
    
    // Create BSP objects for CSG operations
    const outerBSP = new THREE.Mesh(outerCylinder);
    const innerBSP = new THREE.Mesh(innerCylinder);
    
    // Convert to BufferGeometry for three.js
    // Since we can't use CSG directly, we'll simulate a hollow pipe
    
    // Create a tube geometry instead (more reliable for hollow cylinders)
    const path = new THREE.LineCurve3(
      new THREE.Vector3(0, -length/2, 0),
      new THREE.Vector3(0, length/2, 0)
    );
    
    const geometry = new THREE.TubeGeometry(
      path,
      1,              // tubularSegments
      radius,         // radius
      32,             // radialSegments (increased for smoothness)
      false           // closed
    );
    
    // Create custom geometry to represent pipe with thickness
    const tubeGeometry = new THREE.CylinderGeometry(
      radius,         // top outer radius
      radius,         // bottom outer radius
      length,         // height
      32,             // radialSegments (increased for smoothness)
      1,              // heightSegments
      true            // openEnded (true for hollow)
    );
    
    // Create a second cylinder for the inner part
    const holeGeometry = new THREE.CylinderGeometry(
      innerRadius,    // top inner radius
      innerRadius,    // bottom inner radius
      length + 0.1,   // height (slightly taller to avoid artifacts)
      32,             // radialSegments (increased for smoothness)
      1,              // heightSegments
      true            // openEnded
    );
    
    // Use buffer geometry instead to create a proper hollow pipe
    const pipeBufferGeometry = new THREE.CylinderGeometry(
      radius,           // radiusTop (outer)
      radius,           // radiusBottom (outer)
      length,           // height
      32,               // radialSegments (increased for smoothness)
      1,                // heightSegments
      true              // openEnded
    );
    
    // Return a shape that represents the proper pipe
    const shape = new THREE.Shape();
    // Draw outer circle
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    
    // Create hole (inner circle)
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);
    
    // Extrude the shape to create a 3D pipe
    const extrudeSettings = {
      depth: length,
      bevelEnabled: false,
      steps: 2
    };
    
    const extrudedGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    extrudedGeometry.center();
    extrudedGeometry.rotateX(Math.PI / 2); // Properly orient the pipe
    
    return extrudedGeometry;
  }, [radius, thickness, length]);

  // Rotation animation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow geometry={pipeGeometry}>
        <meshStandardMaterial 
          color={materialColor} 
          metalness={0.7} 
          roughness={0.3}
          side={THREE.DoubleSide}
          flatShading={false}
        />
      </mesh>
    </group>
  );
}
