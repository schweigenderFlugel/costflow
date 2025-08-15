import { z } from "zod";
import { MeasureUnit, Currency } from "@/types/items/feedstock";

// Esquema para creación
export const feedstockSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  sku: z.string().min(1, "SKU is required").max(50),
  currency: z.nativeEnum(Currency, { error: "Currency is required" }),
  measure_unit: z.nativeEnum(MeasureUnit, { error: "Measure unit is required" }),
  unit_cost: z.number({ error: "Unit cost must be a number" }).min(1, "Must be positive"),
  quantity: z.number({ error: "Quantity cost must be a number" }).min(1, "Must be positive"),
  provider: z.string().max(100).optional(),
  entry_date: z.date({ error: "Entry date is required" }),
});

export type FormDataFeedstock = z.infer<typeof feedstockSchema>;

// Esquema para edición (puede tener todos los campos opcionales si tu backend lo permite)
export const updateFeedstockSchema = feedstockSchema.partial();

// Esquema para el objeto que viene del backend
export const objFeedstockSchema = feedstockSchema.extend({
  id: z.string().uuid(),
  is_deleted: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ObjFeedstockValidated = z.infer<typeof objFeedstockSchema>;
