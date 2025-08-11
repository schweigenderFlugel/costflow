import { Timestamp } from "@/types/items/shared"
import { UUID } from "crypto"


export enum MeasureUnit {
  GRAMS = 'GRAMS',
  CUBIC_CENTIMETERS = 'CM3',
  UNIT = 'UNIT',
  OTHERS = 'OTHERS'
}

export enum Currency {
  USD = 'USD',
  ARS = 'ARS',
  OTHER = 'OTHER'
}

export interface Feedstock {
  name: string,
  sku: string,
  currency: Currency,
  measure_unit: MeasureUnit,
  unit_cost: number,
  provider?: string,
}

export interface ObjFeedstock extends Feedstock, Timestamp {
  id: UUID
  is_deleted: boolean
}
