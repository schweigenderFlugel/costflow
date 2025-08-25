import { IndirectCostObj } from "@/types/items/indirect-cost";
import { create } from "zustand"

type IndirectCostDialogState = {
  indirectCost: IndirectCostObj | null;
  createIndirectCostDialog: boolean;
  updateIndirectCostDialog: boolean;
  deleteIndirectCostDialog: boolean;
  // isLoadingIndirectCost: boolean;
  // detailIndirectCostDialog: boolean;
}

type IndirectCostDialogActions = {
  setIndirectCost: (indirectCost: IndirectCostObj | null) => void;
  setCreateIndirectCostDialog: (open: boolean) => void;
  setUpdateIndirectCostDialog: (open: boolean) => void;
  setDeleteIndirectCostDialog: (open: boolean) => void;
  // setIsLoadingIndirectCost: (loading: boolean) => void;
  // setDetailProductDialog: (open: boolean) => void;
}

interface IndirectCostDialogStore extends IndirectCostDialogState, IndirectCostDialogActions { }

const useIndirectCostDialogStore = create<IndirectCostDialogStore>()(
  (set) => ({

    // state
    createIndirectCostDialog: false,
    updateIndirectCostDialog: false,
    deleteIndirectCostDialog: false,
    indirectCost: null,
    // isLoadingIndirectCost: false,
    // detailIndirectCostDialog: false,

    // set
    setCreateIndirectCostDialog: (open) => set({ createIndirectCostDialog: open }),
    setUpdateIndirectCostDialog: (open) => set({ updateIndirectCostDialog: open }),
    setDeleteIndirectCostDialog: (open) => set({ deleteIndirectCostDialog: open }),
    setIndirectCost: (indirectCost) => set({ indirectCost }),
    // setIsLoadingIndirectCost: (loading) => set({ isLoadingIndirectCost: loading }),
    // setDetailIndirectCostDialog: (open) => set({ detailIndirectCostDialog: open }),
  })
)

export default useIndirectCostDialogStore;
