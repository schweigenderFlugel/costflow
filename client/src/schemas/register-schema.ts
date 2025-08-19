import { z } from "zod";

export const registerSchema = z.object({
  // name: z.string().min(1, { message: "El nombre es obligatorio" }).trim(),
  // lastname: z.string().min(1, { message: "El apellido es obligatorio" }).trim(),
  email: z.string().email({ message: "El correo no es válido" }).trim(),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  // terms: z.boolean().refine((val) => val === true, {
  //   message: "Debes aceptar los términos y condiciones",
  // }),
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;
