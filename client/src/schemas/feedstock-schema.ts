import { z } from "zod";
import {
  MeasureUnit,
  StateMatter,
  SolidMeasure,
  LiquidMeasure,
  GasMeasure
} from "@/types/measure/measure-unit";
import { Currency } from "@/types/measure/currency";

// Esquema para creación
export const feedstockSchema = z.object({
  name: z.string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  state: z.nativeEnum(StateMatter, {
    error: () => ({ message: "El estado de la materia es requerido" })
  }),
  currency: z.nativeEnum(Currency, {
    error: () => ({ message: "La moneda es requerida" })
  }),
  unit_cost: z.number({
    error: () => ({ message: "El costo unitario debe ser un número" })
  }).min(1, "El costo unitario debe ser mayor a 0"),
  provider: z.string()
    .max(100, "El proveedor no puede exceder 100 caracteres")
    .optional(),
  measure_unit: z.nativeEnum(MeasureUnit, {
    error: () => ({ message: "La unidad de medida es requerida" })
  }),
  sku: z.string()
    .min(1, "El SKU es requerido")
    .max(100, "El SKU no puede exceder 100 caracteres")
}).refine((data) => {
  // Validación condicional de unidades de medida según el estado de la materia
  if (data.state === StateMatter.SOLID) {
    return Object.values(SolidMeasure).includes(data.measure_unit as unknown as SolidMeasure);
  }
  if (data.state === StateMatter.LIQUID) {
    return Object.values(LiquidMeasure).includes(data.measure_unit as unknown as LiquidMeasure);
  }
  if (data.state === StateMatter.GASEOUS) {
    return Object.values(GasMeasure).includes(data.measure_unit as unknown as GasMeasure);
  }
  return false;
}, {
  message: "La unidad de medida no es válida para el estado de la materia seleccionado",
  path: ["measure_unit"]
});


export type FormDataFeedstock = z.infer<typeof feedstockSchema>;

// Esquema para edición (puede tener todos los campos opcionales si tu backend lo permite)
export const updateFeedstockSchema = feedstockSchema.partial();

// Esquema para el objeto que viene del backend
export const objFeedstockSchema = feedstockSchema.extend({
  id: z.string().uuid("ID debe ser un UUID válido"),
  is_deleted: z.boolean(),
  created_at: z.date({ error: () => ({ message: "Fecha de creación inválida" }) }),
  updated_at: z.date({ error: () => ({ message: "Fecha de actualización inválida" }) }),
});

export type ObjFeedstockValidated = z.infer<typeof objFeedstockSchema>;
