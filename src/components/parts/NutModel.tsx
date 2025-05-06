
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NutProps {
  parameters: {
    radius: number;
    height: number;
    holeRadius: number;
    chamferSize?: number;
    sides?: number;
    texture?: number;
  };
  material: string;
  autoRotate?: boolean;
}

export default function NutModel({ parameters, material, autoRotate = false }: NutProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Make material color consistent with other parts
  const materialColor = useMemo(() => {
    switch(material) {
      case 'steel': return new THREE.Color('#8E9196');
      case 'aluminum': return new THREE.Color('#D6D6D6');
      case 'brass': return new THREE.Color('#CFB53B');
      case 'copper': return new THREE.Color('#B87333');
      default: return new THREE.Color('#8E9196');
    }
  }, [material]);

  const nutGeometry = useMemo(() => {
    try {
      // Extract parameters with defaults
      const { radius, height } = parameters;
      const sides = parameters.sides ?? 6; // Default to hex nut (6 sides)
      const chamferSize = parameters.chamferSize ?? 0.1;
      
      // Set reasonable hole size constraints for a realistic nut
      let holeRadius = parameters.holeRadius;
      const minHoleSize = radius * 0.35; // Minimum 35% of radius for realistic nut
      const maxHoleSize = radius * 0.75; // Maximum 75% to maintain structure
      
      if (holeRadius < minHoleSize) {
        holeRadius = minHoleSize;
      } else if (holeRadius > maxHoleSize) {
        holeRadius = maxHoleSize;
      }
      
      // Create the basic polygon shape based on sides
      const shape = new THREE.Shape();
      for (let i = 0; i < sides; i++) {
        const angle = (i * Math.PI * 2) / sides;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
      }
      shape.closePath();
      
      // Create the center hole
      const holePath = new THREE.Path();
      holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(holePath);
      
      // Extrusion settings with proper chamfer
      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: chamferSize * radius * 0.5,
        bevelThickness: chamferSize * height * 0.5,
        steps: 1,
        curveSegments: Math.max(sides * 2, 16) // Higher segments for smoother edges
      };
      
      // Create the extruded geometry
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      
      // Add thread texture to the hole - with error handling
      if (geometry.attributes && geometry.attributes.position) {
        const positionAttr = geometry.getAttribute('position');
        const vertex = new THREE.Vector3();
        
        // Find inner hole vertices
        for (let i = 0; i < positionAttr.count; i++) {
          vertex.fromBufferAttribute(positionAttr, i);
          const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
          
          // Check if vertex is part of the inner hole
          if (distFromCenter <= holeRadius * 1.1 && distFromCenter >= holeRadius * 0.9) {
            // Thread pattern based on y-position
            const threadPitch = height / 6; // 6 threads along height
            const threadDepth = holeRadius * 0.1; // 10% thread depth for visibility
            const threadAngle = (vertex.y / threadPitch) * Math.PI * 2;
            
            // Calculate thread displacement
            const threadOffset = Math.sin(threadAngle) * threadDepth;
            
            // Direction toward center
            const dirX = -vertex.x;
            const dirZ = -vertex.z;
            const len = Math.sqrt(dirX * dirX + dirZ * dirZ);
            
            if (len > 0) {
              // Move vertex inward/outward for thread pattern
              const normX = dirX / len;
              const normZ = dirZ / len;
              
              vertex.x += normX * threadOffset;
              vertex.z += normZ * threadOffset;
              
              positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }
          }
        }
      }
      
      // Add surface texture if enabled
      if (parameters.texture && parameters.texture > 0 && geometry.attributes && geometry.attributes.position) {
        const textureIntensity = Math.min(parameters.texture * 0.003, 0.05);
        const positionAttr = geometry.getAttribute('position');
        const vertex = new THREE.Vector3();
        
        for (let i = 0; i < positionAttr.count; i++) {
          vertex.fromBufferAttribute(positionAttr, i);
          const distFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
          
          // Apply texture only to outer faces
          if (distFromCenter > holeRadius * 1.2) {
            // Add small random displacement for surface texture
            vertex.x += (Math.random() - 0.5) * textureIntensity * radius;
            vertex.y += (Math.random() - 0.5) * textureIntensity * height;
            vertex.z += (Math.random() - 0.5) * textureIntensity * radius;
            
            positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
          }
        }
      }
      
      if (geometry.attributes && geometry.attributes.position) {
        // Update normals for proper lighting
        geometry.computeVertexNormals();
      }
      
      // Center the geometry
      geometry.center();
      
      return geometry;
    } catch (error) {
      console.error("Error creating nut geometry:", error);
      // Fallback to a simple cylinder if there's an error
      return new THREE.CylinderGeometry(parameters.radius * 0.8, parameters.radius * 0.8, parameters.height, 6);
    }
  }, [parameters]);
  
  // Create material with realistic metallic properties
  const nutMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: materialColor,
      metalness: 0.6,  // Matched to other components
      roughness: 0.4,  // Matched to other components
      flatShading: false
    });
  }, [materialColor]);

  // Add rotation animation
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef} 
        geometry={nutGeometry} 
        material={nutMaterial}
        castShadow 
        receiveShadow
      />
    </group>
  );
}
