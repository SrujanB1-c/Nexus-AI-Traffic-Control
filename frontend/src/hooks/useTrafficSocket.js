import { useEffect } from "react";
import useTrafficStore from "../store/useTrafficStore";
import { useNexusStore } from "../store/useNexusStore";

export default function useTrafficSocket() {
  const setMetrics = useTrafficStore((s) => s.setMetrics);
  const setRlProgress = useTrafficStore((s) => s.setRlProgress);

  useEffect(() => {
    // Attempt standard WebSocket connection
    let socket = null;
    let fallbackInterval = null;

    try {
      socket = new WebSocket("ws://localhost:8000/ws/traffic");

      socket.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        // Map backend traffic payload to frontend stores
        setMetrics({
          vehicles: payload.vehicles || 12847,
          avgSpeed: payload.avg_speed || 42,
          congestion: payload.congestion || 31,
          signals: payload.signals || 64,
          incidents_count: payload.incidents || 0
        });
      };

      socket.onerror = () => {
        console.warn("WebSocket error, using client-side simulation fallback");
        startLocalSimulation();
      };

      socket.onclose = () => {
        console.warn("WebSocket closed, using client-side simulation fallback");
        startLocalSimulation();
      };
    } catch (e) {
      console.warn("Could not connect to WebSocket, falling back to local simulation", e);
      startLocalSimulation();
    }

    function startLocalSimulation() {
      if (fallbackInterval) return;
      fallbackInterval = setInterval(() => {
        // Read latest states directly from Zustand stores to avoid useEffect reconstruction
        const nexusState = useNexusStore.getState();
        const { simulationRunning, emergencyMode, rainMode, accidentPosition } = nexusState;

        if (!simulationRunning) return;

        // Fluctuations
        let baseSpeed = emergencyMode ? 20 : rainMode ? 32 : 45;
        let baseCongestion = emergencyMode ? 65 : rainMode ? 48 : 28;
        if (accidentPosition) {
          baseCongestion += 20;
          baseSpeed -= 10;
        }

        const deltaSpeed = (Math.random() - 0.5) * 4;
        const deltaCongestion = (Math.random() - 0.5) * 5;
        const deltaVehicles = (Math.random() - 0.5) * 100;

        setMetrics({
          vehicles: Math.max(1000, Math.round(12800 + deltaVehicles)),
          avgSpeed: Math.max(10, Math.round(baseSpeed + deltaSpeed)),
          congestion: Math.min(100, Math.max(5, Math.round(baseCongestion + deltaCongestion))),
          co2: parseFloat((1.1 + Math.random() * 0.2).toFixed(1)),
          fuelSaved: Math.min(40, Math.max(5, Math.round(18 + (Math.random() - 0.5) * 2)))
        });

        // Slowly increment RL Progress
        const trafficState = useTrafficStore.getState();
        setRlProgress(Math.min(100, Math.max(0, Math.round(trafficState.rlProgress + (Math.random() - 0.5) * 2))));
      }, 2000);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      if (fallbackInterval) {
        clearInterval(fallbackInterval);
      }
    };
  }, [setMetrics, setRlProgress]);
}