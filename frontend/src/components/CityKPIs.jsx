import useTrafficStore
from "../store/useTrafficStore";

export default function CityKPIs() {

  const congestion =
    useTrafficStore(
      s => s.congestion
    );

  return (

    <div className="
      grid
      grid-cols-4
      gap-3
    ">

      <div className="card">
        Vehicles 12,847
      </div>

      <div className="card">
        Speed 42km/h
      </div>

      <div className="card">
        Congestion {congestion}%
      </div>

      <div className="card">
        AI Efficiency 94%
      </div>

    </div>

  );
}