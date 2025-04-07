import React, { useState } from "react";
import ModalComponent from "@/components/Modal";
import { usePatchSensor } from "../../hooks/sensor/usePachtSensor";
import { Sensor } from "../../types/sensorTypes";
import { Input, Select, SelectItem } from "@heroui/react";
import { addToast } from "@heroui/toast";

const SENSOR_TYPES = [
  { key: "Temperatura", label: "Temperatura (°C)" },
  { key: "Iluminación", label: "Iluminación (lux)" },
  { key: "Humedad Ambiental", label: "Humedad Ambiental (%)" },
  { key: "Viento", label: "Viento (km/h)" },
  { key: "Lluvia", label: "Lluvia (mm)" },
  { key: "Humedad del Terreno", label: "Humedad del Terreno (%)" },
  { key: "Nivel de PH", label: "Nivel de PH (pH)" },
];

const sensoresLote = ["Temperatura", "Iluminación", "Humedad Ambiental", "Viento", "Lluvia"];
const sensoresEra = ["Humedad del Terreno", "Nivel de PH"];
const tiposValidos = [...sensoresLote, ...sensoresEra];

interface EditarSensorModalProps {
  sensor: Sensor;
  onClose: () => void;
}

const EditarSensorModal: React.FC<EditarSensorModalProps> = ({ sensor, onClose }) => {
  const [tipo_sensor, setTipoSensor] = useState<string>(sensor.tipo_sensor);
  const [fecha, setFecha] = useState<string>(sensor.fecha);
  const [lote_id, setLoteId] = useState<number | null>(sensor.lote_id);
  const [era_id, setEraId] = useState<number | null>(sensor.era_id);

  const { mutate, isPending } = usePatchSensor();

  const handleSubmit = () => {
    if (!tipo_sensor || !fecha) {
      addToast({
        title: "Error",
        description: "Tipo de sensor y fecha son obligatorios.",
        color: "danger",
      });
      return;
    }

    if (!tiposValidos.includes(tipo_sensor)) {
      addToast({
        title: "Error",
        description: "Tipo de sensor inválido.",
        color: "danger",
      });
      return;
    }

    const tieneSoloLote = !!lote_id && !era_id;
    const tieneSoloEra = !!era_id && !lote_id;

    if (!tieneSoloLote && !tieneSoloEra) {
      addToast({
        title: "Error",
        description: "Debes asignar solo un lote o solo una era (no ambos, no ninguno).",
        color: "danger",
      });
      return;
    }

    if (sensoresLote.includes(tipo_sensor) && !lote_id) {
      addToast({
        title: "Error",
        description: `El sensor tipo '${tipo_sensor}' debe estar asociado a un lote.`,
        color: "danger",
      });
      return;
    }

    if (sensoresEra.includes(tipo_sensor) && !era_id) {
      addToast({
        title: "Error",
        description: `El sensor tipo '${tipo_sensor}' debe estar asociado a una era.`,
        color: "danger",
      });
      return;
    }

    mutate(
      {
        id: sensor.id,
        data: {
          tipo_sensor,
          datos_sensor: sensor.datos_sensor,
          fecha,
          lote_id,
          era_id,
        },
      },
      {
        onSuccess: () => {
          addToast({
            title: "Sensor actualizado",
            description: "Los datos del sensor fueron actualizados correctamente.",
            color: "success",
          });
          onClose();
        },
      }
    );
  };

  return (
    <ModalComponent
      isOpen={true}
      onClose={onClose}
      title="Editar Sensor"
      footerButtons={[
        {
          label: isPending ? "Guardando..." : "Guardar",
          color: "success",
          variant: "light",
          onClick: handleSubmit,
        },
      ]}
    >
      <Select
        label="Tipo de Sensor"
        placeholder="Selecciona un tipo"
        selectedKeys={[tipo_sensor]}
        onSelectionChange={(keys) => {
          const selected = Array.from(keys)[0];
          setTipoSensor(selected as string);
        }}
      >
        {SENSOR_TYPES.map((tipo) => (
          <SelectItem key={tipo.key} value={tipo.key}>
            {tipo.label}
          </SelectItem>
        ))}
      </Select>

      <Input
        label="Fecha"
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <Input
        label="ID del Lote"
        type="number"
        value={lote_id !== null ? lote_id.toString() : ""}
        onChange={(e) => {
          const value = e.target.value ? Number(e.target.value) : null;
          setLoteId(value);
          if (value !== null) setEraId(null);
        }}
      />

      <Input
        label="ID de la Era"
        type="number"
        value={era_id !== null ? era_id.toString() : ""}
        onChange={(e) => {
          const value = e.target.value ? Number(e.target.value) : null;
          setEraId(value);
          if (value !== null) setLoteId(null);
        }}
      />
    </ModalComponent>
  );
};

export default EditarSensorModal;
