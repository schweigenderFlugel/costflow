import { indirectCostSchema } from "@/schemas/indirect-cost-schema";
import z from "zod";

export type FormDataIndirectCost = z.infer<typeof indirectCostSchema>;
