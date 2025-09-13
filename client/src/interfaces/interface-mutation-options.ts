import { DataQueryType } from "@/types/type-data-query";

export interface MutationOptions<TData, TVariables> {
  queryType: DataQueryType;
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}
