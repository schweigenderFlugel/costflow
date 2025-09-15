import { MeasureUnits } from "@/types/measure/type-measure-units";

export type FeedstockOption = {
  id: string;
  name: string;
  currency: "ARS" | "USD";
  unit_cost: number;
  measure_unit: keyof typeof MeasureUnits;
};
