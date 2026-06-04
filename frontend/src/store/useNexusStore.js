import { create } from "zustand";

export const useNexusStore = create((set) => ({
  emergencyMode: false,
  simulationRunning: true,
  rainMode: false,
  signalOverride: false,
  accidentPosition: null,

  toggleEmergency: () => set((state) => ({ emergencyMode: !state.emergencyMode })),
  toggleSimulation: () => set((state) => ({ simulationRunning: !state.simulationRunning })),
  toggleRain: () => set((state) => ({ rainMode: !state.rainMode })),
  toggleSignalOverride: () => set((state) => ({ signalOverride: !state.signalOverride })),
  setAccidentPosition: (pos) => set({ accidentPosition: pos })
}));