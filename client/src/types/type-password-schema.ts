import { z } from "zod";
import { passwordSchema } from "@/schemas/register-schema";

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(6, {
      message: "Debes confirmar tu contraseña",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
