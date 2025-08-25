import { z } from "zod";

export const errorPasswordMessages = [
  "Debe tener al menos 6 caracteres",
  "Debe contener al menos una letra mayúscula",
  "Debe contener al menos una letra minúscula",
  "Debe contener al menos un número",
  "Debe incluir al menos un carácter especial",
  "No puede contener espacios",
];

export const passwordSchema = z
  .string()
  .min(6, { message: errorPasswordMessages[0] })
  .regex(/[A-Z]/, { message: errorPasswordMessages[1] })
  .regex(/[a-z]/, { message: errorPasswordMessages[2] })
  .regex(/[0-9]/, { message: errorPasswordMessages[3] })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: errorPasswordMessages[4] })
  .regex(/^[^\s]+$/, { message: errorPasswordMessages[5] });

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "El nombre es obligatorio" }).trim(),
    lastname: z
      .string()
      .min(1, { message: "El apellido es obligatorio" })
      .trim(),
    workstation: z
      .string()
      .min(1, { message: "El puesto es obligatorio" })
      .trim(),
    email: z.string().email({ message: "El correo no es válido" }).trim(),
    password: passwordSchema,
    passwordConfirmation: z.string().min(6, {
      message: "Debes confirmar tu contraseña",
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    message: "Las contraseñas no coinciden",
  });

export type RegisterFormSchema = z.infer<typeof registerSchema>;
