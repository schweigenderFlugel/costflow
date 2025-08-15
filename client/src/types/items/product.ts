import { MeasureUnit } from "@/types/items/feedstock"
import { Timestamp } from "@/types/items/shared"
import { UUID } from "crypto"

export interface Product {
  name: string,
  description?: string,
  product_feedstock: UUID | string,
  measure_unit: MeasureUnit,
  quantity: number,
  subtotal: number,
  indirect_cost: number,
  resale_percentage: number,
  public_percentage: number,
}

export interface ObjProduct extends Product, Timestamp {
  id: UUID
  is_deleted: boolean
}
