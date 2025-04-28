
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface BoltProps {
  parameters: {
    headRadius: number;
    shaftRadius: number;
    length: number;
  };
  material: string;
}

export default function BoltModel({ parameters, material }: BoltProps) {
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

  const { headGeometry, shaftGeometry } = useMemo(() => {
    const { headRadius, shaftRadius, length } = parameters;
    return {
      headGeometry: new THREE.CylinderGeometry(headRadius, headRadius, headRadius * 0.7, 6),
      shaftGeometry: new THREE.CylinderGeometry(shaftRadius, shaftRadius, length, 16)
    };
  }, [parameters]);

  return (
    <group ref={groupRef}>
      <mesh geometry={headGeometry} position={[0, parameters.length/2 + parameters.headRadius * 0.35, 0]}>
        <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh geometry={shaftGeometry} position={[0, 0, 0]}>
        <meshStandardMaterial color={materialColor} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
