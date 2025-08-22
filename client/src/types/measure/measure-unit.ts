
// Estado de la materia
export enum StateMatter {
  SOLID = "SOLID",
  LIQUID = "LIQUID",
  GASEOUS = "GASEOUS",
}

export enum SolidMeasure {
  GRAMS = "GRAMS",
  KILOGRAMS = "KILOGRAMS",
  TONNES = "TONNES",
  UNITS = "UNITS",
  BOXES = "BOXES",
  METERS = "METERS",
  SQUARE_METERS = "SQUARE_METERS",
}

export enum LiquidMeasure {
  LITERS = "LITERS",
  MILLILITERS = "MILLILITERS",
  GALLONS = "GALLONS",
}

export enum GasMeasure {
  CUBIC_METERS = "CUBIC_METERS",
  LITERS_GAS = "LITERS_GAS",
}


// Unidades de medida
export enum MeasureUnit {
  // Sólidos
  GRAMS = "GRAMS",
  KILOGRAMS = "KILOGRAMS",
  TONNES = "TONNES",
  UNITS = "UNITS",
  METERS = "METERS",
  SQUARE_METERS = "SQUARE_METERS",

  // Líquidos
  LITERS = "LITERS",
  MILLILITERS = "MILLILITERS",
  GALLONS = "GALLONS",

  // Gases
  CUBIC_METERS = "CUBIC_METERS",
  LITERS_GAS = "LITERS_GAS",
}

export interface ItemMeasure {
  state: StateMatter,
  measure_unit: MeasureUnit,
  quantity: number,
}
