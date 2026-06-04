import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function BrainCore() {

  const ref = useRef();

  useFrame(() => {

    if (!ref.current) return;

    ref.current.rotation.y += 0.01;

    ref.current.rotation.x += 0.005;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2, 4]} />

      <meshStandardMaterial
        wireframe
        color="#00ffff"
      />
    </mesh>
  );
}

export default function HolographicRLBrain() {
  return (
    <div className="h-[350px]">

      <Canvas>

        <ambientLight />

        <pointLight position={[5, 5, 5]} />

        <BrainCore />

      </Canvas>

    </div>
  );
}