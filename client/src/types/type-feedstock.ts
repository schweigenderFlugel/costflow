import {
  feedstockSchema,
  objFeedstockSchema,
} from "@/schemas/feedstock-schema";
import z from "zod";

export type FormDataFeedstock = z.infer<typeof feedstockSchema>;

export type ObjFeedstockValidated = z.infer<typeof objFeedstockSchema>;
