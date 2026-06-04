import { Canvas } from "@react-three/fiber";

export default function HolographicBrain() {
  return (
    <div className="h-[300px]">

      <Canvas>

        <ambientLight />

        <mesh rotation={[0.4, 0.4, 0]}>

          <sphereGeometry args={[2, 64, 64]} />

          <meshStandardMaterial
            wireframe
            color="#00ffff"
          />

        </mesh>

      </Canvas>

    </div>
  );
}