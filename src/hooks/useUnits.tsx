
import { create } from 'zustand';

type UnitSystem = 'metric' | 'imperial';

interface UnitsStore {
  unitSystem: UnitSystem;
  toggleUnitSystem: () => void;
  displayValue: (value: number, needsUnits: boolean) => string;
  displayUnit: () => string;
}

export const useUnits = create<UnitsStore>((set, get) => ({
  unitSystem: 'metric',
  
  toggleUnitSystem: () => set(state => ({ 
    unitSystem: state.unitSystem === 'metric' ? 'imperial' : 'metric' 
  })),
  
  displayValue: (value: number, needsUnits: boolean) => {
    if (!needsUnits) return value.toFixed(1);
    
    const { unitSystem } = get();
    if (unitSystem === 'imperial') {
      // Convert mm to inches (divide by 25.4)
      const inches = value / 25.4;
      return inches.toFixed(2);
    }
    
    return value.toFixed(1);
  },
  
  displayUnit: () => {
    const { unitSystem } = get();
    return unitSystem === 'metric' ? 'mm' : 'in';
  }
}));
