import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNexusStore } from "../store/useNexusStore";

// Placing lights at road junctions: combinations of x = 0, 10, -10 and z = 0, 10, -10
export const junctions = [
  [-10, 0], [-10, 10], [-10, -10],
  [0, 0], [0, 10], [0, -10],
  [10, 0], [10, 10], [10, -10]
];

export function getJunctionLightColor(x, z, idx, elapsedTime, signalOverride, emergencyMode) {
  if (signalOverride) {
    const blink = Math.floor(elapsedTime * 2) % 2 === 0;
    return blink ? "#eab308" : "#27272a";
  }
  if (emergencyMode) {
    // Vertical road x = 0 (emergency corridor) is green, all crossing or other roads red
    return x === 0 ? "#22c55e" : "#ef4444";
  }
  
  const cycleTime = elapsedTime % 8; // 8s total cycle
  const isTypeA = idx % 2 === 0;
  
  let verticalColor = "#ef4444";
  if (cycleTime < 3.5) {
    verticalColor = "#22c55e"; // Green
  } else if (cycleTime < 4.5) {
    verticalColor = "#eab308"; // Yellow
  } else {
    verticalColor = "#ef4444"; // Red
  }

  // Reverse color for Type B junctions
  if (!isTypeA) {
    if (verticalColor === "#22c55e") verticalColor = "#ef4444";
    else if (verticalColor === "#ef4444") verticalColor = "#22c55e";
  }

  return verticalColor;
}

export default function TrafficLights() {
  const signalOverride = useNexusStore((s) => s.signalOverride);
  const emergencyMode = useNexusStore((s) => s.emergencyMode);
  
  const bulbsRef = useRef([]);
  const lightsRef = useRef([]);

  useFrame(({ clock }) => {
    junctions.forEach((j, idx) => {
      const color = getJunctionLightColor(j[0], j[1], idx, clock.elapsedTime, signalOverride, emergencyMode);
      
      if (bulbsRef.current[idx]) {
        bulbsRef.current[idx].material.color.set(color);
      }
      if (lightsRef.current[idx]) {
        lightsRef.current[idx].color.set(color);
      }
    });
  });

  return (
    <group>
      {junctions.map((j, idx) => (
        <group key={idx} position={[j[0], 0, j[1]]}>
          {/* Pole */}
          <mesh position={[1.2, 1, 1.2]}>
            <cylinderGeometry args={[0.08, 0.08, 2]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
          {/* Light Head */}
          <mesh position={[1.2, 2.1, 1.2]}>
            <boxGeometry args={[0.3, 0.5, 0.3]} />
            <meshStandardMaterial color="#1f2937" />
          </mesh>
          {/* Active bulb pointlight */}
          <pointLight
            ref={(el) => (lightsRef.current[idx] = el)}
            position={[1.2, 2.1, 1.2]}
            color="#ef4444"
            intensity={1.5}
            distance={8}
          />
          {/* Visual bulb */}
          <mesh
            ref={(el) => (bulbsRef.current[idx] = el)}
            position={[1.2, 2.1, 1.05]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>
      ))}
    </group>
  );
}