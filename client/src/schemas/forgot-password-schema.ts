import { z } from "zod";

export const forgotSchema = z.object({
  email: z.email({ message: "El correo no es válido" }).trim(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotSchema>;
