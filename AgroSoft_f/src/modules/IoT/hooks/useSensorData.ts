import { useEffect, useState } from "react";
import { Sensor } from "../types/sensorTypes";

export default function useSensorData(sensorId: number) {
  const [sensorData, setSensorData] = useState<Sensor | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      try {
        const data: Sensor = JSON.parse(event.data);
        if (data.id === sensorId) {
          setSensorData(data);
        }
      } catch (error) {
        console.error("❌ Error al recibir datos:", error);
      }
    };

    ws.onerror = () => console.warn("⚠️ WebSocket error");
    ws.onclose = () => console.warn("⚠️ WebSocket cerrado");

    return () => ws.close();
  }, [sensorId]);

  return sensorData;
}