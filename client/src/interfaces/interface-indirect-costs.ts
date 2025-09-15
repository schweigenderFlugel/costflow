import { UUID } from "crypto";

export interface IndirectCostInput {
  type: string;
  amount: number;
  date: Date;
  total_usage: number;
}

export interface IndirectCostObj extends IndirectCostInput {
  id: UUID;
  is_deleted: boolean;
  historial_id: UUID;
}
