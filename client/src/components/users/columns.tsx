"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  UserRole,
  UsersData,
  UserState,
} from "../../interfaces/interface-users";
import {
  createActionsColumn,
  createDateColumn,
  createTextColumn,
  createTranslatedColumn,
} from "@/components/shared/data-table/column-helpers";
import { translateUserRole, translateUserState } from "@/utils/translate/user";
import UserActions from "@/components/users/user-actions";

export const columns: ColumnDef<UsersData>[] = [
  createTextColumn<UsersData>("name", "Nombre", { alignment: "center" }),
  createTextColumn<UsersData>("lastname", "Apellido", { alignment: "center" }),
  createTextColumn<UsersData>("email", "Email", { alignment: "center" }),
  createTranslatedColumn<UsersData, UserRole>(
    "role",
    "Rol",
    translateUserRole,
    { alignment: "center" }
  ),
  createTextColumn<UsersData>("workstation", "Puesto", { alignment: "center" }),
  createTranslatedColumn<UsersData, UserState>(
    "state",
    "Estado",
    translateUserState,
    { alignment: "center" }
  ),
  createDateColumn<UsersData>("created_at", "Creado"),
  createDateColumn<UsersData>("updated_at", "Actualizado"),
  createActionsColumn<UsersData>(UserActions, "user", "Acceso"),
];
