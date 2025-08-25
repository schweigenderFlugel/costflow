import useUpdateDataTableStore from "@/store/update-table-store";
import { useShallow } from "zustand/react/shallow";
export const useUpdateDataTable = (
  dataForTable: "feedstock" | "product" | "users" | "indirect_cost" = "feedstock"
) => {
  const {
    updateFeedstock,
    updateProduct,
    updateUsers,
    setUpdateFeedstock,
    setUpdateProduct,
    setUpdateUsers,
    prevFeedstock,
    prevProduct,
    markPrevFeedstock,
    markPrevProduct,
    // indirect_cost
    updateIndirectCost,
    prevIndirectCost,
    markPrevIndirectCost,
    setUpdateIndirectCost,
  } = useUpdateDataTableStore(useShallow((state) => state))


  if (dataForTable === "users") {
    return {
      state: updateUsers,
      toggle: () => setUpdateUsers(!updateUsers),
    };
  }

  if (dataForTable === "product") {
    return {
      state: updateProduct,
      prev: prevProduct,
      toggle: () => setUpdateProduct(!updateProduct),
      markPrev: markPrevProduct,
    };
  }
  if (dataForTable === "feedstock") {
    return {
      state: updateFeedstock,
      prev: prevFeedstock,
      toggle: () => setUpdateFeedstock(!updateFeedstock),
      markPrev: markPrevFeedstock,
    }
  }

  if (dataForTable === "indirect_cost") {
    return {
      state: updateIndirectCost,
      prev: prevIndirectCost,
      toggle: () => setUpdateIndirectCost(!updateIndirectCost),
      markPrev: markPrevIndirectCost,
    }
  }

  return {
    state: null,
    prev: null,
    toggle: () => null,
    markPrev: null,
  }
}
