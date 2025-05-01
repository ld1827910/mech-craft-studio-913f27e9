
import { useState, useEffect } from 'react';

// Mock GraphQL data service
export interface PartParameter {
  id: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
}

export interface Material {
  id: string;
  name: string;
  color: string;
}

export interface PartData {
  parameters: PartParameter[];
  materials: Material[];
}

export const useMockGraphQL = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<PartData | null>(null);

  useEffect(() => {
    // Simulate GraphQL API fetch
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate network latency
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockData: PartData = {
          parameters: [
            // Gear parameters
            { id: 'teeth', name: 'Number of Teeth', value: 20, min: 8, max: 36, step: 1 },
            { id: 'radius', name: 'Outer Radius', value: 5, min: 3, max: 10, step: 0.1 },
            { id: 'thickness', name: 'Thickness', value: 1, min: 0.5, max: 3, step: 0.1 },
            { id: 'hole', name: 'Center Hole Size', value: 1, min: 0.5, max: 3, step: 0.1 },
            { id: 'toothDepthRatio', name: 'Tooth Depth Ratio', value: 0.15, min: 0.05, max: 0.3, step: 0.01 },
            { id: 'toothWidth', name: 'Tooth Width', value: 0.5, min: 0.2, max: 0.8, step: 0.05 },
            { id: 'bevelSize', name: 'Bevel Size', value: 0.02, min: 0, max: 0.2, step: 0.01 },
            
            // Pipe parameters
            { id: 'length', name: 'Length', value: 5, min: 1, max: 20, step: 0.5 },
            { id: 'segments', name: 'Segments', value: 32, min: 8, max: 64, step: 1 },
            { id: 'taper', name: 'Taper', value: 0, min: -0.5, max: 0.5, step: 0.05 },
            
            // Spring parameters
            { id: 'coils', name: 'Number of Coils', value: 5, min: 2, max: 20, step: 1 },
            { id: 'height', name: 'Height', value: 5, min: 1, max: 15, step: 0.5 },
            { id: 'tension', name: 'Tension', value: 0, min: -0.5, max: 0.5, step: 0.05 },
            { id: 'resolution', name: 'Resolution', value: 256, min: 32, max: 512, step: 16 },
            { id: 'waveAmplitude', name: 'Wave Amplitude', value: 0, min: 0, max: 0.5, step: 0.05 },
            { id: 'radialSegments', name: 'Radial Segments', value: 16, min: 3, max: 32, step: 1 },
            
            // Bolt parameters
            { id: 'headRadius', name: 'Head Radius', value: 0.8, min: 0.4, max: 2, step: 0.1 },
            { id: 'shaftRadius', name: 'Shaft Radius', value: 0.4, min: 0.1, max: 1, step: 0.05 },
            { id: 'headHeight', name: 'Head Height', value: 0.6, min: 0.2, max: 1.5, step: 0.1 },
            { id: 'threadDepth', name: 'Thread Depth', value: 0.08, min: 0, max: 0.2, step: 0.01 },
            { id: 'threadPitch', name: 'Thread Pitch', value: 0.2, min: 0.05, max: 0.5, step: 0.05 },
            { id: 'threadSegments', name: 'Thread Segments', value: 32, min: 8, max: 64, step: 4 },
            { id: 'headType', name: 'Head Type', value: 0, min: 0, max: 2, step: 1 },
            { id: 'countersink', name: 'Countersink', value: 0, min: 0, max: 1, step: 0.1 },
            
            // Nut parameters
            { id: 'height', name: 'Height', value: 0.6, min: 0.2, max: 2, step: 0.1 },
            { id: 'holeRadius', name: 'Hole Radius', value: 0.4, min: 0.1, max: 0.8, step: 0.05 },
            { id: 'chamferSize', name: 'Chamfer Size', value: 0.1, min: 0, max: 0.3, step: 0.05 },
            { id: 'sides', name: 'Number of Sides', value: 6, min: 4, max: 8, step: 2 },
            { id: 'texture', name: 'Surface Texture', value: 0, min: 0, max: 1, step: 0.1 },
          ],
          materials: [
            { id: 'steel', name: 'Steel', color: '#A5A5A5' },
            { id: 'aluminum', name: 'Aluminum', color: '#D6D6D6' },
            { id: 'brass', name: 'Brass', color: '#CFB53B' },
            { id: 'copper', name: 'Copper', color: '#B87333' },
          ]
        };
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, data };
};
