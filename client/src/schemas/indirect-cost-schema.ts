import z from "zod";

// Schema
export const indirectCostSchema = z
  .object({
    type: z
      .string()
      .min(1, "El tipo de costo indirecto es requerido")
      .max(100, "El tipo no puede exceder 100 caracteres"),
    customType: z.string().optional(),
    amount: z
      .number({
        error: () => ({ message: "El monto debe ser un número válido" }),
      })
      .min(1, "El monto debe ser mayor a 0"),
    total_usage: z
      .number({
        error: () => ({ message: "El uso total debe ser un número válido" }),
      })
      .min(1, "El uso total debe ser mayor a 0")
      .int("La cantidad debe ser un número entero"),
    date: z
      .date({
        error: () => ({ message: "La fecha debe ser una fecha válida" }),
      })
      .min(
        new Date("2020-01-01"),
        "La fecha no puede ser anterior al 1 de enero de 2020"
      ),
  })
  .refine(
    (data) => {
      // Si selecciona "Otros", el customType debe estar lleno
      if (data.type === "Otros") {
        return data.customType && data.customType.trim().length > 0;
      }
      return true;
    },
    {
      message: "Debe especificar el tipo de costo cuando selecciona 'Otros'",
      path: ["customType"],
    }
  );
