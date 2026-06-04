export default function MissionControl() {

  return (

    <div
      className="
      rounded-xl
      bg-white/5
      border
      border-cyan-500/20
      p-4
    "
    >

      <h2
        className="
        text-cyan-400
        text-xl
        font-bold
      "
      >
        Mission Control
      </h2>

      <div className="mt-4">

        <button className="w-full p-3 mb-2 rounded bg-cyan-500/10">
          Launch Simulation
        </button>

        <button className="w-full p-3 mb-2 rounded bg-cyan-500/10">
          Enable AI Optimization
        </button>

        <button className="w-full p-3 rounded bg-red-500/10">
          Emergency Override
        </button>

      </div>

    </div>

  );
}