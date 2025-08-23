import useUpdateDataTableStore from "@/store/update-table-store"
import { useShallow } from "zustand/react/shallow"

export const useUpdateDataTable = (dataForTable: "feedstock" | "product" = "feedstock") => {
  const {
    updateFeedstock,
    updateProduct,
    setUpdateFeedstock,
    setUpdateProduct,
    prevFeedstock,
    prevProduct,
    markPrevFeedstock,
    markPrevProduct,
  } = useUpdateDataTableStore(useShallow((state) => state))

  if (dataForTable === "product") {
    return {
      state: updateProduct,
      prev: prevProduct,
      toggle: () => setUpdateProduct(!updateProduct),
      markPrev: markPrevProduct,
    }
  }

  return {
    state: updateFeedstock,
    prev: prevFeedstock,
    toggle: () => setUpdateFeedstock(!updateFeedstock),
    markPrev: markPrevFeedstock,
  }
}
