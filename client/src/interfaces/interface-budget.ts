import { ProductCalculation } from "@/types/type-product-calculation";

export interface BudgetTableProps {
  products: ProductCalculation[];
  ivaRate?: number; // por defecto 21%
}
