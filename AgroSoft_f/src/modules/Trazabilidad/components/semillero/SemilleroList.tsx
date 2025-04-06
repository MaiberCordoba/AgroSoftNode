import { useGetSemilleros } from "../../hooks/semilleros/useGetSemilleros";
import { useEditarSemilleros } from "../../hooks/semilleros/useEditarSemilleros";
import { useCrearSemilleros } from "../../hooks/semilleros/useCrearSemilleros";
import { useEliminarSemilleros } from "../../hooks/semilleros/useEliminarSemilleros";
import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import EditarSemilleroModal from "./EditarSemilleroModal";
import { CrearSemilleroModal } from "./CrearSemilleroModal";
import EliminarSemilleroModal from "./EliminarSemillero";
import { Semilleros } from "../../types";
import { useGetEspecies } from "../../hooks/especies/useGetEpecies"; // <--- nuevo

function formatDate(fecha: string) {
  return new Date(fecha).toISOString().split("T")[0]; // Devuelve 'YYYY-MM-DD'
}

export function SemilleroList() {
  const { data, isLoading, error } = useGetSemilleros();
  const { data: especies } = useGetEspecies(); // <--- nuevo

  const { 
    isOpen: isEditModalOpen, 
    closeModal: closeEditModal, 
    SemillerosEditada, 
    handleEditar 
  } = useEditarSemilleros();

  const { 
    isOpen: isCreateModalOpen, 
    closeModal: closeCreateModal, 
    handleCrear 
  } = useCrearSemilleros();

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    SemillerosEliminada,
    handleEliminar
  } = useEliminarSemilleros();

  const handleCrearNuevo = () => {
    handleCrear({ id: 0, fk_Especies: 0, unidades: 0, fechaSiembra: "", fechaEstimada: "" });
  };

  const columnas = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Especie", uid: "fk_Especie", sortable: true },
    { name: "Unidades", uid: "unidades" },
    { name: "Fecha de Siembra", uid: "fechaSiembra", sortable: true },
    { name: "Fecha Estimada", uid: "fechaEstimada", sortable: true },
    { name: "Acciones", uid: "acciones" },
  ];

  const renderCell = (item: Semilleros, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "fk_Especie":
        const especie = especies?.find(e => e.id === item.fk_Especies);
        return <span>{especie ? especie.nombre : "Cargando..."}</span>;
      case "unidades":
        return <span>{item.unidades}</span>;
      case "fechaSiembra":
        return <span>{formatDate(item.fechaSiembra)}</span>;
      case "fechaEstimada":
        return <span>{formatDate(item.fechaEstimada)}</span>;
      case "acciones":
        return (
          <AccionesTabla
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item)}
          />
        );
      default:
        return <span>{String(item[columnKey as keyof Semilleros])}</span>;
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los semilleros</p>;

  return (
    <div className="p-4">
      <TablaReutilizable
        datos={data || []}
        columnas={columnas}
        claveBusqueda="id"
        placeholderBusqueda="Buscar por ID"
        renderCell={renderCell}
        onCrearNuevo={handleCrearNuevo}
      />

      {/* Modales */}
      {isEditModalOpen && SemillerosEditada && (
        <EditarSemilleroModal
          semillero={SemillerosEditada}
          onClose={closeEditModal}
        />
      )}

      {isCreateModalOpen && (
        <CrearSemilleroModal onClose={closeCreateModal} />
      )}

      {isDeleteModalOpen && SemillerosEliminada && (
        <EliminarSemilleroModal
          semillero={SemillerosEliminada}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}
