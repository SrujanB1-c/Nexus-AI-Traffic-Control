export default function WeatherPanel() {

  return (

    <div className="
      rounded-xl
      p-4
      bg-white/5
      border
      border-blue-500/20
    ">

      <h2 className="text-blue-400 font-bold">
        Weather Engine
      </h2>

      <div className="mt-3">

        <div>Condition: Rain</div>

        <div>Temperature: 26°C</div>

        <div>Humidity: 81%</div>

        <div>Visibility: Moderate</div>

      </div>

    </div>

  );
}