"use client";

import { useDataMutation } from "@/hooks/use-data-mutation";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/shared/item-toasts";
import { FormDataIndirectCost } from "@/types/type-form-data-indirect-cost";

export const useIndirectCostMutations = () => {
  const createIndirectCost = useDataMutation({
    queryType: "indirect_cost",
    mutationFn: async (values: FormDataIndirectCost) => {
      const data = await fetcher({
        input: `/api/indirect_cost`,
        method: "POST",
        body: JSON.stringify(values),
      });

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage =
          data.detail || data.error || data.description || data.message;
        if (Array.isArray(posibleMessage)) {
          posibleMessage = posibleMessage
            .map((detail) => detail.msg)
            .join(". \n");
        }
        throw new Error(posibleMessage || "Error al crear el costo indirecto");
      }

      return data;
    },
    onSuccess: (data, variables) => {
      const finalType =
        variables.type === "Otros" && variables.customType
          ? variables.customType
          : variables.type;
      itemToasts.createSuccess({
        description: `${finalType} - $${variables.amount}`,
        type: "costo indirecto",
      });
    },
    onError: (error) => {
      itemToasts.error({
        description: "Error al crear costo indirecto",
        message: error.message,
        type: "costo indirecto",
      });
    },
  });

  const updateIndirectCost = useDataMutation({
    queryType: "indirect_cost",
    mutationFn: async ({
      indirectCostId,
      ...values
    }: FormDataIndirectCost & { indirectCostId: string }) => {
      const data = await fetcher({
        input: `/api/indirect_cost/${indirectCostId}`,
        method: "PUT",
        body: JSON.stringify(values),
      });

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage =
          data.detail || data.error || data.description || data.message;
        if (Array.isArray(posibleMessage)) {
          posibleMessage = posibleMessage
            .map((detail) => detail.msg)
            .join(". \n");
        }
        throw new Error(
          posibleMessage || "Error al actualizar el costo indirecto"
        );
      }

      return data;
    },
    onSuccess: (data, variables) => {
      const finalType =
        variables.type === "Otros" && variables.customType
          ? variables.customType
          : variables.type;
      itemToasts.updateSuccess({
        description: `${finalType} - $${variables.amount}`,
        type: "costo indirecto",
      });
    },
    onError: (error) => {
      itemToasts.error({
        description: "Error al actualizar costo indirecto",
        message: error.message,
        type: "costo indirecto",
      });
    },
  });

  const deleteIndirectCost = useDataMutation({
    queryType: "indirect_cost",
    mutationFn: async ({
      indirectCostId,
      indirectCostType,
    }: {
      indirectCostId: string;
      indirectCostType: string;
    }) => {
      const data = await fetcher({
        input: `/api/indirect_cost/${indirectCostId}`,
        method: "DELETE",
      });

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage =
          data.detail || data.error || data.description || data.message;
        if (Array.isArray(posibleMessage)) {
          posibleMessage = posibleMessage
            .map((detail) => detail.msg)
            .join(". \n");
        }
        throw new Error(
          posibleMessage || "Error al eliminar el costo indirecto"
        );
      }

      return { ...data, indirectCostType };
    },
    onSuccess: (data) => {
      itemToasts.deleteSuccess({
        description: data.indirectCostType,
        type: "costo indirecto",
      });
    },
    onError: (error, variables) => {
      itemToasts.error({
        description: variables.indirectCostType,
        message: error.message,
        type: "costo indirecto",
      });
    },
  });

  return {
    createIndirectCost,
    updateIndirectCost,
    deleteIndirectCost,
  };
};

export default useIndirectCostMutations;
