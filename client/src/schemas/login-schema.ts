import { z } from "zod";

const errorPasswordMessages = [
  "Debe tener al menos 6 caracteres",
  "Debe contener al menos una letra mayúscula",
  "Debe contener al menos una letra minúscula",
  "Debe contener al menos un número",
  "Debe incluir al menos un carácter especial",
  "No puede contener espacios",
];

export const userSchema = z.object({
  email: z.string().email({ message: "El correo no es válido" }).trim(),
  password: z
    .string()
    .min(6, { message: errorPasswordMessages[0] })
    .regex(/[A-Z]/, { message: errorPasswordMessages[1] })
    .regex(/[a-z]/, { message: errorPasswordMessages[2] })
    .regex(/[0-9]/, { message: errorPasswordMessages[3] })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: errorPasswordMessages[4] })
    .regex(/^[^\s]+$/, { message: errorPasswordMessages[5] }),
});

export type LoginFormSchema = z.infer<typeof userSchema>;
