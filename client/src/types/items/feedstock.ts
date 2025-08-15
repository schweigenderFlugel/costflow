import { Timestamp } from "@/types/items/shared"
import { UUID } from "crypto"


export enum MeasureUnit {
  GRAMS = 'GRAMS',
  //
  KILOGRAMS = 'KILOGRAMS',
  LITERS = 'LITERS',
  MILLILITERS = 'MILLILITERS',
  // CUBIC_CENTIMETERS = 'CM3',
  UNIT = 'UNIT',
}

export enum Currency {
  USD = 'USD',
  ARS = 'ARS',
}

export interface Feedstock {
  name: string,
  sku: string,
  currency: Currency,
  measure_unit: MeasureUnit,
  unit_cost: number,
  provider?: string,
  //
  quantity: number,
  entry_date: Date,
}

export interface ObjFeedstock extends Feedstock, Timestamp {
  id: UUID
  is_deleted: boolean
}
