export default function YOLOPanel() {
  return (
    <div className="mb-4 rounded-lg border border-cyan-500/20 bg-white/5 p-4">

      <h2 className="text-cyan-400 font-bold">
        AI Vision Network
      </h2>

      <div className="grid grid-cols-2 gap-2 mt-3">

        <div>Cars: 124</div>
        <div>Bikes: 76</div>

        <div>Buses: 12</div>
        <div>Trucks: 7</div>

        <div>Pedestrians: 44</div>
        <div>Confidence: 98%</div>

      </div>

    </div>
  );
}
