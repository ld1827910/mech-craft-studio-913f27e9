
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpringProps {
  parameters: {
    radius: number;
    thickness: number;
    coils: number;
    height: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function SpringModel({ parameters, material, autoRotate = false }: SpringProps) {
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

  const springGeometry = useMemo(() => {
    const { radius, thickness, coils, height } = parameters;
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: coils * 20 }, (_, i) => {
        const t = i / (coils * 20 - 1);
        const angle = t * Math.PI * 2 * coils;
        return new THREE.Vector3(
          radius * Math.cos(angle),
          height * t - height/2,
          radius * Math.sin(angle)
        );
      })
    );
    
    return new THREE.TubeGeometry(curve, coils * 20, thickness/2, 8, false);
  }, [parameters]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} geometry={springGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
      />
    </mesh>
  );
}
