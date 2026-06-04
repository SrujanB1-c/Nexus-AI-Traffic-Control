import { create } from "zustand";

const useTrafficStore = create((set) => ({
  vehicles: 12847,
  avgSpeed: 42,
  congestion: 31,
  signals: 64,
  co2: 1.2,
  fuelSaved: 18,
  rlProgress: 82,
  incidents: [
    { id: 1, msg: "Accident at Junction A" },
    { id: 2, msg: "Heavy Traffic MG Road" }
  ],
  weather: "Rain",

  setMetrics: (metrics) => set((state) => ({ ...state, ...metrics })),
  setVehicles: (vehicles) => set({ vehicles }),
  setIncidents: (incidents) => set({ incidents }),
  addIncident: (incident) => set((state) => ({ incidents: [incident, ...state.incidents] })),
  setWeather: (weather) => set({ weather }),
  setCongestion: (congestion) => set({ congestion }),
  setRlProgress: (rlProgress) => set({ rlProgress })
}));

export default useTrafficStore;