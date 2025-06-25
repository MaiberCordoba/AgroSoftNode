import ModalComponent from "@/components/Modal";
import { User } from "../types";

interface Props {
  Usuario: User;
  onClose: () => void;
}

const DetalleUsuarioModal = ({ Usuario, onClose }: Props) => {


  return (
    <ModalComponent isOpen={true} onClose={onClose} title="Detalle de Usuario">


      {Usuario && (
        <>
          <p><strong>Identificación:</strong> {Usuario.identificacion}</p>
          <p><strong>Nombre:</strong> {Usuario.nombre} {Usuario.apellidos}</p>
          <p><strong>Fecha de Nacimiento:</strong> {Usuario.fechaNacimiento ?? 'N/A'}</p>
          <p><strong>Teléfono:</strong> {Usuario.telefono}</p>
          <p><strong>Correo Electrónico:</strong> {Usuario.correoElectronico}</p>
          <p><strong>Estado:</strong> {Usuario.estado}</p>
          <p><strong>Rol:</strong> {Usuario.rol}</p>
        </>
      )}
    </ModalComponent>
  );
};

export default DetalleUsuarioModal;
