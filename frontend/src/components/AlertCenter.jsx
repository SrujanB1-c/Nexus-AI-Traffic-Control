export default function AlertCenter() {
  const alerts = [
    "Accident detected at Junction 12",
    "Heavy congestion predicted",
    "Ambulance route activated"
  ];

  return (
    <div className="rounded-xl p-4 bg-white/5 border border-red-500/20">

      <h2 className="text-red-400 font-bold">
        Live Alerts
      </h2>

      {alerts.map((a, i) => (
        <div
          key={i}
          className="mt-2 text-sm"
        >
          {a}
        </div>
      ))}

    </div>
  );
}