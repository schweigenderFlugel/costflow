"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";

type DataQueryType = "product" | "feedstock" | "users" | "indirect_cost";

export const useDataQuery = <TData = unknown[]>(
  inputRequest: DataQueryType = "feedstock",
  initialData?: TData | []
) => {
  const queryOptions: any = {
    queryKey: [inputRequest],
    queryFn: async (): Promise<TData> => {
      const response = await fetcher({ input: `/api/${inputRequest}` });

      // Handle error responses from fetcher
      if (response.error || response.detail) {
        throw new Error(response.error || response.detail || "Failed to fetch data");
      }

      return response as TData;
    },
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  };

  // Solo agregar initialData si se proporciona
  if (initialData !== undefined) {
    queryOptions.initialData = initialData as TData;
  }

  const query = useQuery(queryOptions);

  return {
    data: query.data || ([] as unknown as TData),
    error: query.error?.message,
    isPending: query.isPending,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
};

export default useDataQuery;
