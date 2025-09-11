import { ObjProduct, Product } from "@/interfaces/interface-product";
import { FormDataProduct } from "@/schemas/product-schema";

export interface AlreadyUpdatedProps {
  product: ObjProduct | Product | FormDataProduct | null;
  handleClose: () => void;
  handleReturn: () => void;
}
