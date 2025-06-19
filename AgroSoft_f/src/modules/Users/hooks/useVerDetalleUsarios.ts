import { useState } from "react";
import { UseModal } from "@/hooks/useModal";
import { User } from "../types";

export const useVerDetalleUsuarios = () => {
  const { isOpen, openModal, closeModal } = UseModal();
  const [usuarioSeleccionado, setusuarioSeleccionado] = useState<User | null>(null);

  const handleVerDetalle = (usuarios: User) => {
    setusuarioSeleccionado(usuarios);
    openModal();
  };

  const handleCloseDetalle = () => {
    closeModal();
  };

  return {
    isOpen,
    closeModal: handleCloseDetalle,
    usuarioSeleccionado,
    handleVerDetalle,
  };
};
