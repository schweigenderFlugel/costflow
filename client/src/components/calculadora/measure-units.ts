export const MeasureUnits = {
  GRAMS: { value: "GRAMS", label: "g" },
  KILOGRAMS: { value: "KILOGRAMS", label: "kg" },
  TONNES: { value: "TONNES", label: "ton" },
  UNITS: { value: "UNITS", label: "pz" },
  METERS: { value: "METERS", label: "m" },
  SQUARE_METERS: { value: "SQUARE_METERS", label: "m²" },
  LITERS: { value: "LITERS", label: "L" },
  MILLILITERS: { value: "MILLILITERS", label: "ml" },
  GALLONS: { value: "GALLONS", label: "gal" },
  CUBIC_METERS: { value: "CUBIC_METERS", label: "m³" },
  LITERS_GAS: { value: "LITERS_GAS", label: "L (gas)" },
} as const;

export type MeasureUnit = keyof typeof MeasureUnits;
