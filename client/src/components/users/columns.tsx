"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UsersData } from "../../types/items/users";
import { Button } from "../ui/button";
import { createDateColumn } from "@/components/data-table/column-helpers";

export const columns: ColumnDef<UsersData>[] = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "lastname", header: "Apellido" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Rol" },
  { accessorKey: "workstation", header: "Puesto" },
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
      return <span className={color}>{state}</span>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const userId = row.original.id;
      const state = row.original.state;
      if (state !== "PENDING") return null;
      return (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={() => console.log("Accept", userId)}
          >
            Aceptar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => console.log("Reject", userId)}
          >
            Rechazar
          </Button>
        </div>
      );
    },
  },
  createDateColumn<UsersData>("created_at", "Creado"),
  createDateColumn<UsersData>("updated_at", "Actualizado"),
];
