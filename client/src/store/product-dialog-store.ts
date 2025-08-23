import { ObjProduct } from "@/types/items/product";
import { create } from "zustand"

type ProductDialogState = {
  product: ObjProduct | null;
  createProductDialog: boolean;
  updateProductDialog: boolean;
  deleteProductDialog: boolean;
  isLoadingProduct: boolean;
  // detailProductDialog: boolean;
}

type ProductDialogActions = {
  setProduct: (product: ObjProduct | null) => void;
  setCreateProductDialog: (open: boolean) => void;
  setUpdateProductDialog: (open: boolean) => void;
  setDeleteProductDialog: (open: boolean) => void;
  setIsLoadingProduct: (loading: boolean) => void;
  // setDetailProductDialog: (open: boolean) => void;
}

interface ProductDialogStore extends ProductDialogState, ProductDialogActions { }

const useProductDialogStore = create<ProductDialogStore>()(
  (set) => ({

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
  })
)

export default useProductDialogStore;
