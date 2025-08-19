

import { create } from "zustand"

type UpdateTableState = {
  updateFeedstock: null | boolean,
  updateProduct: null | boolean,
}

type UpdateTableActions = {
  setUpdateFeedstock: (open: boolean) => void;
  setUpdateProduct: (open: boolean) => void;
}

interface UpdateTableStore extends UpdateTableState, UpdateTableActions { }

const useUpdateDataTableStore = create<UpdateTableStore>()(
  (set) => ({

    // state
    updateFeedstock: null,
    updateProduct: null,

    // set
    setUpdateFeedstock: (updateFeedstock: boolean) => set({ updateFeedstock }),
    setUpdateProduct: (updateProduct: boolean) => set({ updateProduct }),
  })
)

export default useUpdateDataTableStore;
