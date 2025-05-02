
import React from 'react';
import { Material } from '@/hooks/useMockGraphQL';
import { Check } from 'lucide-react';

interface MaterialSelectorProps {
  materials: Material[];
  selectedMaterial: Material;
  onMaterialChange: (material: Material) => void;
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  materials,
  selectedMaterial,
  onMaterialChange,
}) => {
  return (
    <div className='mt-6 pt-4 border-t'>
      <h3 className="text-lg font-medium mb-4">Material</h3>
      <div className="grid grid-cols-2 gap-3">
        {materials.map((material) => (
          <button
            key={material.id}
            onClick={() => onMaterialChange(material)}
            className={`p-3 rounded-lg border-2 transition-all relative ${
              selectedMaterial.id === material.id
                ? 'border-mechanical-blue bg-mechanical-lightblue/20'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            aria-pressed={selectedMaterial.id === material.id}
          >
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full mr-3 shadow-inner"
                style={{ backgroundColor: material.color }}
                aria-hidden="true"
              ></div>
              <span className="font-medium">{material.name}</span>
            </div>
            
            {selectedMaterial.id === material.id && (
              <div className="absolute top-1 right-1 bg-mechanical-blue text-white rounded-full p-0.5">
                <Check className="h-3 w-3" />
              </div>
            )}
            
            <div className="mt-2 text-xs text-gray-500 text-left hidden md:block">
              {getMaterialDescription(material.id)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to return material descriptions
function getMaterialDescription(id: string): string {
  const descriptions: Record<string, string> = {
    steel: "High strength, good for mechanical parts with high stress",
    aluminum: "Lightweight with good corrosion resistance",
    brass: "Excellent machinability and electrical conductivity",
    copper: "Superior thermal conductivity, ideal for heat exchange",
    titanium: "Exceptional strength-to-weight ratio, corrosion resistant",
    plastic: "Lightweight, good electrical insulator, cost-effective",
  };
  
  return descriptions[id] || "";
}

export default MaterialSelector;
