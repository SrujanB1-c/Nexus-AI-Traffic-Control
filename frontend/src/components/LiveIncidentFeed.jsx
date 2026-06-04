import useTrafficStore from "../store/useTrafficStore";

export default function LiveIncidentFeed() {
  const incidents = useTrafficStore((s) => s.incidents);

  return (
    <div className="rounded-xl bg-white/5 border border-red-500/20 p-4">

      <h2 className="text-red-400 font-bold mb-2">
        Live Incident Feed
      </h2>

      <div className="space-y-2 max-h-[160px] overflow-y-auto">
        {incidents.length === 0 ? (
          <div className="text-gray-500 text-sm">No active incidents</div>
        ) : (
          incidents.map((i) => (
            <div
              key={i.id}
              className="text-sm bg-red-500/10 border-l-2 border-red-500 p-2 rounded-r"
            >
              {i.msg}
            </div>
          ))
        )}
      </div>

    </div>
  );
}