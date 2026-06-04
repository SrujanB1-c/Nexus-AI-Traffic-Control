import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { time: "09:00", traffic: 30 },
  { time: "10:00", traffic: 42 },
  { time: "11:00", traffic: 65 },
  { time: "12:00", traffic: 85 },
  { time: "13:00", traffic: 55 }
];

export default function TrafficChart() {
  return (
    <div className="rounded-lg bg-white/5 p-4">

      <h2 className="text-cyan-400 mb-3">
        Traffic Flow
      </h2>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis dataKey="time" />
          <Tooltip />
          <Area
            dataKey="traffic"
            stroke="#00ffff"
            fill="#00ffff"
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}
