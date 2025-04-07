import { useGetLotes } from "../../hooks/lotes/useGetLotes";
import { useEditarLotes } from "../../hooks/lotes/useEditarLotes";
import { useCrearLotes } from "../../hooks/lotes/useCrearLotes";
import { useEliminarLotes } from "../../hooks/lotes/useEliminarLotes";
import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import EditarLoteModal from "./EditarLotesModal";
import { CrearLoteModal } from "./CrearLotesModal";
import EliminarLoteModal from "./EliminarLotes";
import { Lotes } from "../../types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../../../../public/sena.png";
import { Button } from "@heroui/react";

export function LoteList() {
  const { data, isLoading, error } = useGetLotes();

  const {
    isOpen: isEditModalOpen,
    closeModal: closeEditModal,
    LotesEditada,
    handleEditar,
  } = useEditarLotes();

  const {
    isOpen: isCreateModalOpen,
    closeModal: closeCreateModal,
    handleCrear,
  } = useCrearLotes();

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    LotesEliminada,
    handleEliminar,
  } = useEliminarLotes();

  const handleCrearNuevo = () => {
    handleCrear({
      id: 0,
      nombre: "",
      descripcion: "",
      tamX: 0,
      tamY: 0,
      estado: false,
      posX: 0.0,
      posY: 0.0,
    });
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const imgProps = doc.getImageProperties(logo);
    const logoWidth = 30;
    const logoHeight = (imgProps.height * logoWidth) / imgProps.width;
    doc.addImage(logo, "PNG", 10, 10, logoWidth, logoHeight);

    doc.setFontSize(16);
    doc.text("AgroSoft - SENA", 50, 20);
    doc.setFontSize(12);
    doc.text("Reporte de Lotes", 50, 28);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 50, 34);

    const rows = (data || []).map((item) => [
      item.id,
      item.nombre,
      item.descripcion,
      item.tamX,
      item.tamY,
      item.estado ? "Disponible" : "Ocupado",
      item.posX,
      item.posY,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [["ID", "Nombre", "Descripción", "Tamaño X", "Tamaño Y", "Estado", "Posición X", "Posición Y"]],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [46, 204, 113] },
      theme: "striped",
    });

    const finalY = (doc as any).lastAutoTable?.finalY || 70;
    doc.setFontSize(10);
    doc.text(`Total de registros: ${(data || []).length}`, 14, finalY + 10);

    doc.save("reporte_lotes.pdf");
  };

  const columnas = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Nombre", uid: "nombre", sortable: true },
    { name: "Descripción", uid: "descripcion" },
    { name: "Tamaño X", uid: "tamX" },
    { name: "Tamaño Y", uid: "tamY" },
    { name: "Estado", uid: "estado" },
    { name: "Posición X", uid: "posX" },
    { name: "Posición Y", uid: "posY" },
    { name: "Acciones", uid: "acciones" },
  ];

  const renderCell = (item: Lotes, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "nombre":
        return <span>{item.nombre}</span>;
      case "descripcion":
        return <span>{item.descripcion}</span>;
      case "tamX":
        return <span>{item.tamX}</span>;
      case "tamY":
        return <span>{item.tamY}</span>;
      case "estado":
        return <span>{item.estado ? "Disponible" : "Ocupado"}</span>;
      case "posX":
        return <span>{item.posX}</span>;
      case "posY":
        return <span>{item.posY}</span>;
      case "acciones":
        return (
          <AccionesTabla
            onEditar={() => handleEditar(item)}
            onEliminar={() => handleEliminar(item)}
          />
        );
      default:
        return <span>{String(item[columnKey as keyof Lotes])}</span>;
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los lotes</p>;

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
          fontWeight: "500",
        }}
      >
        Exportar PDF
      </Button>

      {/* Modales */}
      {isEditModalOpen && LotesEditada && (
        <EditarLoteModal lote={LotesEditada} onClose={closeEditModal} />
      )}

      {isCreateModalOpen && <CrearLoteModal onClose={closeCreateModal} />}

      {isDeleteModalOpen && LotesEliminada && (
        <EliminarLoteModal
          lote={LotesEliminada}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}