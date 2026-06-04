import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useNexusStore } from "../store/useNexusStore";

export default function WeatherEngine() {
  const rain = useRef([]);
  const rainMode = useNexusStore((s) => s.rainMode);

  const drops = useMemo(
    () =>
      Array.from({ length: 500 }, () => [
        Math.random() * 60 - 30,
        Math.random() * 25,
        Math.random() * 60 - 30
      ]),
    []
  );

  useFrame(() => {
    rain.current.forEach((drop) => {
      if (!drop) return;

      // Slower fall or faster fall based on rainMode
      const speed = rainMode ? 0.6 : 0.15;
      drop.position.y -= speed;

      if (drop.position.y < 0) {
        drop.position.y = 25;
      }
    });
  });

  return (
    <group>
      {drops.map((position, i) => {
        // Render fewer/semi-invisible particles if rain mode is off to represent mist
        const showDrop = rainMode ? true : i % 4 === 0;
        if (!showDrop) return null;

        return (
          <mesh
            key={i}
            ref={(el) => (rain.current[i] = el)}
            position={position}
          >
            <boxGeometry args={[0.02, 0.4, 0.02]} />
            <meshBasicMaterial color="#7dd3fc" transparent opacity={rainMode ? 0.6 : 0.2} />
          </mesh>
        );
      })}
    </group>
  );
}
