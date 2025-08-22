export interface UsersData {
  id: string;
  role: string;
  name: string;
  lastname: string;
  workstation: string | null;
  email: string;
  created_at: string;
  updated_at: string;
  recovery_code: string | null;
  state: "PENDING" | "ACCEPTED" | "REJECTED";
}
