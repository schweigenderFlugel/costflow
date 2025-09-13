import { ObjProduct, Product } from "@/interfaces/interface-product";
import { FormDataProduct } from "@/types/type-product";

export interface AlreadyUpdatedProps {
  product: ObjProduct | Product | FormDataProduct | null;
  handleClose: () => void;
  handleReturn: () => void;
}
