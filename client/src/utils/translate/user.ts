import { UserRole, UsersData, UserState } from "@/types/items/users";

const translationRole: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.EMPLOYEE]: "Empleado",
};

const translationState: Record<UserState, string> = {
  [UserState.PENDING]: "Pendiente",
  [UserState.REJECTED]: "Rechazado",
  [UserState.ACCEPTED]: "Aceptado",
};

const translationsHeaders: Record<keyof UsersData, string> = {
  id: "ID",
  name: "Nombre",
  lastname: "Apellido",
  email: "Email",
  role: "Rol",
  workstation: "Puesto",
  created_at: "Creado",
  updated_at: "Actualizado",
  recovery_code: "Código de recuperación",
  state: "Estado",
};

export const translateUserHeaders = (header: keyof UsersData | "actions") => {
  if (header === "actions") return "Acciones";
  return translationsHeaders[header as keyof UsersData];
};

export const translateUserState = (state: UserState) => {
  return translationState[state];
};

export const translateUserRole = (role: UserRole) => {
  return translationRole[role];
};
