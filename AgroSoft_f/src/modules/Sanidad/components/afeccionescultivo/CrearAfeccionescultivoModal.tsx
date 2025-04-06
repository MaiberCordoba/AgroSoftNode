import { useState } from "react";
import { Input, Select, SelectItem, toast } from "@heroui/react";
import ModalComponent from "@/components/Modal";

import { useGetAfecciones } from "../../hooks/afecciones/useGetAfecciones";
import { EstadoAfeccion } from "../../types";
import { usePostAfeccionCultivo } from "../../hooks/afeccionescultivo/usePostAfeccionescultivo";
import { useGetPlantaciones } from "./../../../Trazabilidad/hooks/plantaciones/useGetPlantaciones";

interface CrearAfeccionCultivoModalProps {
  onClose: () => void;
}

export const CrearAfeccionCultivoModal = ({ onClose }: CrearAfeccionCultivoModalProps) => {
  const [fk_Plantacion, setFk_Plantacion] = useState<number | null>(null);
  const [fk_Plaga, setFk_Plaga] = useState<number | null>(null);
  const [fechaEncuentro, setFechaEncuentro] = useState<string>("");
  const [estado, setEstado] = useState<EstadoAfeccion | "">(EstadoAfeccion.Detectado);

  const { data: tiposPlaga, isLoading: isLoadingTiposPlaga } = useGetAfecciones();
  const { data: plantaciones, isLoading: isLoadingPlantaciones } = useGetPlantaciones();
  const { mutate, isPending } = usePostAfeccionCultivo();

  const handleSubmit = () => {
    if (!fk_Plantacion || !fk_Plaga || !estado || !fechaEncuentro) {
      console.log("Por favor, completa todos los campos.");
      return;
    }

    mutate(
      { fk_Plantacion, fk_Plaga, estado, fechaEncuentro },
      {
        onSuccess: () => {
          onClose();
          setFk_Plantacion(null);
          setFk_Plaga(null);
          setEstado(EstadoAfeccion.Detectado);
          setFechaEncuentro("");
        },
      }
    );
  };

  return (
    <ModalComponent
      isOpen={true}
      onClose={onClose}
      title="Registro de Afección Cultivo"
      footerButtons={[
        {
          label: isPending ? "Guardando..." : "Guardar",
          color: "success",
          variant: "light",
          onClick: handleSubmit,
        },
      ]}
    >
      {/* Selector de Plantación */}
      {isLoadingPlantaciones ? (
        <p>Cargando plantaciones...</p>
      ) : (
        <Select
          label="Plantación"
          placeholder="Selecciona una plantación"
          selectedKeys={fk_Plantacion ? [fk_Plantacion.toString()] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];
            setFk_Plantacion(Number(selectedKey));
          }}
        >
          {(plantaciones || []).map((plantacion) => (
            <SelectItem key={plantacion.id.toString()}>
              {plantacion.id}
            </SelectItem>
          ))}
        </Select>
      )}

      {/* Selector de Plaga */}
      {isLoadingTiposPlaga ? (
        <p>Cargando tipos de plaga...</p>
      ) : (
        <Select
          label="Tipo de Plaga"
          placeholder="Selecciona un tipo de plaga"
          selectedKeys={fk_Plaga ? [fk_Plaga.toString()] : []}
          onSelectionChange={(keys) => {
            const selectedKey = Array.from(keys)[0];
            setFk_Plaga(Number(selectedKey));
          }}
        >
          {(tiposPlaga || []).map((tipo) => (
            <SelectItem key={tipo.id.toString()}>
              {tipo.nombre}
            </SelectItem>
          ))}
        </Select>
      )}

      {/* Selector de estado de la afección */}
      <Select
        label="Estado de la Afección"
        placeholder="Selecciona el estado"
        selectedKeys={estado ? [estado] : []}
        onSelectionChange={(keys) => {
          const selectedState = Array.from(keys)[0];
          setEstado(selectedState as EstadoAfeccion);
        }}
      >
        {Object.values(EstadoAfeccion).map((estado) => (
          <SelectItem key={estado}>{estado}</SelectItem>
        ))}
      </Select>

      {/* Campo de fecha de encuentro */}
      <Input
        label="Fecha del Encuentro"
        type="date"
        value={fechaEncuentro}
        onChange={(e) => setFechaEncuentro(e.target.value)}
        required
      />
    </ModalComponent>
  );
};
