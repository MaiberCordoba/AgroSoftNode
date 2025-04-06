import { useGetEras } from "../../hooks/eras/useGetEras";
import { useEditarEras } from "../../hooks/eras/useEditarEras";
import { useCrearEras } from "../../hooks/eras/useCrearEras";
import { useEliminarEras } from "../../hooks/eras/useEliminarEras";
import { useGetLotes } from "../../hooks/lotes/useGetLotes";

import { TablaReutilizable } from "@/components/ui/table/TablaReutilizable";
import { AccionesTabla } from "@/components/ui/table/AccionesTabla";
import EditarEraModal from "./EditarErasModal";
import { CrearEraModal } from "./CrearEraModal";
import EliminarEraModal from "./EliminarEras";
import { Eras } from "../../types";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@heroui/react";
import { Download } from "lucide-react";

export function EraList() {
  const { data, isLoading, error } = useGetEras();
  const { data: lotes } = useGetLotes();

  const {
    isOpen: isEditModalOpen,
    closeModal: closeEditModal,
    ErasEditada,
    handleEditar,
  } = useEditarEras();

  const {
    isOpen: isCreateModalOpen,
    closeModal: closeCreateModal,
    handleCrear,
  } = useCrearEras();

  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    ErasEliminada,
    handleEliminar,
  } = useEliminarEras();

  const handleCrearNuevo = () => {
    handleCrear({
      id: 0,
      fk_Lotes: 0,
      estado: true,
      tamX: 0,
      tamY: 0,
      posX: 0,
      posY: 0,
    });
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Listado de Eras", 14, 20);
    autoTable(doc, {
      head: [[
        "ID", "Lote", "Estado", "Tamaño X", "Tamaño Y", "Posición X", "Posición Y"
      ]],
      body: (data || []).map((item) => [
        item.id,
        lotes?.find((l) => l.id === item.fk_Lotes)?.nombre || "Sin asignar",
        item.estado ? "Disponible" : "Ocupado",
        item.tamX,
        item.tamY,
        item.posX,
        item.posY,
      ]),
      startY: 30,
      headStyles: { fillColor: [46, 204, 113] },
    });
    doc.save("eras.pdf");
  };

  const columnas = [
    { name: "ID", uid: "id", sortable: true },
    { name: "Lote", uid: "fk_Lote", sortable: true },
    { name: "Estado", uid: "estado" },
    { name: "Tamaño X", uid: "tamX" },
    { name: "Tamaño Y", uid: "tamY" },
    { name: "Posición X", uid: "posX" },
    { name: "Posición Y", uid: "posY" },
    { name: "Acciones", uid: "acciones" },
  ];

  const renderCell = (item: Eras, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return <span>{item.id}</span>;
      case "fk_Lote":
        const lote = lotes?.find((l) => l.id === item.fk_Lotes);
        return <span>{lote ? lote.nombre : "Sin asignar"}</span>;
      case "estado":
        return <span>{item.estado ? "Disponible" : "Ocupado"}</span>;
      case "tamX":
        return <span>{item.tamX}</span>;
      case "tamY":
        return <span>{item.tamY}</span>;
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
        return <span>{String(item[columnKey as keyof Eras])}</span>;
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar las eras</p>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between">
        <Button
          onClick={exportarPDF}
          className="bg-green-500/80 hover:bg-green-600 text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
      </div>

      <TablaReutilizable
        datos={data || []}
        columnas={columnas}
        claveBusqueda="id"
        placeholderBusqueda="Buscar por ID"
        renderCell={renderCell}
        onCrearNuevo={handleCrearNuevo}
      />

      {isEditModalOpen && ErasEditada && (
        <EditarEraModal era={ErasEditada} onClose={closeEditModal} />
      )}

      {isCreateModalOpen && (
        <CrearEraModal onClose={closeCreateModal} />
      )}

      {isDeleteModalOpen && ErasEliminada && (
        <EliminarEraModal
          era={ErasEliminada}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </div>
  );
}
