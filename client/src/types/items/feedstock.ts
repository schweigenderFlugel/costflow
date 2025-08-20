import { Currency } from "@/types/measure/currency"
import { BackendProperties } from "@/types/items/shared"
import { ItemMeasure } from "@/types/measure/measure-unit"


export interface Feedstock extends Omit<ItemMeasure, "quantity"> {
  name: string,
  currency: Currency,
  unit_cost: number,
  provider?: string,
}

// This interface intentionally left empty to satisfy type requirements.
export interface ObjFeedstock extends Feedstock, BackendProperties { }
