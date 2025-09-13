import { ObjProduct, Product } from "@/interfaces/interface-product";
import { FormDataProduct } from "@/types/type-product";

export interface AlreadyCreatedProps {
  product: ObjProduct | Product | FormDataProduct | null;
  handleClose: () => void;
  handleReturn: () => void;
}
