import { ObjProduct, Product } from "@/interfaces/interface-product";
import { FormDataProduct } from "@/schemas/product-schema";

export interface AlreadyCreatedProps {
  product: ObjProduct | Product | FormDataProduct | null;
  handleClose: () => void;
  handleReturn: () => void;
}
