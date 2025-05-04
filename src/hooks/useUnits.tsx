
import { create } from 'zustand';

type UnitSystem = 'metric' | 'imperial';

interface UnitsStore {
  unitSystem: UnitSystem;
  toggleUnitSystem: () => void;
  displayValue: (value: number, needsUnits?: boolean) => string;
  displayUnit: (useShortForm?: boolean) => string;
  convertToCurrentUnit: (valueInMm: number) => number;
  convertToMetric: (value: number) => number;
}

export const useUnits = create<UnitsStore>((set, get) => ({
  unitSystem: 'metric',
  
  toggleUnitSystem: () => set(state => ({ 
    unitSystem: state.unitSystem === 'metric' ? 'imperial' : 'metric' 
  })),
  
  displayValue: (value: number, needsUnits = true) => {
    const { unitSystem } = get();
    const convertedValue = get().convertToCurrentUnit(value);
    
    // Determine decimal precision based on value and unit
    let decimalPlaces = 1;
    if (unitSystem === 'imperial') {
      decimalPlaces = 2; // More precision for inches
    } else if (value < 1) {
      decimalPlaces = 2; // More precision for small metric values
    }
    
    const formatted = convertedValue.toFixed(decimalPlaces);
    
    if (!needsUnits) return formatted;
    
    const unit = get().displayUnit(true);
    return `${formatted} ${unit}`;
  },
  
  displayUnit: (useShortForm = true) => {
    const { unitSystem } = get();
    if (unitSystem === 'metric') {
      return useShortForm ? 'mm' : 'millimeters';
    }
    return useShortForm ? 'in' : 'inches';
  },
  
  convertToCurrentUnit: (valueInMm: number) => {
    const { unitSystem } = get();
    if (unitSystem === 'imperial') {
      // Convert mm to inches (divide by 25.4)
      return valueInMm / 25.4;
    }
    return valueInMm;
  },
  
  convertToMetric: (value: number) => {
    const { unitSystem } = get();
    if (unitSystem === 'imperial') {
      // Convert inches to mm (multiply by 25.4)
      return value * 25.4;
    }
    return value;
  }
}));
