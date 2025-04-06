import { useGetCultivos } from "../../hooks/cultivos/useGetCultivos";
import { useEditarCultivos } from "../../hooks/cultivos/useEditarCultivos";
import { useCrearCultivos } from "../../hooks/cultivos/useCrearCultivos";
import { useEliminarCultivos } from "../../hooks/cultivos/useEliminarCultivos";
import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import EditarCultivoModal from "./EditarCultivosModal";
import { CrearCultivoModal } from "./CrearCultivosModal";
import EliminarCultivoModal from "./EliminarCultivo";
import { Cultivos } from "../../types";
import { useGetEspecies } from "../../hooks/especies/useGetEpecies";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../../../public/sena.png";
import { Button } from "@heroui/react";

function formatDate(fecha: string) {
  return new Date(fecha).toISOString().split("T")[0];
}

export function CultivosList() {
  const { data, isLoading, error } = useGetCultivos();
  const { data: especies } = useGetEspecies();

  const {
    isOpen: isEditModalOpen,
    closeModal: closeEditModal,
    CultivosEditada,
    handleEditar,
  } = useEditarCultivos();

  const {
    isOpen: isCreateModalOpen,
    closeModal: closeCreateModal,
    handleCrear,
  } = useCrearCultivos();

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    CultivosEliminada,
    handleEliminar,
  } = useEliminarCultivos();

  const handleCrearNuevo = () => {
    handleCrear({
      id: 0,
      nombre: "",
      fk_Especies: 0,
      unidades: 0,
      fechaSiembra: "",
      activo: true,
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Logo
    const imgProps = doc.getImageProperties(logo);
    const logoWidth = 30;
    const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
    doc.addImage(logo, "PNG", 10, 10, logoWidth, logoHeight);

    // Encabezado
    doc.setFontSize(16);
    doc.text("AgroSoft - SENA", 50, 20);
    doc.setFontSize(12);
    doc.text("Reporte de Cultivos", 50, 28);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 50, 34);

    // Tabla
    const rows = (data || []).map((item) => [
      item.id,
      item.nombre,
      especies?.find((e) => e.id === item.fk_Especies)?.nombre || "Desconocida",
      item.unidades,
      formatDate(item.fechaSiembra),
      item.activo ? "Sí" : "No",
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["ID", "Nombre", "Especie", "Unidades", "Fecha de Siembra", "Activo"]],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [46, 204, 113] }, // Rojo estilo "Agregar"
      theme: "striped",
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 70;
    doc.setFontSize(10);
    doc.text(`Total de registros: ${(data || []).length}`, 14, finalY + 10);

    doc.save("reporte_cultivos.pdf");
  };

  const columnas = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Nombre", uid: "nombre", sortable: true },
    { name: "Especie", uid: "fk_especie", sortable: true },
    { name: "Unidades", uid: "unidades" },
    { name: "Fecha de Siembra", uid: "fechasiembra", sortable: true },
    { name: "Activo", uid: "activo", sortable: true },
    { name: "Acciones", uid: "acciones" },
  ];

  const renderCell = (item: Cultivos, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "nombre":
        return <span>{item.nombre}</span>;
      case "fk_especie":
        const especie = especies?.find((e) => e.id === item.fk_Especies);
        return <span>{especie ? especie.nombre : "Cargando..."}</span>;
      case "unidades":
        return <span>{item.unidades}</span>;
      case "fechasiembra":
        return <span>{formatDate(item.fechaSiembra)}</span>;
      case "activo":
        return <span>{item.activo ? "Sí" : "No"}</span>;
      case "acciones":
        return (
          <AccionesTabla
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item)}
          />
        );
      default:
        return <span>{String(item[columnKey as keyof Cultivos])}</span>;
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los cultivos</p>;

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

      <div className="mt-4">
        <Button
          onClick={handleExportPDF}
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            color: "#b91c1c",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "500",
          }}
        >
          Exportar PDF
        </Button>
      </div>

      {isEditModalOpen && CultivosEditada && (
        <EditarCultivoModal
          cultivo={CultivosEditada}
          onClose={closeEditModal}
        />
      )}

      {isCreateModalOpen && <CrearCultivoModal onClose={closeCreateModal} />}

      {isDeleteModalOpen && CultivosEliminada && (
        <EliminarCultivoModal
          cultivo={CultivosEliminada}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}
