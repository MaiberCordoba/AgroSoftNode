
import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import { useGetUsers } from "../hooks/useGetUsers";
import { useEditarUsers } from "../hooks/useEditarUsers";
import { useCrearUsers } from "../hooks/useCrearUsers";
import { useEliminarUsers } from "../hooks/useEliminarUsers";
import { User } from "../types";
import EditarUserModal from "./EditarUsersModal";
import { CrearUsersModal } from "./CrearUsersModal";
import EliminarUserModal from "./EliminarUsersModal";
import { Chip } from "@heroui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportePdfUsuarios } from "./ReportePdfUsuarios";
import { Download } from "lucide-react";
import { getTotalUsers } from "../api/usersApi";
import { useQuery } from "@tanstack/react-query";


export function UsersList() {
  const { data, isLoading, error } = useGetUsers();
  const { 
    isOpen: isEditModalOpen, 
    closeModal: closeEditModal, 
    UsersEditada, 
    handleEditar 
  } = useEditarUsers();
  
  const { data: totalUsers } = useQuery({
    queryKey: ['userStats'],
    queryFn: getTotalUsers
  });

  const { 
    isOpen: isCreateModalOpen, 
    closeModal: closeCreateModal, 
    handleCrear 
  } = useCrearUsers();
  
  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    UsersEliminada,
    handleEliminar
  } = useEliminarUsers();

  const handleCrearNuevo = () => {
    handleCrear({ 
      identificacion: 0, 
      nombre: "", 
      apellidos: "", 
      fechaNacimiento: "", 
      telefono: "", 
      correoElectronico: "", 
      admin: false,
      estado:"",
    });
  };

  const columnas = [
    { name: "Identificacion", uid: "identificacion", sortable: true },
    { name: "FechaNacimiento", uid: "fechaNacimiento", sortable: true },
    { name: "Nombre", uid: "nombre", sortable: true },
    { name: "Apellidos", uid: "apellidos" },
    { name: "Email", uid: "correoElectronico" },
    { name: "Rol", uid: "admin" },
    {name: "estado", uid: "estado"},
    { name: "Acciones", uid: "acciones" },
  ];

  const renderCell = (item: User, columnKey: React.Key) => {
    switch (columnKey) {
        
        case "identificacion":
            return <span>{item.identificacion}</span>;
        case "fechaNacimiento":
            return <span>{item.fechaNacimiento}</span>;
        case "nombre":
            return <span>{item.nombre}</span>;
        case "apellidos":
            return <span>{item.apellidos}</span>;
        case "correoElectronico":
            return <span>{item.correoElectronico}</span>;
        case "admin":
            return <span>{item.admin ? "Administrador" : "Usuario"}</span>;
        case "estado":
            return <Chip 
            size="sm" 
            className="capitalize"
            variant="flat"
            color={item.estado === "activo" ? "success" : "danger"} 
          >
            {item.estado}
          </Chip>;
        case "acciones":
            return (
            <AccionesTabla
                onEditar={() => handleEditar(item)}
                onEliminar={() => handleEliminar(item)}
            />
        );
      default:
        return <span>{String(item[columnKey as keyof User])}</span>;
    }
  };

  if (isLoading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar los usuarios</p>;

  return (
    <div className="p-4">
      <TablaReutilizable
        datos={data || []}
        columnas={columnas}
        claveBusqueda="nombre"
        placeholderBusqueda="Buscar por nombre o email"
        renderCell={renderCell}
        onCrearNuevo={handleCrearNuevo}
        opcionesEstado={[
          { uid: "activo", nombre: "Activo" },
          { uid: "inactivo", nombre: "Inactivo" }
        ]}  

        //prompt para descargar reportes
        renderReporteAction={() => (  // ⚠️ Ya no pasamos "data", porque no la usaremos
          <PDFDownloadLink
            document={<ReportePdfUsuarios data={totalUsers || 0} />} // Solo el total
            fileName="reporte_total_usuarios.pdf"
          >
            {({ loading }) => (
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                {loading ? (
                  <Download className="h-4 w-4 animate-spin text-blue-500" />
                ) : (
                  <Download className="h-5 w-5 text-red-600" />
                )}
              </button>
            )}
          </PDFDownloadLink>
        )}
      />

      {/* Modales */}
      {isEditModalOpen && UsersEditada && (
        <EditarUserModal
          user={UsersEditada}
          onClose={closeEditModal}
        />
      )}

      {isCreateModalOpen && (
        <CrearUsersModal
          onClose={closeCreateModal}
        />
      )}

      {isDeleteModalOpen && UsersEliminada && (
        <EliminarUserModal
          user={UsersEliminada}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}