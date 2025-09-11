import { z } from "zod";

// no se suele validar esto en el login, solo en el registro
// const errorPasswordMessages = [
//   "Debe tener al menos 6 caracteres",
//   "Debe contener al menos una letra mayúscula",
//   "Debe contener al menos una letra minúscula",
//   "Debe contener al menos un número",
//   "Debe incluir al menos un carácter especial",
//   "No puede contener espacios",
// ];

export const userSchema = z.object({
  email: z.string().email({ message: "El correo no es válido" }).trim(),
  password: z.string().min(1, "Ingrese su contraseña"),
});
