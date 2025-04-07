import { useState } from "react";
import { usePostSensor } from "../../hooks/sensor/usePostSensor";
import { useQuery } from "@tanstack/react-query";
import ModalComponent from "@/components/Modal";
import { Input, Select, SelectItem } from "@heroui/react";
import { addToast } from "@heroui/toast";
import { Sensor } from "../../types/sensorTypes";

interface Lote {
  id: number;
  nombre: string;
}

interface Era {
  id: number;
}

const SENSOR_TYPES = [
  { key: "Temperatura", label: "Temperatura (°C)" },
  { key: "Iluminación", label: "Iluminación (lux)" },
  { key: "Humedad Ambiental", label: "Humedad Ambiental (%)" },
  { key: "Viento", label: "Viento (km/h)" },
  { key: "Lluvia", label: "Lluvia (mm)" },
  { key: "Humedad del Terreno", label: "Humedad del Terreno (%)" },
  { key: "Nivel de PH", label: "Nivel de PH (pH)" },
];

type SensorCreateData = Omit<Sensor, "id">;

interface CrearSensorModalProps {
  onClose: () => void;
}

const fetchLotes = async (): Promise<Lote[]> => {
  const res = await fetch("http://localhost:3000/lote", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhY2lvbiI6MTA4NDMzMTczMSwibm9tYnJlIjoiYWRtaW4gY29yZG9iYSIsImNvcnJlb0VsZWN0cm9uaWNvIjoiYWRtaW5AZ21haWwuY29tIiwiYWRtaW4iOjAsImlhdCI6MTc0Mzk1MzkzMn0.GcG2Pifg7BYswjiHtvaonGwJlbZKvJFS4rSrZEuCzTM`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener los lotes");
  return res.json();
};

const fetchEras = async (): Promise<Era[]> => {
  const res = await fetch("http://localhost:3000/eras", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWNhY2lvbiI6MTA4NDMzMTczMSwibm9tYnJlIjoiYWRtaW4gY29yZG9iYSIsImNvcnJlb0VsZWN0cm9uaWNvIjoiYWRtaW5AZ21haWwuY29tIiwiYWRtaW4iOjAsImlhdCI6MTc0Mzk1MzkzMn0.GcG2Pifg7BYswjiHtvaonGwJlbZKvJFS4rSrZEuCzTM`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener las eras");
  return res.json();
};

export const CrearSensorModal = ({ onClose }: CrearSensorModalProps) => {
  const [tipo_sensor, setTipo_sensor] = useState<SensorCreateData["tipo_sensor"] | null>(null);
  const [datos_sensor, setDatos_sensor] = useState<number | null>(null);
  const [lote_id, setLote_id] = useState<number | null>(null);
  const [era_id, setEra_id] = useState<number | null>(null);
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split("T")[0]);

  const { data: lotes = [] } = useQuery<Lote[]>({
    queryKey: ["lotes"],
    queryFn: fetchLotes,
  });

  const { data: eras = [] } = useQuery<Era[]>({
    queryKey: ["eras"],
    queryFn: fetchEras,
  });

  const sensoresLote = ["Temperatura", "Iluminación", "Humedad Ambiental", "Viento", "Lluvia"];
  const sensoresEra = ["Humedad del Terreno", "Nivel de PH"];
  const tiposValidos = [...sensoresLote, ...sensoresEra];

  const { mutate, isPending } = usePostSensor();

  const handleSubmit = () => {
    if (!tipo_sensor || datos_sensor === null) {
      addToast({
        title: "Error",
        description: "Tipo de sensor y valor del sensor son obligatorios.",
        color: "danger",
      });
      return;
    }

    if (!tiposValidos.includes(tipo_sensor)) {
      addToast({
        title: "Error",
        description:
          "Tipo de sensor inválido. Usa uno de los permitidos.",
        color: "danger",
      });
      return;
    }

    // Validación de solo uno: lote o era (no ambos, no ninguno)
    const tieneSoloLote = !!lote_id && !era_id;
    const tieneSoloEra = !!era_id && !lote_id;

    if (!tieneSoloLote && !tieneSoloEra) {
      addToast({
        title: "Error",
        description: "Debes seleccionar solo un lote o solo una era, no ambos y no ninguno.",
        color: "danger",
      });
      return;
    }

    if (sensoresLote.includes(tipo_sensor) && !lote_id) {
      addToast({
        title: "Error",
        description: `El sensor tipo '${tipo_sensor}' debe registrarse en un lote.`,
        color: "danger",
      });
      return;
    }

    if (sensoresEra.includes(tipo_sensor) && !era_id) {
      addToast({
        title: "Error",
        description: `El sensor tipo '${tipo_sensor}' debe registrarse en una era.`,
        color: "danger",
      });
      return;
    }

    const sensorData: Sensor = {
      id: 0,
      tipo_sensor,
      datos_sensor,
      lote_id,
      era_id,
      fecha,
    };

    mutate(sensorData, {
      onSuccess: () => {
        addToast({
          title: "Éxito",
          description: "Sensor creado con éxito.",
          color: "success",
        });
        onClose();
        setTipo_sensor(null);
        setDatos_sensor(null);
        setLote_id(null);
        setEra_id(null);
        setFecha(new Date().toISOString().split("T")[0]);
      },
    });
  };

  return (
    <ModalComponent
      isOpen={true}
      onClose={onClose}
      title="Registro de Sensores"
      footerButtons={[
        {
          label: isPending ? "Guardando..." : "Guardar",
          color: "success",
          variant: "light",
          onClick: handleSubmit,
        },
      ]}
    >
      <Input
        label="Valor del Sensor"
        type="number"
        value={datos_sensor !== null ? String(datos_sensor) : ""}
        onChange={(e) => setDatos_sensor(e.target.value ? Number(e.target.value) : null)}
        required
      />

      <Input
        label="Fecha del Registro"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />

      <Select
        label="Tipo de Sensor"
        placeholder="Selecciona un tipo de sensor"
        selectedKeys={tipo_sensor ? [tipo_sensor] : []}
        onSelectionChange={(keys) =>
          setTipo_sensor(Array.from(keys)[0] as SensorCreateData["tipo_sensor"])
        }
      >
        {SENSOR_TYPES.map((sensor) => (
          <SelectItem key={sensor.key}>{sensor.label}</SelectItem>
        ))}
      </Select>

      <Select
        label="Lote"
        placeholder="Selecciona un lote"
        selectedKeys={lote_id !== null ? [String(lote_id)] : []}
        onSelectionChange={(keys) => {
          const selected = Number(Array.from(keys)[0]);
          setLote_id(selected);
          setEra_id(null); // Desactiva era si seleccionas lote
        }}
      >
        {lotes.map((lote) => (
          <SelectItem key={String(lote.id)}>{lote.nombre}</SelectItem>
        ))}
      </Select>

      <Select
        label="Era"
        placeholder="Selecciona una era"
        selectedKeys={era_id !== null ? [String(era_id)] : []}
        onSelectionChange={(keys) => {
          const selected = Number(Array.from(keys)[0]);
          setEra_id(selected);
          setLote_id(null); // Desactiva lote si seleccionas era
        }}
      >
        {eras.map((era) => (
          <SelectItem key={String(era.id)}>{`Era ${era.id}`}</SelectItem>
        ))}
      </Select>
    </ModalComponent>
  );
};
