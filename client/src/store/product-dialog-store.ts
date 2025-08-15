import { Product } from "@/types/items/product";
import { create } from "zustand"

type ProductDialogState = {
  product: Product | null;
  createProductDialog: boolean;
  updateProductDialog: boolean;
  deleteProductDialog: boolean;
  // detailProductDialog: boolean;
}

type ProductDialogActions = {
  setProduct: (product: Product | null) => void;
  setCreateProductDialog: (open: boolean) => void;
  setUpdateProductDialog: (open: boolean) => void;
  setDeleteProductDialog: (open: boolean) => void;
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
    // detailProductDialog: false,

    // set
    setCreateProductDialog: (open) => set({ createProductDialog: open }),
    setUpdateProductDialog: (open) => set({ updateProductDialog: open }),
    setDeleteProductDialog: (open) => set({ deleteProductDialog: open }),
    setProduct: (product) => set({ product }),
    // setDetailProductDialog: (open) => set({ detailProductDialog: open }),
  })
)

export default useProductDialogStore;
