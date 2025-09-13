import { ProductDialogStore } from "@/interfaces/interface-product-dialog-store";
import { create } from "zustand";

const useProductDialogStore = create<ProductDialogStore>()((set) => ({
  // state
  createProductDialog: false,
  updateProductDialog: false,
  deleteProductDialog: false,
  product: null,
  isLoadingProduct: false,
  // detailProductDialog: false,

  // set
  setCreateProductDialog: (open) => set({ createProductDialog: open }),
  setUpdateProductDialog: (open) => set({ updateProductDialog: open }),
  setDeleteProductDialog: (open) => set({ deleteProductDialog: open }),
  setProduct: (product) => set({ product }),
  setIsLoadingProduct: (loading) => set({ isLoadingProduct: loading }),
  // setDetailProductDialog: (open) => set({ detailProductDialog: open }),
}));

export default useProductDialogStore;
