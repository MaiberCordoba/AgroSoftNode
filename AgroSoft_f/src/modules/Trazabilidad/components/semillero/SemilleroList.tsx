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
import { useGetEspecies } from "../../hooks/especies/useGetEpecies";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../../../public/sena.png";
import { Button } from "@heroui/react";

function formatDate(fecha: string) {
  return new Date(fecha).toISOString().split("T")[0];
}

export function SemilleroList() {
  const { data, isLoading, error } = useGetSemilleros();
  const { data: especies } = useGetEspecies();

  const {
    isOpen: isEditModalOpen,
    closeModal: closeEditModal,
    SemillerosEditada,
    handleEditar,
  } = useEditarSemilleros();

  const {
    isOpen: isCreateModalOpen,
    closeModal: closeCreateModal,
    handleCrear,
  } = useCrearSemilleros();

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    SemillerosEliminada,
    handleEliminar,
  } = useEliminarSemilleros();

  const handleCrearNuevo = () => {
    handleCrear({
      id: 0,
      fk_Especies: 0,
      unidades: 0,
      fechaSiembra: "",
      fechaEstimada: "",
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
    doc.text("Reporte de Semilleros", 50, 28);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 50, 34);

    // Datos de tabla
    const rows = (data || []).map((item) => [
      item.id,
      especies?.find((e) => e.id === item.fk_Especies)?.nombre || "Desconocida",
      item.unidades,
      formatDate(item.fechaSiembra),
      formatDate(item.fechaEstimada),
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["ID", "Especie", "Unidades", "Fecha de Siembra", "Fecha Estimada"]],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [46, 204, 113] }, // Verde AgroSoft
      theme: "striped",
    });

    // Pie de página
    const finalY = (doc as any).lastAutoTable?.finalY || 70;
    doc.setFontSize(10);
    doc.text(`Total de registros: ${(data || []).length}`, 14, finalY + 10);

    doc.save("reporte_semilleros.pdf");
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
        const especie = especies?.find((e) => e.id === item.fk_Especies);
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
      <br />
      <Button
        onClick={handleExportPDF}
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          color: "#b91c1c", 
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          fontWeight: "500"
        }}
      >
        Exportar PDF
      </Button>


      {isEditModalOpen && SemillerosEditada && (
        <EditarSemilleroModal
          semillero={SemillerosEditada}
          onClose={closeEditModal}
        />
      )}

      {isCreateModalOpen && <CrearSemilleroModal onClose={closeCreateModal} />}

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
