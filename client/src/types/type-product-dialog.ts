import { ObjProduct } from "@/interfaces/interface-product";

export type ProductDialogState = {
  product: ObjProduct | null;
  createProductDialog: boolean;
  updateProductDialog: boolean;
  deleteProductDialog: boolean;
  isLoadingProduct: boolean;
  // detailProductDialog: boolean;
};

export type ProductDialogActions = {
  setProduct: (product: ObjProduct | null) => void;
  setCreateProductDialog: (open: boolean) => void;
  setUpdateProductDialog: (open: boolean) => void;
  setDeleteProductDialog: (open: boolean) => void;
  setIsLoadingProduct: (loading: boolean) => void;
  // setDetailProductDialog: (open: boolean) => void;
};
