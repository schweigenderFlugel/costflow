import { MeasureUnit, StateMatter } from "@/types/measure/measure-unit";



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


