
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
            { id: 'teeth', name: 'Number of Teeth', value: 20, min: 8, max: 36, step: 1 },
            { id: 'radius', name: 'Outer Radius', value: 5, min: 3, max: 10, step: 0.1 },
            { id: 'thickness', name: 'Thickness', value: 1, min: 0.5, max: 3, step: 0.1 },
            { id: 'hole', name: 'Center Hole Size', value: 1, min: 0.5, max: 3, step: 0.1 },
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
