
import React from 'react';
import { Material } from '@/hooks/useMockGraphQL';

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
            className={`p-3 rounded border-2 transition-all ${
              selectedMaterial.id === material.id
                ? 'border-mechanical-blue bg-mechanical-lightblue/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            aria-pressed={selectedMaterial.id === material.id}
          >
            <div className="flex items-center">
              <div
                className="w-6 h-6 rounded-full mr-2"
                style={{ backgroundColor: material.color }}
                aria-hidden="true"
              ></div>
              <span>{material.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MaterialSelector;
