export default function EmergencyPanel() {
  return (
    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">

      <h2 className="text-red-400 text-lg font-bold">
        Emergency Corridor
      </h2>

      <div className="mt-4">

        <div>Vehicle: Ambulance</div>

        <div>Route Status: Active</div>

        <div>ETA Reduction: 42%</div>

        <div>Signals Overridden: 12</div>

      </div>

      <button
        className="
        mt-4
        w-full
        py-2
        rounded-lg
        bg-red-500/20
        border
        border-red-400
      "
      >
        Activate Corridor
      </button>

    </div>
  );
}
