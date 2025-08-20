
import { ObjFeedstock } from "@/types/items/feedstock";
import { ObjProduct } from "@/types/items/product";
import { StateMatter, MeasureUnit } from "@/types/measure/measure-unit";

const translationsFeedstockHeaders: Record<keyof ObjFeedstock, string> = {
  // Información general
  id: "ID",
  is_deleted: "Eliminado",
  created_at: "Creado",
  updated_at: "Actualizado",
  // Información del producto
  name: "Nombre",
  //
  state: "Estado",
  measure_unit: "Unidad",
  quantity: "Cantidad",
  //
  provider: "Proveedor",
  currency: "Moneda",
  unit_cost: "Costo",
};


const translationsProductsHeaders: Record<keyof ObjProduct, string> = {
  // Información general
  id: "ID",
  is_deleted: "Eliminado",
  created_at: "Creado",
  updated_at: "Actualizado",
  // Información del producto
  name: "Nombre",
  description: "Descripción",
  //
  state: "Estado",
  measure_unit: "Unidad",
  quantity: "Cantidad",
  //
  provider: "Proveedor",
  subtotal: "Subtotal",
  feedstocks: "Materias Primas",
};




export const translateFeedstockHeaders = (header: keyof ObjFeedstock) => translationsFeedstockHeaders[header]
export const translateProductsHeaders = (header: keyof ObjProduct) => translationsProductsHeaders[header]

// Traducciones para estados de materia
const translationsStateMatter: Record<StateMatter, string> = {
  [StateMatter.SOLID]: "Sólido",
  [StateMatter.LIQUID]: "Líquido",
  [StateMatter.GAS]: "Gas",
};

// Traducciones para unidades de medida
const translationsMeasureUnit: Record<MeasureUnit, string> = {
  // Sólidos
  [MeasureUnit.GRAMS]: "Gramos",
  [MeasureUnit.KILOGRAMS]: "Kilogramos",
  [MeasureUnit.TONNES]: "Toneladas",
  [MeasureUnit.UNITS]: "Unidades",
  [MeasureUnit.BOXES]: "Cajas",
  [MeasureUnit.METERS]: "Metros",
  [MeasureUnit.SQUARE_METERS]: "Metros cuadrados",

  // Líquidos
  [MeasureUnit.LITERS]: "Litros",
  [MeasureUnit.MILLILITERS]: "Mililitros",
  [MeasureUnit.GALLONS]: "Galones",

  // Gases
  [MeasureUnit.CUBIC_METERS]: "Metros cúbicos",
  [MeasureUnit.LITERS_GAS]: "Litros (gas)",
};

export const translateStateMatter = (state: StateMatter) => translationsStateMatter[state];
export const translateMeasureUnit = (unit: MeasureUnit) => translationsMeasureUnit[unit];


