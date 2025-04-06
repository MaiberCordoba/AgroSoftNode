import { Pagination } from "@heroui/react";

interface PaginacionTablaProps {
  paginaActual: number;
  totalPaginas: number;
  onCambiarPagina: (page: number) => void;
}

/**
 * Componente de paginación mejorado para tablas
 * @param paginaActual Página actual
 * @param totalPaginas Total de páginas disponibles
 * @param onCambiarPagina Callback al cambiar de página
 */
export const PaginacionTabla = ({
  paginaActual,
  totalPaginas,
  onCambiarPagina,
}: PaginacionTablaProps) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm text-gray-500">
        Página {paginaActual} de {totalPaginas}
      </span>
      <Pagination
        size="sm"
        showControls
        total={totalPaginas}
        page={paginaActual}
        onChange={onCambiarPagina}
        className="gap-1"
      />
    </div>
  );
};