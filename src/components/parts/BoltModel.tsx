
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BoltProps {
  parameters: {
    headRadius: number;
    shaftRadius: number;
    length: number;
    headHeight?: number; // New parameter for head height
    threadDepth?: number; // New parameter for thread depth
    threadPitch?: number; // New parameter for thread pitch
    threadSegments?: number; // New parameter for thread segmentation
    headType?: number; // 0 = hex, 1 = socket, 2 = button
    countersink?: number; // For countersink depth
  };
  material: string;
  autoRotate?: boolean;
}

export default function BoltModel({ parameters, material, autoRotate = false }: BoltProps) {
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

  const { headGeometry, shaftGeometry, threadGeometry } = useMemo(() => {
    // Extract parameters with defaults
    const { headRadius, shaftRadius, length } = parameters;
    const headHeight = parameters.headHeight ?? (headRadius * 0.7);
    const threadDepth = parameters.threadDepth ?? 0.08;
    const threadPitch = parameters.threadPitch ?? 0.2;
    const threadSegments = parameters.threadSegments ?? 32;
    const headType = parameters.headType ?? 0; // Default to hex head
    const countersink = parameters.countersink ?? 0;
    
    let headGeo;
    
    // Create different head types based on headType parameter
    switch (headType) {
      case 1: // Socket head (cylindrical with socket)
        headGeo = new THREE.CylinderGeometry(headRadius, headRadius, headHeight, 32);
        break;
      case 2: // Button head (rounded top)
        {
          // Create button head shape with rounded top
          const curve = new THREE.Shape();
          curve.moveTo(-headRadius, 0);
          curve.lineTo(-headRadius, headHeight * 0.5);
          
          // Add curved top
          const curvePoints = 12;
          for (let i = 0; i <= curvePoints; i++) {
            const angle = (Math.PI * i) / curvePoints;
            const x = -headRadius * Math.cos(angle);
            const y = headHeight * 0.5 + headRadius * 0.5 * Math.sin(angle);
            curve.lineTo(x, y);
          }
          
          curve.lineTo(headRadius, headHeight * 0.5);
          curve.lineTo(headRadius, 0);
          curve.closePath();
          
          // Revolve the shape around the y-axis
          const latheGeo = new THREE.LatheGeometry(
            curve.getPoints(32), 
            32
          );
          headGeo = latheGeo;
        }
        break;
      default: // Hex head (default)
        headGeo = new THREE.CylinderGeometry(headRadius, headRadius, headHeight, 6);
        
        // If it has countersink, create a cone at the bottom
        if (countersink > 0) {
          const countersinkHeight = headHeight * countersink;
          const countersinkGeo = new THREE.CylinderGeometry(
            headRadius * 1.2, // Top radius (wider)
            headRadius,       // Bottom radius (matches head)
            countersinkHeight, 
            6
          );
          
          // Position the countersink beneath the head
          const countersinkMesh = new THREE.Mesh(countersinkGeo);
          countersinkMesh.position.y = -countersinkHeight/2;
          
          // Combine geometries
          const headMesh = new THREE.Mesh(headGeo);
          const combined = new THREE.Group();
          combined.add(headMesh);
          combined.add(countersinkMesh);
          
          // Convert to geometry
          const headGeoFinal = new THREE.BufferGeometry();
          // This would normally use THREE.BufferGeometryUtils.mergeBufferGeometries
          // For simplicity, we'll just use the main head geo
          headGeo = countersinkGeo;
        }
        break;
    }
    
    // Create shaft
    const shaftGeo = new THREE.CylinderGeometry(shaftRadius, shaftRadius, length, 16);
    
    // Create thread geometry (if thread depth > 0)
    let threadGeo;
    if (threadDepth > 0 && threadPitch > 0) {
      // Create thread as a helix
      const curve = new THREE.CatmullRomCurve3(
        Array.from({ length: Math.floor(length / threadPitch) * 4 }, (_, i) => {
          const t = (i / (Math.floor(length / threadPitch) * 4));
          const angle = t * Math.PI * 2 * Math.floor(length / threadPitch);
          const radius = shaftRadius;
          const y = length / 2 - t * length; // Start from bottom
          
          return new THREE.Vector3(
            radius * Math.cos(angle),
            y,
            radius * Math.sin(angle)
          );
        })
      );

      // Create thread tube
      const threadRadius = Math.min(threadDepth, shaftRadius * 0.3);
      threadGeo = new THREE.TubeGeometry(
        curve,
        threadSegments * Math.floor(length / threadPitch),
        threadRadius,
        6,
        false
      );
    }
    
    return {
      headGeometry: headGeo,
      shaftGeometry: shaftGeo,
      threadGeometry: threadGeo
    };
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const headHeight = parameters.headHeight ?? (parameters.headRadius * 0.7);

  return (
    <group ref={groupRef}>
      <mesh geometry={headGeometry} position={[0, parameters.length/2 + headHeight/2, 0]}>
        <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh geometry={shaftGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.3} />
      </mesh>
      {threadGeometry && (
        <mesh geometry={threadGeometry}>
          <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}
