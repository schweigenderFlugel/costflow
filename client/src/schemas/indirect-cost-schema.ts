import z from "zod";

// Schema
export const indirectCostSchema = z.object({
  type: z.string()
    .min(1, "El tipo de costo indirecto es requerido")
    .max(100, "El tipo no puede exceder 100 caracteres"),
  customType: z.string().optional(),
  amount: z.number({
    error: () => ({ message: "El monto debe ser un número válido" })
  }).min(0.01, "El monto debe ser mayor a 0")
}).refine((data) => {
  // Si selecciona "Otros", el customType debe estar lleno
  if (data.type === "Otros") {
    return data.customType && data.customType.trim().length > 0;
  }
  return true;
}, {
  message: "Debe especificar el tipo de costo cuando selecciona 'Otros'",
  path: ["customType"]
});

export type FormDataIndirectCost = z.infer<typeof indirectCostSchema>;
