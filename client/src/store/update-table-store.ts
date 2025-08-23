import { create } from "zustand"

type UpdateTableState = {
  // feedstocks & products
  updateFeedstock: boolean | null
  prevFeedstock: boolean | null
  updateProduct: boolean | null
  prevProduct: boolean | null
  //  users
  updateUsers: null | boolean;
}

type UpdateTableActions = {
  // feedstocks & products
  setUpdateFeedstock: (value: boolean) => void
  setUpdateProduct: (value: boolean) => void
  markPrevFeedstock: (value: boolean | null) => void
  markPrevProduct: (value: boolean | null) => void
  //  users
  setUpdateUsers: (open: boolean) => void;
}

interface UpdateTableStore extends UpdateTableState, UpdateTableActions { }

const useUpdateDataTableStore = create<UpdateTableStore>()((set) => ({
  // state inicial
  updateFeedstock: null,
  prevFeedstock: null,
  updateProduct: null,
  prevProduct: null,

  // users
  updateUsers: null,


  // actions
  setUpdateFeedstock: (value) => set({ updateFeedstock: value }),
  setUpdateProduct: (value) => set({ updateProduct: value }),
  markPrevFeedstock: (value) => set({ prevFeedstock: value }),
  markPrevProduct: (value) => set({ prevProduct: value }),

  // users
  setUpdateUsers: (updateUsers: boolean) => set({ updateUsers }),

}))

export default useUpdateDataTableStore
