"use client";

import { MutationOptions } from "@/interfaces/interface-mutation-options";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Generic mutation hook that automatically invalidates queries on success
 * Example usage:
 *
 * const createProductMutation = useDataMutation({
 *   queryType: "product",
 *   mutationFn: async (productData) => {
 *     return fetcher({ input: `/api/product`, method: "POST", body: JSON.stringify(productData) });
 *   },
 *   onSuccess: (data, variables) => {
 *     itemToasts.createSuccess({ description: variables.name, type: "producto" });
 *   }
 * });
 *
 * // Then use it like:
 * createProductMutation.mutate(productData);
 */
export const useDataMutation = <TData = unknown, TVariables = unknown>({
  queryType,
  mutationFn,
  onSuccess,
  onError,
}: MutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidar la consulta correspondiente
      queryClient.invalidateQueries({ queryKey: [queryType] });

      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      // Llama al callback personalizado onError si se proporciona
      onError?.(error, variables);
    },
  });
};

export default useDataMutation;
