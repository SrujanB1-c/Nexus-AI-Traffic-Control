import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useNexusStore } from "../store/useNexusStore";

import Buildings from "./Buildings";
import Vehicles from "./Vehicles";
import RoadNetwork from "./RoadNetwork";
import TrafficLights from "./TrafficLights";
import HeatMap from "./HeatMap";
import MetroNetwork from "./MetroNetwork";
import WeatherEngine from "./WeatherEngine";
import PostProcessing from "../three/PostProcessing";

function AccidentMarker() {
  const accidentPosition = useNexusStore((s) => s.accidentPosition);
  if (!accidentPosition) return null;

  return (
    <group position={[accidentPosition[0], 0.1, accidentPosition[1]]}>
      <pointLight color="#ef4444" intensity={3} distance={10} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.4, 1.5, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" />
      </mesh>
    </group>
  );
}

export default function CityScene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [25, 18, 25], fov: 48 }}
    >
      <color attach="background" args={["#050816"]} />

      <fog attach="fog" args={["#050816", 20, 80]} />

      <ambientLight intensity={0.8} />

      <directionalLight
        position={[20, 30, 10]}
        intensity={2.5}
        color="#e0f2fe"
      />
      <pointLight position={[0, 15, 0]} intensity={1} color="#06b6d4" />

      <Buildings />

      <RoadNetwork />

      <Vehicles />

      <TrafficLights />

      <HeatMap />

      <MetroNetwork />

      <WeatherEngine />

      <AccidentMarker />

      <OrbitControls enableDamping maxPolarAngle={Math.PI / 2.1} />
      <PostProcessing />
    </Canvas>
  );
}
