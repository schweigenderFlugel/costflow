import { create } from "zustand";

type UpdateTableState = {
  updateFeedstock: null | boolean;
  updateProduct: null | boolean;
  updateUsers: null | boolean;
};

type UpdateTableActions = {
  setUpdateFeedstock: (open: boolean) => void;
  setUpdateProduct: (open: boolean) => void;
  setUpdateUsers: (open: boolean) => void;
};

interface UpdateTableStore extends UpdateTableState, UpdateTableActions {}

const useUpdateDataTableStore = create<UpdateTableStore>()((set) => ({
  updateFeedstock: null,
  updateProduct: null,
  updateUsers: null,

  setUpdateFeedstock: (updateFeedstock: boolean) => set({ updateFeedstock }),
  setUpdateProduct: (updateProduct: boolean) => set({ updateProduct }),
  setUpdateUsers: (updateUsers: boolean) => set({ updateUsers }),
}));

export default useUpdateDataTableStore;
