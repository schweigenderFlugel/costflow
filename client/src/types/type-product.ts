import {
  objProductSchema,
  productSchema,
  updateProductSchema,
} from "@/schemas/product-schema";
import { Product } from "@/types/product/type-product";
import z from "zod";

export type ProductOption = {
  id: string;
  product_name: string;
  indirect_costs: number;
  feedstocks_costs: number;
  labour_costs: number;
};

export type SelectedProduct = Product & {
  indirect_costs: number;
  feedstocks_costs: number;
  labour_costs: number;
};

export type FormDataProduct = z.infer<typeof productSchema>;

export type FormDataUpdate = z.infer<typeof updateProductSchema>;

export type ObjProductValidated = z.infer<typeof objProductSchema>;
