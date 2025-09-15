import { IndirectCostDialogStore } from "@/interfaces/interface-indirect-cost-dialog-store";
import { create } from "zustand";

const useIndirectCostDialogStore = create<IndirectCostDialogStore>()((set) => ({
  // state
  createIndirectCostDialog: false,
  updateIndirectCostDialog: false,
  deleteIndirectCostDialog: false,
  indirectCost: null,
  // isLoadingIndirectCost: false,
  // detailIndirectCostDialog: false,

  // set
  setCreateIndirectCostDialog: (open) =>
    set({ createIndirectCostDialog: open }),
  setUpdateIndirectCostDialog: (open) =>
    set({ updateIndirectCostDialog: open }),
  setDeleteIndirectCostDialog: (open) =>
    set({ deleteIndirectCostDialog: open }),
  setIndirectCost: (indirectCost) => set({ indirectCost }),
  // setIsLoadingIndirectCost: (loading) => set({ isLoadingIndirectCost: loading }),
  // setDetailIndirectCostDialog: (open) => set({ detailIndirectCostDialog: open }),
}));

export default useIndirectCostDialogStore;
