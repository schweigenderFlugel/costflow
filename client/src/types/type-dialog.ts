import { ObjFeedstock } from "@/interfaces/interface-obj-feedstock";

export type DialogState = {
  feedstock: ObjFeedstock | null;
  createFeedstockDialog: boolean;
  updateFeedstockDialog: boolean;
  deleteFeedstockDialog: boolean;
  // detailFeedstockDialog: boolean;
};

export type DialogActions = {
  setFeedstock: (fs: ObjFeedstock | null) => void;
  setCreateFeedstockDialog: (open: boolean) => void;
  setUpdateFeedstockDialog: (open: boolean) => void;
  setDeleteFeedstockDialog: (open: boolean) => void;
  // setDetailFeedstockDialog: (open: boolean) => void;
};
