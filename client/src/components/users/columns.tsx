"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UsersData } from "../../types/items/users";
import { Button } from "../ui/button";
import { createActionsColumn, createDateColumn, createTextColumn } from "@/components/data-table/column-helpers";
import { translateUserState } from "@/utils/translate/user";
import { CircleCheck, CircleX } from "lucide-react";

export const columns: ColumnDef<UsersData>[] = [
  createTextColumn<UsersData>("name", "Nombre", { alignment: "center" }),
  createTextColumn<UsersData>("lastname", "Apellido", { alignment: "center" }),
  createTextColumn<UsersData>("email", "Email", { alignment: "center" }),
  createTextColumn<UsersData>("role", "Rol", { alignment: "center" }),
  createTextColumn<UsersData>("workstation", "Puesto", { alignment: "center" }),
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.original.state;
      const color =
        state === "PENDING"
          ? "text-yellow-600"
          : state === "ACCEPTED"
            ? "text-green-600"
            : "text-red-600";
      return <span className={color}>{translateUserState(state)}</span>;
    },
  },
  createDateColumn<UsersData>("created_at", "Creado"),
  createDateColumn<UsersData>("updated_at", "Actualizado"),
  createActionsColumn<UsersData>(({ state: user }: { state: UsersData }) => {

    if (user.state !== "PENDING") return (
      <div className="text-center">
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-yellow-200 text-xs"
          onClick={() => console.log("Change to pending", user.id)}
        >
          Modificar
        </Button>
      </div>);

    return (
      <div className="flex gap-1 justify-center">
        <Button
          size="icon"
          variant="outline-ghost"
          className="text-emerald-800 hover:text-emerald-600"
          onClick={() => console.log("Accept", user.id)}
        >
          <CircleCheck className="size-6" />
        </Button>
        <Button
          size="icon"
          variant="outline-ghost"
          className="text-red-800 hover:text-red-600"
          onClick={() => console.log("Reject", user.id)}
        >
          <CircleX className="size-6" />
        </Button>
      </div>
    );
  }, "state", "Acceso"),
];
