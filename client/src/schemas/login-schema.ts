import { z } from "zod";

export const userSchema = z.object({
  email: z.email({ message: "El correo no es válido" }).trim(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export type LoginFormSchema = z.infer<typeof userSchema>;
