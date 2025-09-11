import { DialogStore } from "@/interfaces/interface-dialog-store";
import { create } from "zustand";

const useDialogStore = create<DialogStore>()((set) => ({
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
}));

export default useDialogStore;
