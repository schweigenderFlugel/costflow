import { userSchema } from "@/schemas/login-schema";
import z from "zod";

export type LoginFormSchema = z.infer<typeof userSchema>;
