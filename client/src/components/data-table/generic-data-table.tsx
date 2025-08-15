"use client"

import { useState } from "react"
import OnlyTable from "@/components/data-table/only-table"
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
} from "@tanstack/react-table"
import PaginationTable from "@/components/data-table/pagination-table"
import HeaderTable from "@/components/data-table/header-table"

interface GenericDataTableProps<TData> {
  initialData: TData[]
  columns: ColumnDef<TData>[],
  columnsTo?: "product" | "feedstock"
}

const GenericDataTable = <TData,>({ initialData, columns, columnsTo = "feedstock" }: GenericDataTableProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable<TData>({
    data: initialData,
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
  })

  return (
    <div className="w-full">
      <HeaderTable <TData> columnsTo={columnsTo} table={table} />

      <div className="overflow-hidden rounded-md border">
        <OnlyTable <TData> table={table} colSpan={columns.length} />
      </div>

      <PaginationTable <TData> table={table} />
    </div>
  )
}

export default GenericDataTable
