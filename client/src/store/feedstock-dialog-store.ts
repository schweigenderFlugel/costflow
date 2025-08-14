

import { Feedstock } from "@/types/items/feedstock";
import { create } from "zustand"

type DialogState = {
  feedstock: Feedstock | null;
  createFeedstockDialog: boolean;
  updateFeedstockDialog: boolean;
  deleteFeedstockDialog: boolean;
  // detailFeedstockDialog: boolean;
}

type DialogActions = {
  setFeedstock: (fs: Feedstock | null) => void;
  setCreateFeedstockDialog: (open: boolean) => void;
  setUpdateFeedstockDialog: (open: boolean) => void;
  setDeleteFeedstockDialog: (open: boolean) => void;
  // setDetailFeedstockDialog: (open: boolean) => void;
}

interface DialogStore extends DialogState, DialogActions { }

const useDialogStore = create<DialogStore>()(
  (set) => ({

    // state
    createFeedstockDialog: false,
    updateFeedstockDialog: false,
    deleteFeedstockDialog: false,
    feedstock: null,
    // detailFeedstockDialog: false,

    // set
    setCreateFeedstockDialog: (open) => set({ createFeedstockDialog: open }),
    setUpdateFeedstockDialog: (open) => set({ updateFeedstockDialog: open }),
    setDeleteFeedstockDialog: (open) => set({ deleteFeedstockDialog: open }),
    setFeedstock: (fs) => set({ feedstock: fs }),
    // setDetailFeedstockDialog: (open) => set({ detailFeedstockDialog: open }),
  })
)

export default useDialogStore;
