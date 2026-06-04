import { motion } from "framer-motion";
import useTrafficStore from "../store/useTrafficStore";

export default function KPIGrid() {
  const vehicles = useTrafficStore((s) => s.vehicles);
  const avgSpeed = useTrafficStore((s) => s.avgSpeed);
  const congestion = useTrafficStore((s) => s.congestion);
  const signals = useTrafficStore((s) => s.signals);
  const co2 = useTrafficStore((s) => s.co2);
  const fuelSaved = useTrafficStore((s) => s.fuelSaved);

  const kpis = [
    { title: "Vehicles", value: vehicles.toLocaleString() },
    { title: "Avg Speed", value: `${avgSpeed} km/h` },
    { title: "Congestion", value: `${congestion}%` },
    { title: "Signals", value: signals.toString() },
    { title: "CO2", value: `${co2}T` },
    { title: "Fuel Saved", value: `${fuelSaved}%` }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {kpis.map((item) => (
        <motion.div
          key={item.title}
          whileHover={{ scale: 1.05 }}
          className="rounded-lg border border-cyan-500/20 bg-white/5 p-4"
        >
          <div className="text-gray-400 text-sm">
            {item.title}
          </div>

          <div className="text-cyan-400 text-2xl font-bold">
            {item.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
