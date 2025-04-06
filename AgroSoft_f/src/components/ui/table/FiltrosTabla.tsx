import React from "react";
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { SearchIcon, ChevronDownIcon } from "./Icons";

interface OpcionEstado {
  uid: string;
  nombre: string;
}

interface FiltrosTablaProps {
  valorFiltro: string;
  onCambiarBusqueda: (valor: string) => void;
  onLimpiarBusqueda: () => void;
  opcionesEstado?: OpcionEstado[];
  filtroEstado: Set<string>;
  onCambiarFiltroEstado: (filtro: Set<string>) => void;
  placeholderBusqueda?: string;
}

export const FiltrosTabla: React.FC<FiltrosTablaProps> = ({
  valorFiltro,
  onCambiarBusqueda,
  onLimpiarBusqueda,
  opcionesEstado,
  filtroEstado,
  onCambiarFiltroEstado,
  placeholderBusqueda = "Search by nombre...", // Cambiado a inglés para consistencia
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Campo de búsqueda */}
      <Input
        isClearable
        endContent={<ChevronDownIcon className="text-gray-400" width={16} height={16} />} 
        className="w-full sm:max-w-[100%]" // Ajuste de ancho
        placeholder={placeholderBusqueda}
        startContent={<SearchIcon className="text-default-400" />}
        value={valorFiltro}
        onClear={onLimpiarBusqueda}
        onValueChange={onCambiarBusqueda}
      />

      {/* Dropdown para filtrar por estado */}
      {opcionesEstado && opcionesEstado.length > 0 && (
        <Dropdown>
          <DropdownTrigger>
            <Button
              endContent={<ChevronDownIcon className="text-gray-400" width={16} height={16} />} 
              variant="flat"
              size="sm"
              className="hidden sm:flex"
            >
              Status
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Status filter"
            closeOnSelect={false}
            selectedKeys={filtroEstado}
            selectionMode="multiple"
            onSelectionChange={(keys) => {
              const keysSet = new Set(Array.from(keys).map(String));
              onCambiarFiltroEstado(keysSet);
            }}
          >
            {opcionesEstado.map((estado) => (
              <DropdownItem key={estado.uid} className="capitalize">
                {estado.nombre}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};