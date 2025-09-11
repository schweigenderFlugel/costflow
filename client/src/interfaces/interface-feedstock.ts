import { ItemMeasure } from "@/interfaces/interface-item-measure";
import { Currency } from "@/types/measure/currency";

export interface Feedstock extends Omit<ItemMeasure, "quantity"> {
  name: string;
  currency: Currency;
  unit_cost: number;
  provider?: string;
  sku: string;
}
