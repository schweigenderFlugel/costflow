import {
  MeasureUnit,
  StateMatter,
  SolidMeasure,
  LiquidMeasure,
  GasMeasure
} from "@/types/measure/measure-unit";
import { z } from "zod";

// Esquema para ProductFeedstockInput
export const productFeedstockInputSchema = z.object({
  id: z.string().uuid("ID de insumo debe ser un UUID válido"),
  name: z.string(), // unicamente para manejar el detalle
  measure_unit: z.nativeEnum(MeasureUnit), // unicamente para manejar el detalle
  quantity_required: z.number({
    error: () => ({ message: "La cantidad requerida debe ser un número" })
  }).min(0.01, "La cantidad requerida debe ser mayor a 0"),
});

// Esquema para creación de producto
export const productSchema = z.object({
  name: z.string()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  description: z.string()
    .max(255, "La descripción no puede exceder 255 caracteres")
    .optional(),
  sku: z.string()
    .min(1, "El SKU es requerido")
    .max(50, "El SKU no puede exceder 50 caracteres"),
  state: z.nativeEnum(StateMatter, {
    error: () => ({ message: "El estado de la materia es requerido" })
  }),
  measure_unit: z.nativeEnum(MeasureUnit, {
    error: () => ({ message: "La unidad de medida es requerida" })
  }),
  quantity: z.number({
    error: () => ({ message: "La cantidad debe ser un número" })
  }).min(0.01, "La cantidad debe ser mayor a 0"),
  feedstocks: z.array(productFeedstockInputSchema)
    .min(1, "Debe incluir al menos un insumo"),
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

export type FormDataProduct = z.infer<typeof productSchema>;

// Esquema para edición (campos opcionales si tu API lo permite)
export const updateProductSchema = productSchema.partial();

// Esquema para respuesta del backend
export const objProductSchema = productSchema.extend({
  id: z.string().uuid("ID debe ser un UUID válido"),
  is_deleted: z.boolean(),
  created_at: z.date({ error: () => ({ message: "Fecha de creación inválida" }) }),
  updated_at: z.date({ error: () => ({ message: "Fecha de actualización inválida" }) }),
  provider: z.string().optional(),
  subtotal: z.number().optional(),
});

export type ObjProductValidated = z.infer<typeof objProductSchema>;
