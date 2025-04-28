
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface NutProps {
  parameters: {
    radius: number;
    height: number;
    holeRadius: number;
  };
  material: string;
}

export default function NutModel({ parameters, material }: NutProps) {
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

  const nutGeometry = useMemo(() => {
    const { radius, height, holeRadius } = parameters;
    
    const shape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    }
    shape.closePath();

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
    shape.holes.push(holePath);

    const extrudeSettings = {
      depth: height,
      bevelEnabled: false
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();
    return geometry;
  }, [parameters]);

  return (
    <mesh ref={meshRef} geometry={nutGeometry}>
      <meshStandardMaterial 
        color={materialColor} 
        metalness={0.7} 
        roughness={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
