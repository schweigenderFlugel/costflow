"use client";

import { useDataMutation } from "@/hooks/use-data-mutation";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/shared/item-toasts";
import { FormDataFeedstock } from "@/types/type-feedstock";

export const useFeedstockMutations = () => {
  const createFeedstock = useDataMutation({
    queryType: "feedstock",
    mutationFn: async (values: FormDataFeedstock) => {
      const data = await fetcher({
        input: `/api/feedstock`,
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
        throw new Error(posibleMessage || "Error al crear el insumo");
      }

      return data;
    },
    onSuccess: (data, variables) => {
      itemToasts.createSuccess({ description: variables.name });
    },
    onError: (error) => {
      itemToasts.error({
        description: "Error al crear insumo",
        message: error.message,
      });
    },
  });

  const updateFeedstock = useDataMutation({
    queryType: "feedstock",
    mutationFn: async ({
      feedstockId,
      ...values
    }: FormDataFeedstock & { feedstockId: string }) => {
      const data = await fetcher({
        input: `/api/feedstock/${feedstockId}`,
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
        throw new Error(posibleMessage || "Error al actualizar el insumo");
      }

      return data;
    },
    onSuccess: (data) => {
      itemToasts.updateSuccess({ description: data.name });
    },
    onError: (error) => {
      itemToasts.error({
        description: "Error al actualizar insumo",
        message: error.message,
      });
    },
  });

  const deleteFeedstock = useDataMutation({
    queryType: "feedstock",
    mutationFn: async ({
      feedstockId,
      feedstockName,
    }: {
      feedstockId: string;
      feedstockName: string;
    }) => {
      const data = await fetcher({
        input: `/api/feedstock/${feedstockId}`,
        method: "DELETE",
      });

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage =
          data.error || data.description || data.message || data.detail;
        if (Array.isArray(posibleMessage)) {
          posibleMessage = posibleMessage
            .map((detail) => detail.msg)
            .join(". \n");
        }
        throw new Error(posibleMessage || "Error al eliminar el insumo");
      }

      return { ...data, feedstockName };
    },
    onSuccess: (data) => {
      itemToasts.deleteSuccess({ description: data.feedstockName });
    },
    onError: (error, variables) => {
      itemToasts.error({
        description: variables.feedstockName,
        message: error.message,
      });
    },
  });

  return {
    createFeedstock,
    updateFeedstock,
    deleteFeedstock,
  };
};

export default useFeedstockMutations;
