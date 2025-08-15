import { z } from "zod";
import { MeasureUnit } from "@/types/items/feedstock";

// Esquema base para creación
export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(255).optional(),
  product_feedstock: z.union([z.string().uuid(), z.string().min(1, "Feedstock ID is required")]),
  measure_unit: z.nativeEnum(MeasureUnit, { error: "Measure unit is required" }),
  quantity: z.number({ error: "Quantity must be a number" }).min(1, "Must be positive"),
  subtotal: z.number({ error: "Subtotal must be a number" }).min(1, "Must be positive"),
  indirect_cost: z.number({ error: "Indirect cost must be a number" }).min(0, "Must be positive"),
  resale_percentage: z.number({ error: "Resale percentage must be a number" }).min(0).max(100),
  public_percentage: z.number({ error: "Public percentage must be a number" }).min(0).max(100),
});

export type FormDataProduct = z.infer<typeof productSchema>;

// Esquema para edición (campos opcionales si tu API lo permite)
export const updateProductSchema = productSchema.partial();

// Esquema para respuesta del backend
export const objProductSchema = productSchema.extend({
  id: z.string().uuid(),
  is_deleted: z.boolean(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ObjProductValidated = z.infer<typeof objProductSchema>;
