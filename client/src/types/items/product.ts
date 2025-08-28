import { BackendProperties } from "@/types/items/shared"
import { Currency } from "@/types/measure/currency"
import { ItemMeasure, MeasureUnit } from "@/types/measure/measure-unit"
import { UUID } from "crypto"

export interface ProductIndirectCostInput {
  id: string,
  usage: number
}


// Interfaz para la relación entre productos y materias primas
export interface ProductFeedstockInput {
  name: string; // unicamente para el detalle
  id: string;
  quantity_required: number;
}

export interface ObjProductFeedstock {
  id: UUID,
  quantity_required: number;
  feedstock: UUID;
  product: UUID;
  currency: Currency;
  measure_unit: MeasureUnit,
  name: string;
  unit_cost: number;
  sku: string;
}


// Producto en sí
export interface Product extends ItemMeasure {
  name: string;
  description?: string;
  feedstocks: ProductFeedstockInput[];
  sku: string;
  // news
  labour_time: number;
  indirect_costs: ProductIndirectCostInput[];
}

export interface ObjProduct extends Omit<Product, 'feedstocks'>, BackendProperties, ItemMeasure {
  feedstocks: ObjProductFeedstock[];
  indirect_costs: ProductIndirectCostInput[];
}
