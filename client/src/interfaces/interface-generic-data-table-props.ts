import { ColumnDef } from "@tanstack/react-table";

export interface GenericDataTableProps<TData> {
  initialData: TData[];
  columns: ColumnDef<TData>[];
  columnsTo?: "product" | "feedstock" | "users" | "indirect_cost";
}
