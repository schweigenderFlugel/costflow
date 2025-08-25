import { create } from "zustand"

type UpdateTableState = {
  // feedstocks & products
  updateFeedstock: boolean | null
  prevFeedstock: boolean | null
  updateProduct: boolean | null
  prevProduct: boolean | null
  //  users
  updateUsers: null | boolean;
  // indirect_cost
  updateIndirectCost: null | boolean;
  prevIndirectCost: null | boolean;
}

type UpdateTableActions = {
  // feedstocks & products
  setUpdateFeedstock: (value: boolean) => void
  setUpdateProduct: (value: boolean) => void
  markPrevFeedstock: (value: boolean | null) => void
  markPrevProduct: (value: boolean | null) => void
  //  users
  setUpdateUsers: (open: boolean) => void;
  // indirect_cost
  setUpdateIndirectCost: (open: boolean) => void;
  markPrevIndirectCost: (open: boolean | null) => void;
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

  // indirect_cost
  updateIndirectCost: null,
  prevIndirectCost: null,

  // actions
  setUpdateFeedstock: (value) => set({ updateFeedstock: value }),
  setUpdateProduct: (value) => set({ updateProduct: value }),
  markPrevFeedstock: (value) => set({ prevFeedstock: value }),
  markPrevProduct: (value) => set({ prevProduct: value }),

  // users
  setUpdateUsers: (updateUsers: boolean) => set({ updateUsers }),

  // indirect_cost
  setUpdateIndirectCost: (value) => set({ updateIndirectCost: value }),
  markPrevIndirectCost: (value) => set({ prevIndirectCost: value }),

}))

export default useUpdateDataTableStore
