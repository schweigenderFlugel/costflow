"use client";

import { useQueryClient } from "@tanstack/react-query";

type DataQueryType = "product" | "feedstock" | "users" | "indirect_cost";

/**
 * Custom hook para manejar actualizaciones de tablas de datos a través de la invalidación de React Query
 * Remplazo de la lógica basada en Zustand useUpdateDataTable
 */
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateData = (queryType: DataQueryType) => {
    queryClient.invalidateQueries({ queryKey: [queryType] });
  };

  const invalidateAllData = () => {
    queryClient.invalidateQueries({ queryKey: ["product"] });
    queryClient.invalidateQueries({ queryKey: ["feedstock"] });
    queryClient.invalidateQueries({ queryKey: ["users"] });
    queryClient.invalidateQueries({ queryKey: ["indirect_cost"] });
  };

  return {
    invalidateData,
    invalidateAllData,
  };
};

export default useInvalidateQuery;
