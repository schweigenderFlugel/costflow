type UpdateTableState = {
  // feedstocks & products
  updateFeedstock: boolean | null;
  prevFeedstock: boolean | null;
  updateProduct: boolean | null;
  prevProduct: boolean | null;
  //  users
  updateUsers: null | boolean;
  prevUsers: null | boolean;
  // indirect_cost
  updateIndirectCost: null | boolean;
  prevIndirectCost: null | boolean;
};

type UpdateTableActions = {
  // feedstocks & products
  setUpdateFeedstock: (value: boolean) => void;
  setUpdateProduct: (value: boolean) => void;
  markPrevFeedstock: (value: boolean | null) => void;
  markPrevProduct: (value: boolean | null) => void;
  //  users
  setUpdateUsers: (open: boolean) => void;
  markPrevUsers: (open: boolean | null) => void;
  // indirect_cost
  setUpdateIndirectCost: (open: boolean) => void;
  markPrevIndirectCost: (open: boolean | null) => void;
};

export interface UpdateTableStore
  extends UpdateTableState,
    UpdateTableActions {}
