import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { useNexusStore } from "../store/useNexusStore";
import { junctions, getJunctionLightColor } from "./TrafficLights";

const roadOptions = [0, 10, -10];

export default function Vehicles() {
  const cars = useRef([]);
  
  const simulationRunning = useNexusStore((s) => s.simulationRunning);
  const emergencyMode = useNexusStore((s) => s.emergencyMode);
  const rainMode = useNexusStore((s) => s.rainMode);
  const signalOverride = useNexusStore((s) => s.signalOverride);
  const accidentPosition = useNexusStore((s) => s.accidentPosition);

  // Initialize cars on the grid
  const initialData = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const isVertical = Math.random() > 0.5;
      const roadCoord = roadOptions[Math.floor(Math.random() * roadOptions.length)];
      const startPos = Math.random() * 60 - 30; // Between -30 and 30
      const isEmergencyPriority = i % 5 === 0;
      
      return {
        isVertical,
        fixed: roadCoord,
        movingVal: startPos,
        direction: Math.random() > 0.5 ? 1 : -1,
        speed: 0.08 + Math.random() * 0.12,
        color: isEmergencyPriority ? "#ef4444" : "#06b6d4", // some red (emergency/priority) and some cyan
        isEmergencyPriority
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!simulationRunning) return;

    initialData.forEach((carState, i) => {
      const carMesh = cars.current[i];
      if (!carMesh) return;

      // Check if vehicle should stop due to traffic light or accident
      let shouldStop = false;

      // Stop near accident position
      if (accidentPosition) {
        let currentX = carState.isVertical ? carState.fixed : carState.movingVal;
        let currentZ = carState.isVertical ? carState.movingVal : carState.fixed;
        const dx = currentX - accidentPosition[0];
        const dz = currentZ - accidentPosition[1];
        const distToAccident = Math.sqrt(dx * dx + dz * dz);
        
        // Stop if approaching within 1.0 - 4.5 units of the accident
        if (distToAccident < 4.5 && distToAccident > 1.0) {
          shouldStop = true;
        }
      }

      // Find if we are approaching a junction
      if (!shouldStop) {
        junctions.forEach((j, idx) => {
          const [jX, jZ] = j;
          
          if (carState.isVertical) {
            // Vertical vehicle moving along Z at x = fixed
            if (carState.fixed === jX) {
              const dist = jZ - carState.movingVal;
              // Approaching junction from negative direction
              if (carState.direction === 1 && dist > 0.8 && dist < 2.5) {
                const lightColor = getJunctionLightColor(jX, jZ, idx, clock.elapsedTime, signalOverride, emergencyMode);
                if (lightColor === "#ef4444" || lightColor === "#eab308") {
                  shouldStop = true;
                }
              }
              // Approaching junction from positive direction
              else if (carState.direction === -1 && dist < -0.8 && dist > -2.5) {
                const lightColor = getJunctionLightColor(jX, jZ, idx, clock.elapsedTime, signalOverride, emergencyMode);
                if (lightColor === "#ef4444" || lightColor === "#eab308") {
                  shouldStop = true;
                }
              }
            }
          } else {
            // Horizontal vehicle moving along X at z = fixed
            if (carState.fixed === jZ) {
              const dist = jX - carState.movingVal;
              // Approaching junction from negative direction
              if (carState.direction === 1 && dist > 0.8 && dist < 2.5) {
                const lightColor = getJunctionLightColor(jX, jZ, idx, clock.elapsedTime, signalOverride, emergencyMode);
                // Horizontal traffic is RED if vertical color is green/yellow
                if (lightColor === "#22c55e" || lightColor === "#eab308") {
                  shouldStop = true;
                }
              }
              // Approaching junction from positive direction
              else if (carState.direction === -1 && dist < -0.8 && dist > -2.5) {
                const lightColor = getJunctionLightColor(jX, jZ, idx, clock.elapsedTime, signalOverride, emergencyMode);
                if (lightColor === "#22c55e" || lightColor === "#eab308") {
                  shouldStop = true;
                }
              }
            }
          }
        });
      }

      // Override stop logic for priority/emergency vehicles when emergency mode is active
      if (carState.isEmergencyPriority && emergencyMode) {
        shouldStop = false;
      }

      // Adjust speed based on global variables
      let currentSpeed = shouldStop ? 0 : carState.speed;
      if (currentSpeed > 0) {
        if (emergencyMode) {
          // Priority vehicles run faster, normal vehicles yield (slow down even more)
          currentSpeed = carState.isEmergencyPriority ? carState.speed * 1.5 : carState.speed * 0.4;
        } else if (rainMode) {
          currentSpeed *= 0.6;
        }
      }

      // Update position along road
      carState.movingVal += carState.direction * currentSpeed;

      // Boundary check -> wrap around
      if (carState.movingVal > 30) {
        carState.movingVal = -30;
      } else if (carState.movingVal < -30) {
        carState.movingVal = 30;
      }

      // Turn logic if moving (to prevent turning while stopped at red light)
      if (currentSpeed > 0) {
        const nearIntersection = roadOptions.some(opt => Math.abs(carState.movingVal - opt) < 0.15);
        if (nearIntersection && Math.random() < 0.02) {
          const intersectionVal = roadOptions.find(opt => Math.abs(carState.movingVal - opt) < 0.15);
          carState.movingVal = intersectionVal;
          
          const temp = carState.fixed;
          carState.fixed = intersectionVal;
          carState.isVertical = !carState.isVertical;
          carState.movingVal = temp;
          if (Math.random() > 0.5) carState.direction *= -1;
        }
      }

      // Set 3D position and rotation
      if (carState.isVertical) {
        carMesh.position.set(carState.fixed, 0.3, carState.movingVal);
        carMesh.rotation.set(0, carState.direction > 0 ? 0 : Math.PI, 0);
      } else {
        carMesh.position.set(carState.movingVal, 0.3, carState.fixed);
        carMesh.rotation.set(0, carState.direction > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
      }
    });
  });

  return (
    <group>
      {initialData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => (cars.current[i] = el)}
          position={[0, 0.3, 0]}
        >
          <boxGeometry args={[0.6, 0.4, 1.2]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}