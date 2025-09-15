import { FormDataProduct } from "@/types/type-product";

export interface UpdateProductVariables extends FormDataProduct {
  productId: string;
}
