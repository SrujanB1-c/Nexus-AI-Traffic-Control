import { useState, useEffect } from "react";

export default function useDigitalTwin() {

  const [vehicles, setVehicles] =
    useState([]);

  useEffect(() => {

    const socket =
      new WebSocket(
        "ws://localhost:8000/ws/twin"
      );

    socket.onmessage = (event) => {

      const payload =
        JSON.parse(event.data);

      setVehicles(
        payload.vehicles
      );
    };

    return () => socket.close();

  }, []);

  return vehicles;
}