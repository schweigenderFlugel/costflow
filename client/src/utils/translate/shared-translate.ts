import { MeasureUnit } from "@/types/measure/measure-unit"

// Traducciones de unidades
const translationMeasureUnit: Record<MeasureUnit, string> = {
  // Sólidos
  GRAMS: "Gramos",
  KILOGRAMS: "Kilogramos",
  TONNES: "Toneladas",
  UNITS: "Unidades",
  BOXES: "Cajas",
  METERS: "Metros",
  SQUARE_METERS: "Metros cuadrados",

  // Líquidos
  LITERS: "Litros",
  MILLILITERS: "Mililitros",
  GALLONS: "Galones",

  // Gases
  CUBIC_METERS: "Metros cúbicos",
  LITERS_GAS: "Litros (gas)",
}


export const translateMeasureUnit = (mu: MeasureUnit) => {
  return translationMeasureUnit[mu]
}
