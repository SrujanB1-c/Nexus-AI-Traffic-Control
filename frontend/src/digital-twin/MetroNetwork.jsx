import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function MetroNetwork() {
  const train = useRef();

  useFrame(({ clock }) => {
    if (!train.current) return;

    train.current.position.x =
      Math.sin(clock.elapsedTime * 0.3) * 18;
  });

  return (
    <mesh ref={train} position={[0, 3, -12]}>
      <boxGeometry args={[3, 1, 1]} />

      <meshStandardMaterial
        color="#06b6d4"
        emissive="#00ffff"
      />
    </mesh>
  );
}