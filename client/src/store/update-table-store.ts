import { UpdateTableStore } from "@/interfaces/interface-update-table-state";
import { create } from "zustand";

const useUpdateDataTableStore = create<UpdateTableStore>()((set) => ({
  // state inicial
  updateFeedstock: null,
  prevFeedstock: null,
  updateProduct: null,
  prevProduct: null,

  // users
  updateUsers: null,
  prevUsers: null,

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
  markPrevUsers: (value) => set({ prevUsers: value }),

  // indirect_cost
  setUpdateIndirectCost: (value) => set({ updateIndirectCost: value }),
  markPrevIndirectCost: (value) => set({ prevIndirectCost: value }),
}));

export default useUpdateDataTableStore;
