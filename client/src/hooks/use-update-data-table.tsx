import useUpdateDataTableStore from "@/store/update-table-store"
import { useShallow } from "zustand/react/shallow"

export const useUpdateDataTable = (dataForTable: "feedstock" | "product" = "feedstock") => {
  const {
    updateFeedstock,
    updateProduct,
    setUpdateFeedstock,
    setUpdateProduct
  } = useUpdateDataTableStore(useShallow((state) => (state)))

  if (dataForTable == "product") {
    return {
      state: updateProduct,
      toggle: () => setUpdateProduct(!updateProduct),
    }
  }

  return {
    state: updateFeedstock,
    toggle: () => setUpdateFeedstock(!updateFeedstock),
  }
}

