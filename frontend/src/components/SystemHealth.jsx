export default function SystemHealth() {

  return (

    <div className="
      rounded-xl
      p-4
      bg-white/5
      border
      border-green-500/20
    ">

      <h2 className="text-green-400 font-bold">
        System Health
      </h2>

      <div className="mt-3 space-y-2">

        <div>AI Engine: Online</div>

        <div>Traffic Stream: Active</div>

        <div>YOLO Cluster: Running</div>

        <div>Redis: Connected</div>

        <div>Database: Healthy</div>

      </div>

    </div>

  );
}