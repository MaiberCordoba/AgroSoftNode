import { useState } from "react";
import { UseModal } from "@/hooks/useModal";
import { Lotes } from "../../types";

export const useVerDetalleLotes = () => {
  const { isOpen, openModal, closeModal } = UseModal();
  const [loteSeleccionado, setLoteSeleccionado] = useState<Lotes | null>(null);

  const handleVerDetalle = (lote: Lotes) => {
    setLoteSeleccionado(lote);
    openModal();
  };

  const handleCloseDetalle = () => {
    closeModal();
  };

  return {
    isOpen,
    closeModal: handleCloseDetalle,
    loteSeleccionado,
    handleVerDetalle,
  };
};