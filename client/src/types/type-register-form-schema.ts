import { registerSchema } from "@/schemas/register-schema";
import z from "zod";

export type RegisterFormSchema = z.infer<typeof registerSchema>;
