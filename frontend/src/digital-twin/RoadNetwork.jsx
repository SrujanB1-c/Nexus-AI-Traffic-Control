import * as THREE from "three";
import { useNexusStore } from "../store/useNexusStore";

// Horizontal roads: z = 0, z = 10, z = -10
// Vertical roads: x = 0, x = 10, x = -10
const horizontalRoads = [0, 10, -10];
const verticalRoads = [0, 10, -10];

export default function RoadNetwork() {
  const emergencyMode = useNexusStore((s) => s.emergencyMode);

  return (
    <group>
      {/* Horizontal road meshes */}
      {horizontalRoads.map((z, idx) => (
        <mesh key={`h-${idx}`} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[60, 2.4]} />
          <meshStandardMaterial color="#1f2937" roughness={0.8} />
        </mesh>
      ))}

      {/* Vertical road meshes */}
      {verticalRoads.map((x, idx) => (
        <mesh key={`v-${idx}`} position={[x, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.4, 60]} />
          <meshStandardMaterial color="#1f2937" roughness={0.8} />
        </mesh>
      ))}

      {/* Emergency Corridor (x = 0 road glows when emergencyMode is active) */}
      {emergencyMode && (
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 60]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Center line markings using a standard clean grid Helper or simple meshes */}
      {/* Instead of transparent gridHelper, we can use simple planes for dashed markers */}
    </group>
  );
}