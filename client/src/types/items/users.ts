
export enum UserState {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export interface UsersData {
  id: string;
  role: UserRole;
  name: string;
  lastname: string;
  workstation: string | null;
  email: string;
  created_at: string;
  updated_at: string;
  recovery_code: string | null;
  state: UserState;
}
