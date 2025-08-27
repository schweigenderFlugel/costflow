"use client";

import { useDataMutation } from "@/hooks/use-data-mutation";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/item-toasts";

export const useUserMutations = () => {
  const acceptUser = useDataMutation({
    queryType: "users",
    mutationFn: async ({ userId }: { userId: string }) => {
      const data = await fetcher({
        input: `/api/users/accept?id=${userId}`
      });

      if (!data.success) {
        throw new Error(data.message || data.detail || data.error || "Error al aceptar usuario");
      }

      return data;
    },
    onSuccess: (data) => {
      itemToasts.info({ description: data.message, type: "usuario" });
    },
    onError: (error) => {
      itemToasts.error({
        description: error.message,
        type: "usuario"
      });
    }
  });

  const rejectUser = useDataMutation({
    queryType: "users",
    mutationFn: async ({ userId }: { userId: string }) => {
      const data = await fetcher({
        input: `/api/users/reject?id=${userId}`
      });

      if (!data.success) {
        throw new Error(data.message || data.detail || data.error || "Error al rechazar usuario");
      }

      return data;
    },
    onSuccess: (data) => {
      itemToasts.info({ description: data.message, type: "usuario" });
    },
    onError: (error) => {
      itemToasts.error({
        description: error.message,
        type: "usuario"
      });
    }
  });

  return {
    acceptUser,
    rejectUser
  };
};

export default useUserMutations;
