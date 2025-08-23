import { UsersData } from "@/types/items/users";

export const mockUsers: UsersData[] = [
  {
    id: "1",
    name: "Luis",
    lastname: "Ángel",
    email: "luis@example.com",
    role: "Admin",
    workstation: "IT",
    state: "PENDING",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    recovery_code: null,
  },
  {
    id: "2",
    name: "Ana",
    lastname: "García",
    email: "ana@example.com",
    role: "User",
    workstation: null,
    state: "ACCEPTED",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    recovery_code: null,
  },
];
