import { UUID } from "crypto";


export interface IndirectCostInput {
  "type": String,
  "amount": number,
  "date": Date,

}


export interface IndirectCostObj extends IndirectCostInput {
  "id": UUID,
  "is_deleted": boolean,
  "historial_id": UUID
}

