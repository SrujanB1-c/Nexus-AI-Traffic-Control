import { useMemo } from "react";

export default function HeatMap() {
  const zones = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 40 - 20,
        z: Math.random() * 40 - 20
      })),
    []
  );

  return (
    <>
      {zones.map((z, idx) => (
        <mesh
          key={idx}
          position={[z.x, 0.03, z.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[2]} />

          <meshBasicMaterial
            color="red"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}
