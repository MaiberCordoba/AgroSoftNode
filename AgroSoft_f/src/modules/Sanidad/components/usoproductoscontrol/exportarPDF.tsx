import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportarPDF = () => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(16);
  doc.text("Reporte de Productos de Control", 14, 20);

  // Definir columnas
  const columnasPDF = [
    { header: "Producto de Control", dataKey: "productoControl" },
    { header: "Control Aplicado", dataKey: "control" },
    { header: "Cantidad", dataKey: "cantidadProducto" },
  ];

  // Formatear los datos (con nombres reales)
  const filas = data.map((item) => {
    const producto = productosControl?.find(p => p.id === item.fk_ProductoControl);
    const control = controles?.find(c => c.id === item.fk_Control);

    return {
      productoControl: producto?.nombre || "Desconocido",
      control: control?.descripcion || "Desconocido",
      cantidadProducto: item.cantidadProducto,
    };
  });

  // Agregar tabla
  autoTable(doc, {
    startY: 30,
    head: [columnasPDF.map(col => col.header)],
    body: filas.map(fila => [
      fila.productoControl,
      fila.control,
      fila.cantidadProducto,
    ]),
  });

  // Guardar
  doc.save("reporte-productos-control.pdf");
};
