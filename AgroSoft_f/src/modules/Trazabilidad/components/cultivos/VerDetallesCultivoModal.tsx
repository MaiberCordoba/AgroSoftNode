import ModalComponent from "@/components/Modal";
import { Cultivos } from "../../types";
import { useGetEspecies } from "../../hooks/especies/useGetEpecies";

interface Props {
  cultivo: Cultivos;
  isOpen: boolean;
  onClose: () => void;
}

export default function VerDetallesCultivoModal({ cultivo, isOpen, onClose }: Props) {
  const { data: especies } = useGetEspecies();
  const especie = especies?.find((e) => e.id === cultivo.fkEspecies);

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title="Detalles del Cultivo">
      <div className="space-y-2 p-2">
        <p><strong>ID:</strong> {cultivo.id}</p>
        <p><strong>Nombre:</strong> {cultivo.nombre}</p>
        <p><strong>Especie:</strong> {especie ? especie.nombre : "Cargando..."}</p>
        <p><strong>Unidades:</strong> {cultivo.unidades}</p>
        <p><strong>Fecha de Siembra:</strong> {new Date(cultivo.fechaSiembra).toLocaleDateString()}</p>
        <p><strong>Activo:</strong> {cultivo.activo ? "Sí" : "No"}</p>
        <p><strong>Descripción:</strong> {cultivo.descripcion}</p>
      </div>
    </ModalComponent>
  );
}
