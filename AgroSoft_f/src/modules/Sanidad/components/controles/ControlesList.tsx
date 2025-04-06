import { useGetControles } from "../../hooks/controles/useGetControless";
import { useEditarControl } from "../../hooks/controles/useEditarControles";
import { useCrearControl } from "../../hooks/controles/useCrearControles";
import { useEliminarControl } from "../../hooks/controles/useEliminarControles";
import { useGetAfecciones } from "../../hooks/afecciones/useGetAfecciones";
import { useGetTipoControl } from "../../hooks/tipoControl/useGetTipoControl";

import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import EditarControlModal from "./EditarControlesModal";
import { CrearControlModal } from "./CrearControlesModal";
import EliminarControlModal from "./EliminaControles";
import { Controles } from "../../types";
import { Chip } from "@heroui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportePdfControles } from "./ReportePdfControles";
import { Download } from "lucide-react";

export function ControlesList() {
  const { data, isLoading, error } = useGetControles();
  const { data: afecciones } = useGetAfecciones();
  const { data: tiposControl } = useGetTipoControl();
  
  const { 
    isOpen: isEditModalOpen, 
    closeModal: closeEditModal, 
    controlEditado, 
    handleEditar 
  } = useEditarControl();
  
  const { 
    isOpen: isCreateModalOpen, 
    closeModal: closeCreateModal, 
    handleCrear 
  } = useCrearControl();
  
  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    controlEliminado,
    handleEliminar
  } = useEliminarControl();

  const handleCrearNuevo = () => {
    handleCrear({ id: 0, fk_Afeccion:0, fk_TipoControl: 0, fechaControl: "", descripcion: "" });
  };

  // Definición de columnas
  const columnas = [
    { name: "Fecha", uid: "fecha", sortable: true },
    { name: "Descripción", uid: "descripcion" },
    { name: "Afección", uid: "fk_Afeccion" },
    { name: "Tipo de Control", uid: "fk_TipoControl" },
    { name: "Acciones", uid: "acciones" },
  ];

  // Renderizado de celdas
  const renderCell = (item: Controles, columnKey: React.Key) => {
    switch (columnKey) {
      case "fecha":
        return <span>{item.fechaControl}</span>;
      case "descripcion":
        return <span>{item.descripcion}</span>;
        case "fk_Afeccion":
          const afeccion = afecciones?.find(a => a.id === item.fk_Afeccion);
          return <span>{afeccion ? afeccion.nombre : "No definido"}</span>;
        
          case "fk_TipoControl":
            return <span>{item.fk_TipoControl?.nombre || "No definido"}</span>;
        
      case "acciones":
        return (
          <AccionesTabla
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item)}
          />
        );
      default:
        return <span>{String(item[columnKey as keyof Controles])}</span>;
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los controles</p>;

  return (
    <div className="p-4">
      {/* Tabla reutilizable */}
      <TablaReutilizable
        datos={data || []}
        columnas={columnas}
        claveBusqueda="descripcion"
        placeholderBusqueda="Buscar por descripción"
        renderCell={renderCell}
        onCrearNuevo={handleCrearNuevo}

        renderReporteAction={(data) => {
          const datosPDF = data.map((item: Controles) => {
            const afeccion = afecciones?.find(a => a.id === item.fk_Afeccion)?.nombre || "No definido";
            const tipoControl = item.fk_TipoControl?.nombre || "No definido";
        
            return {
              fechaControl: item.fechaControl,
              descripcion: item.descripcion,
              afeccion,
              tipoControl,
            };
          });
        
          return (
            <PDFDownloadLink
              document={<ReportePdfControles data={datosPDF} />}
              fileName="reporte_controles.pdf"
            >
              {({ loading }) => (
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Descargar reporte"
                >
                  {loading ? (
                    <Download className="h-4 w-4 animate-spin text-blue-500" />
                  ) : (
                    <Download className="h-5 w-5 text-green-600" />
                  )}
                </button>
              )}
            </PDFDownloadLink>
          );
        }}
      />
      {/* Modales */}
      {isEditModalOpen && controlEditado && (
        <EditarControlModal
          control={controlEditado}
          onClose={closeEditModal}
        />
      )}

      {isCreateModalOpen && (
        <CrearControlModal
          onClose={closeCreateModal}
        />
      )}

      {isDeleteModalOpen && controlEliminado && (
        <EliminarControlModal
          control={controlEliminado}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}
