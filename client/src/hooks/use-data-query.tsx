"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utils/fetcher";
import { DataQueryType } from "@/types/type-data-query";

export const useDataQuery = <TData = unknown[],>(
  inputRequest: DataQueryType = "feedstock",
  initialData?: TData | []
) => {
  const baseQueryOptions = {
    queryKey: [inputRequest],
    queryFn: async (): Promise<TData> => {
      const response = await fetcher({ input: `/api/${inputRequest}` });

      // Handle error responses from fetcher
      if (response.error || response.detail) {
        throw new Error(
          response.error || response.detail || "Failed to fetch data"
        );
      }

      return response as TData;
    },
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  };

  // Solo agregar initialData si se proporciona
  const queryOptions =
    initialData !== undefined
      ? { ...baseQueryOptions, initialData: initialData as TData }
      : baseQueryOptions;

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
