import { UsersData } from "@/types/items/users";

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
