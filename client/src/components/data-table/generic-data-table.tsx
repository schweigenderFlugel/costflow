"use client";

import { useState } from "react";
import OnlyTable from "@/components/data-table/only-table";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import PaginationTable from "@/components/data-table/pagination-table";
import HeaderTable from "@/components/data-table/header-table";
import useFetch from "@/hooks/use-fetch";

interface GenericDataTableProps<TData> {
  initialData: TData[]
  columns: ColumnDef<TData>[]
  columnsTo?: "product" | "feedstock" | "users" | "indirect_cost"
}

const GenericDataTable = <TData,>({ columns, columnsTo = "feedstock", initialData }: GenericDataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    // Ocultar las columnas de fecha por defecto
    created_at: false,
    updated_at: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  const {
    data,
    error,
    isPending
  } = useFetch<TData[]>(columnsTo, initialData)

  const table = useReactTable<TData>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (error)
    return (
      <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );

  return (
    <div className="w-full">
      <HeaderTable<TData> columnsTo={columnsTo} table={table} />

      <div className="overflow-x-auto overflow-hidden">
        <OnlyTable<TData>
          table={table}
          colSpan={columns.length}
          isLoading={isPending}
        />
      </div>

      <PaginationTable<TData> table={table} />
    </div>
  );
};

export default GenericDataTable;
