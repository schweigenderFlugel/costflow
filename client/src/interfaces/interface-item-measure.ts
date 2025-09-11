import { MeasureUnit, StateMatter } from "@/types/measure/measure-unit";

export interface ItemMeasure {
  state: StateMatter;
  measure_unit: MeasureUnit;
  quantity: number;
}
