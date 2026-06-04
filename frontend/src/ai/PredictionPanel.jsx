export default function PredictionPanel() {
  return (
    <div className="rounded-lg border border-purple-500/20 bg-white/5 p-4">

      <h2 className="text-purple-400 font-bold">
        Predictive Intelligence
      </h2>

      <div className="mt-3 space-y-2">

        <div>
          5 min: Low Congestion
        </div>

        <div>
          15 min: Moderate
        </div>

        <div>
          30 min: Heavy Traffic
        </div>

        <div>
          1 Hour: Severe Bottleneck
        </div>

      </div>

    </div>
  );
}
