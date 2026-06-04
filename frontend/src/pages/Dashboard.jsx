import { motion } from "framer-motion";
import CityScene from "../digital-twin/CityScene";
import RLBrain from "../ai/RLBrain";
import PredictionPanel from "../ai/PredictionPanel";
import YOLOPanel from "../ai/YOLOPanel";
import KPIGrid from "../components/KPIGrid";
import ControlCenter from "../components/ControlCenter";
import EmergencyPanel from "../components/EmergencyPanel";
import TrafficChart from "../charts/TrafficChart";

import { useNexusStore } from "../store/useNexusStore";
import useTrafficSocket from "../hooks/useTrafficSocket";

export default function Dashboard() {
  // Activate socket listener / simulation
  useTrafficSocket();

  const emergencyMode = useNexusStore((s) => s.emergencyMode);
  const simulationRunning = useNexusStore((s) => s.simulationRunning);
  const toggleEmergency = useNexusStore((s) => s.toggleEmergency);
  const toggleSimulation = useNexusStore((s) => s.toggleSimulation);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#050816] text-white">

      <header className="flex h-16 items-center justify-between border-b border-cyan-500/20 px-6 backdrop-blur-xl">

        <div>
          <h1 className="text-2xl font-bold text-cyan-400">
            AI Traffic Nexus
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            onClick={toggleEmergency}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              emergencyMode
                ? "border-red-500 bg-red-500/40 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                : "border-cyan-400 bg-cyan-500/20 text-cyan-100 hover:bg-cyan-500/30"
            }`}
          >
            {emergencyMode ? "Emergency Active" : "Emergency Mode"}
          </button>

          <button
            onClick={toggleSimulation}
            className={`rounded-lg border px-4 py-2 text-sm transition ${
              simulationRunning
                ? "border-purple-400 bg-purple-500/20 text-purple-100 hover:bg-purple-500/30"
                : "border-amber-400 bg-amber-500/40 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            }`}
          >
            {simulationRunning ? "Simulation Running" : "Simulation Paused"}
          </button>
        </div>

      </header>

      <main className="nexus-main flex h-[calc(100vh-64px)]">

        <div className="relative w-[68%] border-r border-cyan-500/10">
          <CityScene />
        </div>

        <aside className="w-[32%] overflow-y-auto p-3 flex flex-col gap-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <KPIGrid />
            <RLBrain />
          </motion.div>

          <ControlCenter />

          <div>
            <EmergencyPanel />
          </div>

          <YOLOPanel />

          <PredictionPanel />

          <div>
            <TrafficChart />
          </div>

        </aside>

      </main>

    </div>
  );
}
