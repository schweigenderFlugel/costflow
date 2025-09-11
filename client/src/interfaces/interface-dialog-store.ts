import { ObjFeedstock } from "@/interfaces/interface-obj-feedstock";

type DialogState = {
  feedstock: ObjFeedstock | null;
  createFeedstockDialog: boolean;
  updateFeedstockDialog: boolean;
  deleteFeedstockDialog: boolean;
  // detailFeedstockDialog: boolean;
};

type DialogActions = {
  setFeedstock: (fs: ObjFeedstock | null) => void;
  setCreateFeedstockDialog: (open: boolean) => void;
  setUpdateFeedstockDialog: (open: boolean) => void;
  setDeleteFeedstockDialog: (open: boolean) => void;
  // setDetailFeedstockDialog: (open: boolean) => void;
};

export interface DialogStore extends DialogState, DialogActions {}
