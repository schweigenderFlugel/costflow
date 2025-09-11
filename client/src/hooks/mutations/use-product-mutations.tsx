"use client";

import { useDataMutation } from "@/hooks/use-data-mutation";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/shared/item-toasts";
import { UpdateProductVariables } from "@/interfaces/interface-update-product-variables";
import { SuccessResponse } from "@/interfaces/interface-success-response";
import { DeleteProductVariables } from "@/interfaces/interface-delete-product-variables";
import { CreateProductVariables } from "@/types/type-create-product-variables";

// Interfaces específicas para productos

/**
 * Hook especializado para mutaciones de productos
 * Demuestra cómo usar useDataMutation de manera optimizada
 */
export const useProductMutations = () => {
  // Mutación para crear producto
  const createProduct = useDataMutation<
    SuccessResponse,
    CreateProductVariables
  >({
    queryType: "product",
    mutationFn: async (values) => {
      const productDTO = {
        ...values,
        feedstocks: values.feedstocks.map((fs) => ({
          id: fs.id,
          quantity_required: fs.quantity_required,
        })),
      };

      const data = await fetcher({
        input: `/api/product`,
        method: "POST",
        body: JSON.stringify(productDTO),
      });

      if (data.error || !data.message?.includes("successfully")) {
        const errorMessage =
          data.detail || data.error || data.description || data.message;
        throw new Error(
          Array.isArray(errorMessage)
            ? errorMessage.map((detail) => detail.msg).join(". \n")
            : errorMessage || "Error al crear el producto"
        );
      }

      return data;
    },
    onSuccess: (data, variables) => {
      itemToasts.createSuccess({
        description: variables.name,
        type: "producto",
      });
    },
    onError: (error) => {
      itemToasts.error({
        description: "Error al crear producto",
        message: error.message,
        type: "producto",
      });
    },
  });

  // Mutación para actualizar producto
  const updateProduct = useDataMutation<
    SuccessResponse,
    UpdateProductVariables
  >({
    queryType: "product",
    mutationFn: async ({ productId, ...values }) => {
      const productDTO = {
        ...values,
        feedstocks: values.feedstocks.map((fs) => ({
          id: fs.id,
          quantity_required: fs.quantity_required,
        })),
      };

      const data = await fetcher({
        input: `/api/product/${productId}`,
        method: "PUT",
        body: JSON.stringify(productDTO),
      });

      if (data.error || !data.message?.includes("successfully")) {
        const errorMessage =
          data.detail || data.error || data.description || data.message;
        throw new Error(
          Array.isArray(errorMessage)
            ? errorMessage.map((detail) => detail.msg).join(". \n")
            : errorMessage || "Error al actualizar el producto"
        );
      }

      return data;
    },
    onSuccess: (data, variables) => {
      itemToasts.updateSuccess({
        description: variables.name,
        type: "producto",
      });
    },
    onError: (error) => {
      itemToasts.error({
        description: "Error al actualizar producto",
        message: error.message,
        type: "producto",
      });
    },
  });

  // Mutación para eliminar producto
  const deleteProduct = useDataMutation<
    SuccessResponse,
    DeleteProductVariables
  >({
    queryType: "product",
    mutationFn: async ({ productId }) => {
      const data = await fetcher({
        input: `/api/product/${productId}`,
        method: "DELETE",
      });

      if (data.error || !data.message?.includes("successfully")) {
        const errorMessage =
          data.error || data.description || data.message || data.detail;
        throw new Error(
          Array.isArray(errorMessage)
            ? errorMessage.map((detail) => detail.msg).join(". \n")
            : errorMessage || "Error al eliminar el producto"
        );
      }

      return data;
    },
    onSuccess: (data, variables) => {
      itemToasts.deleteSuccess({
        description: variables.productName,
        type: "producto",
      });
    },
    onError: (error, variables) => {
      itemToasts.error({
        description: variables.productName,
        message: error.message,
        type: "producto",
      });
    },
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProductMutations;
