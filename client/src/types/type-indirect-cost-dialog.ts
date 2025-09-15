import { IndirectCostObj } from "@/interfaces/interface-indirect-costs";

export type IndirectCostDialogState = {
  indirectCost: IndirectCostObj | null;
  createIndirectCostDialog: boolean;
  updateIndirectCostDialog: boolean;
  deleteIndirectCostDialog: boolean;
  // isLoadingIndirectCost: boolean;
  // detailIndirectCostDialog: boolean;
};

export type IndirectCostDialogActions = {
  setIndirectCost: (indirectCost: IndirectCostObj | null) => void;
  setCreateIndirectCostDialog: (open: boolean) => void;
  setUpdateIndirectCostDialog: (open: boolean) => void;
  setDeleteIndirectCostDialog: (open: boolean) => void;
  // setIsLoadingIndirectCost: (loading: boolean) => void;
  // setDetailProductDialog: (open: boolean) => void;
};
