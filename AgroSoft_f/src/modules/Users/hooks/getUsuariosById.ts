import { useQuery } from "@tanstack/react-query";
import { getUsuariosById } from "../api/usersApi";
import { User } from "../types";

export const useGetUsariosById = (id: number) => {
  return useQuery<User | null, Error>({
    queryKey: ["usuarios", id],
    queryFn: () => getUsuariosById(id),
    enabled: !!id, // evita ejecutar la query si id es 0, null o undefined
  });
};
