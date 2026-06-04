import { useNexusStore } from "../store/useNexusStore";
import useTrafficStore from "../store/useTrafficStore";
import { useState } from "react";

// Stored junctions matching TrafficLights
const junctions = [
  [-10, 0], [-10, 10], [-10, -10],
  [0, 0], [0, 10], [0, -10],
  [10, 0], [10, 10], [10, -10]
];

export default function ControlCenter() {
  const rainMode = useNexusStore((s) => s.rainMode);
  const signalOverride = useNexusStore((s) => s.signalOverride);
  const toggleRain = useNexusStore((s) => s.toggleRain);
  const toggleSignalOverride = useNexusStore((s) => s.toggleSignalOverride);
  const setAccidentPosition = useNexusStore((s) => s.setAccidentPosition);
  
  const setMetrics = useTrafficStore((s) => s.setMetrics);
  const addIncident = useTrafficStore((s) => s.addIncident);
  
  const [optimizing, setOptimizing] = useState(false);

  const handleOptimize = () => {
    if (optimizing) return;
    setOptimizing(true);
    
    // Clear accident on optimize
    setAccidentPosition(null);

    // Simulate progress optimization
    setTimeout(() => {
      setMetrics({
        congestion: 12,
        avgSpeed: 65,
        fuelSaved: 32,
        rlProgress: 98
      });
      setOptimizing(false);
    }, 2000);
  };

  const handleAccidentSim = () => {
    const targetJunction = junctions[Math.floor(Math.random() * junctions.length)];
    
    addIncident({
      id: Date.now(),
      msg: `Accident simulated at Junction (${targetJunction[0]}, ${targetJunction[1]})`
    });
    
    setAccidentPosition(targetJunction);
    
    setMetrics({
      congestion: 68,
      avgSpeed: 18
    });
  };

  return (
    <div className="rounded-lg border border-cyan-500/20 bg-white/5 p-4">

      <h2 className="text-cyan-400 text-lg font-bold">
        Command Center
      </h2>

      <div className="grid grid-cols-2 gap-2 mt-4">

        <button
          onClick={handleOptimize}
          className={`p-2 rounded text-sm font-medium transition ${
            optimizing
              ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400/50"
              : "bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 border border-transparent"
          }`}
        >
          {optimizing ? "Optimizing..." : "AI Optimize"}
        </button>

        <button
          onClick={toggleSignalOverride}
          className={`p-2 rounded text-sm font-medium transition ${
            signalOverride
              ? "bg-amber-500/30 text-amber-300 border border-amber-400/50"
              : "bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 border border-transparent"
          }`}
        >
          {signalOverride ? "Manual Override" : "Override Signal"}
        </button>

        <button
          onClick={handleAccidentSim}
          className="p-2 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 border border-transparent rounded text-sm font-medium transition"
        >
          Accident Sim
        </button>

        <button
          onClick={toggleRain}
          className={`p-2 rounded text-sm font-medium transition ${
            rainMode
              ? "bg-blue-500/30 text-blue-300 border border-blue-400/50"
              : "bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 border border-transparent"
          }`}
        >
          {rainMode ? "Heavy Rain Mode" : "Rain Mode"}
        </button>

      </div>

    </div>
  );
}
