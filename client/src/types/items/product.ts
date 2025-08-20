import { BackendProperties } from "@/types/items/shared"
import { Currency } from "@/types/measure/currency"
import { ItemMeasure, MeasureUnit } from "@/types/measure/measure-unit"
import { UUID } from "crypto"

// Interfaz para la relación entre productos y materias primas
interface ProductFeedstockInput {
  feedstock_id: UUID,
  quantity_required: number
}

export interface ObjProductFeedstock {
  id: UUID,
  quantity_required: number
  feedstock: UUID,
  product: UUID,
  currency: Currency,
  measure: MeasureUnit,
  name: string,
  unit_cost: number
}


// Producto en sí
export interface Product extends ItemMeasure {
  name: string,
  description?: string,
  feedstocks: ProductFeedstockInput[],
}

// This interface intentionally left empty to satisfy type requirements.
export interface ObjProduct extends BackendProperties, ItemMeasure {
  name: string
  description: string,
  feedstocks: ObjProductFeedstock[],
  provider: string,


  subtotal: number,
}

/* SUPUESTAMENTE DEVUELVE ESTO TMB PERO LO TENDRÁ Q CORREGIR EL BACK
  "measure_unit": "GRAMS",
  "resale_percentage": 2.5,
  "quantity": 20,
  "indirect_cost": 16.5,
  "public_percentage": 1.5,
}
*/
