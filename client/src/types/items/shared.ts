import { UUID } from "crypto"

interface Timestamp {
  // created_at: Date,
  // updated_at: Date
  date: Date
}

export interface BackendProperties extends Timestamp {
  id: UUID,
  is_deleted: boolean
}
