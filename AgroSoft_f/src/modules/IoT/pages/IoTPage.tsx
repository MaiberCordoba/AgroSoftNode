import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, addToast } from "@heroui/react";
import {
  WiStrongWind,
  WiThermometer,
  WiDayCloudy,
  WiRaindrop,
  WiHumidity,
  WiRain,
} from "react-icons/wi";
import SensorCard from "../components/SensorCard";
import { SensorLista } from "../components/sensor/SensorListar";
import { UmbralLista } from "../components/umbral/UmbralListar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Umbral } from "../types/sensorTypes";

export default function IoTPages() {
  const navigate = useNavigate();

  const [sensoresData, setSensoresData] = useState<Record<string, string>>({
    viento: "Cargando...",
    temperatura: "Cargando...",
    luzSolar: "Cargando...",
    humedad: "Cargando...",
    humedadAmbiente: "Cargando...",
    lluvia: "Cargando...",
  });

  const [searchId, setSearchId] = useState("");

  const { data: umbrales = [] } = useQuery<Umbral[]>({
    queryKey: ["umbrales"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/umbral");
      return res.data;
    },
  });

  const normalizar = (str: string) => str.toLowerCase().replace(/\s/g, "");

  const mostrarAlerta = (mensaje: string) => {
    addToast({
      title: "🚨 Alerta de Sensor",
      description: mensaje,
      variant: "flat",
      color: "danger",
    });
  };

  useEffect(() => {
    if (umbrales.length === 0) return;

    const sensores = [
      "viento",
      "temperatura",
      "luzSolar",
      "humedad",
      "humedadAmbiente",
      "lluvia",
    ];
    const websockets = new Map<string, WebSocket>();

    sensores.forEach((sensor) => {
      const ws = new WebSocket(`ws://localhost:8080/${sensor}`);

      ws.onopen = () => {
        console.log(`✅ Conectado al WebSocket de ${sensor}`);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const valor = parseFloat(data.valor);

          setSensoresData((prevData) => ({
            ...prevData,
            [sensor]: valor.toFixed(2),
          }));

          const umbral = umbrales.find((u) =>
            u.tipo_sensor && normalizar(u.tipo_sensor) === normalizar(sensor)
          );

          if (umbral) {
            if (valor < umbral.valor_minimo || valor > umbral.valor_maximo) {
              mostrarAlerta(
                `${sensor.toUpperCase()} fuera de umbral.\nValor actual: ${valor}\nRango permitido: ${umbral.valor_minimo} - ${umbral.valor_maximo}`
              );
            }
          }
        } catch (error) {
          console.error(`❌ Error en ${sensor}:`, error);
        }
      };

      ws.onerror = (error) => {
        console.error(`❌ WebSocket error en ${sensor}:`, error);
      };

      ws.onclose = () => {
        console.warn(`⚠️ WebSocket cerrado en ${sensor}`);
      };

      websockets.set(sensor, ws);
    });

    return () => {
      websockets.forEach((ws) => ws.close());
    };
  }, [umbrales]);

  const sensoresList = [
    { id: "viento", title: "Viento", icon: <WiStrongWind size={32} /> },
    { id: "temperatura", title: "Temperatura", icon: <WiThermometer size={32} /> },
    { id: "luzSolar", title: "Luz Solar", icon: <WiDayCloudy size={32} /> },
    { id: "humedad", title: "Humedad", icon: <WiRaindrop size={32} /> },
    { id: "humedadAmbiente", title: "H. Ambiente", icon: <WiHumidity size={32} /> },
    { id: "lluvia", title: "Lluvia", icon: <WiRain size={32} /> },
  ];

  const sensoresFiltrados = sensoresList.filter((sensor) =>
    sensor.title.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 sm:gap-12 justify-center items-center w-full max-w-6xl mx-auto">
      <div className="flex gap-2 w-full max-w-md">
        <Input
          placeholder="Filtrar Sensores..."
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      <br /><br />
      <div className="grid grid-cols-3 flex flex-wrap gap-4 justify-center items-center w-full max-w-6xl mx-auto">
        {sensoresFiltrados.length > 0 ? (
          sensoresFiltrados.map((sensor) => (
            <SensorCard
              key={sensor.id}
              icon={sensor.icon}
              title={sensor.title}
              value={sensoresData[sensor.id] ?? "Cargando..."}
              onClick={() => navigate(`/sensores/${sensor.id}`)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No se encontraron sensores</p>
        )}
      </div>
      <br /><br />
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Lista sensores</h2>
        <SensorLista />
      </div>
<br /><br />
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Umbrales de los sensores</h2>
        <UmbralLista />
      </div>
    </div>
  );
}
