import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import { usegetUsoProductosControl } from "../../hooks/useProductosControl/useGetUseProductosControl";
import { useEditarUsoProductosControl } from "../../hooks/useProductosControl/useEditarUseProductosControl";
import { useCrearUsoProductosControl } from "../../hooks/useProductosControl/useCrearUseProductosControl";
import { useEliminarUsoProductosControl } from "../../hooks/useProductosControl/useEliminarUseProductosControl";
import { useGetProductosControl } from "../../hooks/productosControl/useGetProductosControl";
import { useGetControles } from "../../hooks/controles/useGetControless";
import EditarUsoProductosControlModal from "./EditarUsoProductoscontrolModal";
import { CrearUsoProductosControlModal } from "./CrearUsoProductoscontrolModal";
import EliminarUsoProductosControlModal from "./EliminarUsoProductoscontrolModal";
import { UsoProductosControl } from "../../types";
import { Chip } from "@heroui/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportePdfUsoProductosControl } from "./ReportePdfUuseproductoscontrol";
import { Download } from "lucide-react";

export function UsoProductosControlList() {
  const { data: rawData, isLoading, error } = usegetUsoProductosControl();

const data = rawData?.map((item) => ({
  id: item.id_usoProductoControl,
  fk_ProductoControl: item.fk_ProductosControl?.id_productoControl,
  fk_Control: item.fk_Controles?.id,
  cantidadProducto: item.cantidad_producto_usada,
})) ?? [];



  // Datos relacionados
  const { data: productosControl } = useGetProductosControl();
  const { data: controles } = useGetControles();

  const {
    isOpen: isEditModalOpen,
    closeModal: closeEditModal,
    usoproductosControlEditado,
    handleEditar,
  } = useEditarUsoProductosControl();

  const {
    isOpen: isCreateModalOpen,
    closeModal: closeCreateModal,
    handleCrear,
  } = useCrearUsoProductosControl();

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    usoproductosControlEliminado,
    handleEliminar,
  } = useEliminarUsoProductosControl();

  const handleCrearNuevo = () => {
    handleCrear({
      id: 0,
      fk_ProductoControl: 0,
      fk_Control: 0,
      cantidadProducto: 0,
    });
  };


  // Definición de columnas
  const columnas = [
    { name: "Producto de Control", uid: "productoControl" },
    { name: "Control Aplicado", uid: "control" },
    { name: "Cantidad", uid: "cantidadProducto" },
    { name: "Acciones", uid: "acciones" },
  ];

  // Función de renderizado
  const renderCell = (item: UsoProductosControl, columnKey: React.Key) => {
    switch (columnKey) {
      case "productoControl":
        const producto = productosControl?.find(
          (p) => p.id === item.fk_ProductoControl
        );
        return <span>{producto ? producto.nombre : "Desconocido"}</span>;

      case "control":
        const control = controles?.find((c) => c.id === item.fk_Control);
        return <span>{control ? control.descripcion : "Desconocido"}</span>;

      case "cantidadProducto":
        return <span>{item.cantidadProducto}</span>;

      case "acciones":
        return (
          <AccionesTabla
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item)}
          />
        );

      default:
        return (
          <span>{String(item[columnKey as keyof UsoProductosControl])}</span>
        );
    }
  };

  if (isLoading || !productosControl || !controles)
    return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  return (
    <div className="p-4">
      <TablaReutilizable
        datos={data || []}
        columnas={columnas}
        claveBusqueda="fk_ProductoControl"
        placeholderBusqueda="Buscar por producto"
        renderCell={renderCell}
        onCrearNuevo={handleCrearNuevo}

        
              // 🧠 Este es el botón para generar el PDF
              renderReporteAction={(data) => {
                const datosPDF = data.map((item: UsoProductosControl) => {
                  const producto = productosControl?.find(p => p.id === item.fk_ProductoControl)?.nombre || "Desconocido";
                  const control = controles?.find(c => c.id === item.fk_Control)?.descripcion || "Desconocido";
      
                  return {
                    producto,
                    control,
                    cantidadProducto: item.cantidadProducto
                  };
                });
      
                return (
                  <PDFDownloadLink
                    document={<ReportePdfUsoProductosControl data={datosPDF} />}
                    fileName="reporte_uso_productos_control.pdf"
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
      {isEditModalOpen && usoproductosControlEditado && (
        <EditarUsoProductosControlModal
          usoProductoControl={usoproductosControlEditado}
          onClose={closeEditModal}
        />
      )}

      {isCreateModalOpen && (
        <CrearUsoProductosControlModal onClose={closeCreateModal} />
      )}

      {isDeleteModalOpen && usoproductosControlEliminado && (
        <EliminarUsoProductosControlModal
          usoProductoControl={usoproductosControlEliminado}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}
