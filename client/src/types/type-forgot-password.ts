import { forgotSchema } from "@/schemas/forgot-password-schema";
import z from "zod";

export type ForgotPasswordSchema = z.infer<typeof forgotSchema>;
