import { useMemo } from "react";

const roadCoords = [0, 10, -10];
function isOnRoad(coord) {
  return roadCoords.some((rc) => Math.abs(coord - rc) < 2.5);
}

export default function Buildings() {
  const buildings = useMemo(() => {
    const arr = [];
    while (arr.length < 150) {
      const x = Math.random() * 60 - 30;
      const z = Math.random() * 60 - 30;
      if (!isOnRoad(x) && !isOnRoad(z)) {
        arr.push({
          x,
          z,
          h: Math.random() * 8 + 2
        });
      }
    }
    return arr;
  }, []);

  return (
    <>
      {buildings.map((b, idx) => (
        <mesh
          key={idx}
          position={[b.x, b.h / 2, b.z]}
        >
          <boxGeometry args={[1.8, b.h, 1.8]} />

          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#00ffff"
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}
