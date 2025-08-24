import { UUID } from "crypto";


export interface IndirectCostInput {
  "type": string,
  "amount": number,
  // "date": Date,
}


export interface IndirectCostObj extends IndirectCostInput {
  "id": UUID,
  "is_deleted": boolean,
  "date": Date,
  "historial_id": UUID
}

