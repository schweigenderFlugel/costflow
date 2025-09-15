import { Table } from "@tanstack/react-table";

export type DropdownProps<T> = {
  table: Table<T>;
  columnsTo: "feedstock" | "product" | "users" | "indirect_cost";
};
