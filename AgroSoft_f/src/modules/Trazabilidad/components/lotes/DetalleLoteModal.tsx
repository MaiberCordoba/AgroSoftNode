import ModalComponent from "@/components/Modal";
import { Lotes } from "../../types";
import { useGetLotes } from "../../hooks/lotes/useGetLotes";

interface Props {
  actividad: Lotes;
  onClose: () => void;
}

const DetalleLotesModal = ({ lote, onClose }: Props) => {
  const { data: Lote } = useGetLotes()

  return (
    
   <ModalComponent isOpen={true} onClose={onClose} title="Detalle del Lote">
    <p><strong>Nombre:</strong> {lote.nombre}</p>
    <p><strong>Descripción:</strong> {lote.descripcion}</p>
    <p><strong>Tamaño:</strong> {lote.tamX} x {lote.tamY} metros</p>
    <p><strong>Ubicación:</strong> X: {lote.posX}, Y: {lote.posY}</p>
    <p><strong>Estado:</strong> {lote.estado ? "Activo" : "Inactivo"}</p>
  </ModalComponent>
)
};

export default DetalleLotesModal;