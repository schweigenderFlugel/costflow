import useUpdateDataTableStore from "@/store/update-table-store";
import { useShallow } from "zustand/react/shallow";
export const useUpdateDataTable = (
  dataForTable: "feedstock" | "product" | "users" = "feedstock"
) => {
  const {
    updateFeedstock,
    updateProduct,
    updateUsers,
    setUpdateFeedstock,
    setUpdateProduct,
    setUpdateUsers,
  } = useUpdateDataTableStore(useShallow((state) => state));

  if (dataForTable === "product") {
    return {
      state: updateProduct,
      toggle: () => setUpdateProduct(!updateProduct),
    };
  }

  if (dataForTable === "users") {
    return {
      state: updateUsers,
      toggle: () => setUpdateUsers(!updateUsers),
    };
  }

  return {
    state: updateFeedstock,
    toggle: () => setUpdateFeedstock(!updateFeedstock),
  };
};
