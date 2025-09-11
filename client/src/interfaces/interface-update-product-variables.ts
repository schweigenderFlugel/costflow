import { FormDataProduct } from "@/schemas/product-schema";

export interface UpdateProductVariables extends FormDataProduct {
  productId: string;
}
