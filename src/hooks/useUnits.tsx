
import { create } from 'zustand';

type UnitState = {
  useMetric: boolean;
  setMetric: (useMetric: boolean) => void;
};

export const useUnits = create<UnitState>((set) => ({
  useMetric: true,
  setMetric: (useMetric: boolean) => set({ useMetric }),
}));
