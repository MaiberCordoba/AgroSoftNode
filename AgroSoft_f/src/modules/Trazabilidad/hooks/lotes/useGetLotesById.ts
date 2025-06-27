import { useQuery } from "@tanstack/react-query";
import { getLoteById } from "../../api/lotesApi";
import { Lotes } from "../../types";

export const usegetLoteById = (id: number) => {
  return useQuery<Lotes | null, Error>({
    queryKey: ["lote", id],
    queryFn: () => getLoteById(id),
    enabled: !!id, // evita ejecutar la query si id es 0, null o undefined
  });
};