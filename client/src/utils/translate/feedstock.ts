
import { ObjFeedstock, MeasureUnit } from "@/types/items/feedstock";

const translationsHeaders: Record<keyof ObjFeedstock, string> = {
  id: "ID",
  provider: "Proveedor",
  name: "Nombre",
  quantity: "Cantidad",
  measure_unit: "Unidad",
  currency: "Moneda",
  unit_cost: "Costo",
  entry_date: "F. de entrada",
  is_deleted: "Eliminado",
  created_at: "Creado",
  updated_at: "Actualizado",
};

const translationMeasureUnit: Record<MeasureUnit, string> = {
  GRAMS: "Gramos",
  KILOGRAMS: "Kilogramos",
  LITERS: "Litros",
  MILLILITERS: "Mililitros",
  UNIT: "Unidad",
  OTHERS: "Otros",
}

export const translateFeedstockHeaders = (header: keyof ObjFeedstock) => {
  return translationsHeaders[header]
}


export const translateMeasureUnit = (mu: MeasureUnit) => {
  return translationMeasureUnit[mu]
}
