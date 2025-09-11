import { ObjProduct } from "@/interfaces/interface-product";

type ProductDialogState = {
  product: ObjProduct | null;
  createProductDialog: boolean;
  updateProductDialog: boolean;
  deleteProductDialog: boolean;
  isLoadingProduct: boolean;
  // detailProductDialog: boolean;
};

type ProductDialogActions = {
  setProduct: (product: ObjProduct | null) => void;
  setCreateProductDialog: (open: boolean) => void;
  setUpdateProductDialog: (open: boolean) => void;
  setDeleteProductDialog: (open: boolean) => void;
  setIsLoadingProduct: (loading: boolean) => void;
  // setDetailProductDialog: (open: boolean) => void;
};

export interface ProductDialogStore
  extends ProductDialogState,
    ProductDialogActions {}
