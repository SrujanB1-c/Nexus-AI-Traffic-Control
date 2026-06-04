import { motion } from "framer-motion";
import useTrafficStore from "../store/useTrafficStore";

export default function RLBrain() {
  const rlProgress = useTrafficStore((s) => s.rlProgress);

  return (
    <motion.div
      className="mb-4 rounded-lg border border-cyan-500/30 bg-white/5 p-4 backdrop-blur-xl"
      animate={{
        boxShadow: [
          "0 0 10px rgba(6,182,212,0.3)",
          "0 0 20px rgba(6,182,212,0.5)",
          "0 0 10px rgba(6,182,212,0.3)"
        ]
      }}
      transition={{
        repeat: Infinity,
        duration: 3
      }}
    >
      <h2 className="text-cyan-400 text-xl font-bold">
        RL Brain
      </h2>

      <div className="mt-3">

        <div className="mb-2 text-sm text-gray-300">
          Learning Progress ({rlProgress}%)
        </div>

        <div className="w-full h-3 bg-gray-800 rounded overflow-hidden">

          <motion.div
            className="h-3 bg-cyan-400 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${rlProgress}%` }}
            transition={{ duration: 1 }}
          />

        </div>

      </div>
    </motion.div>
  );
}
