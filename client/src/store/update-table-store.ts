import { create } from "zustand"

type UpdateTableState = {
  updateFeedstock: boolean | null
  prevFeedstock: boolean | null
  updateProduct: boolean | null
  prevProduct: boolean | null
}

type UpdateTableActions = {
  setUpdateFeedstock: (value: boolean) => void
  setUpdateProduct: (value: boolean) => void
  markPrevFeedstock: (value: boolean | null) => void
  markPrevProduct: (value: boolean | null) => void
}

interface UpdateTableStore extends UpdateTableState, UpdateTableActions { }

const useUpdateDataTableStore = create<UpdateTableStore>()((set) => ({
  // state inicial
  updateFeedstock: null,
  prevFeedstock: null,
  updateProduct: null,
  prevProduct: null,

  // actions
  setUpdateFeedstock: (value) => set({ updateFeedstock: value }),
  setUpdateProduct: (value) => set({ updateProduct: value }),
  markPrevFeedstock: (value) => set({ prevFeedstock: value }),
  markPrevProduct: (value) => set({ prevProduct: value }),
}))

export default useUpdateDataTableStore
