"use client"

import { FC, useState } from "react"
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
import { ObjFeedstock } from "@/types/items/feedstock"
import PaginationTable from "@/components/data-table/pagination-table"
import HeaderTable from "@/components/data-table/header-table"

interface DataTableProps {
  initialData: ObjFeedstock[],
  columns: ColumnDef<ObjFeedstock>[],
}

const DataTable: FC<DataTableProps> = ({ initialData, columns }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})


  const table = useReactTable<ObjFeedstock>({
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

      <HeaderTable table={table} />

      <div className="overflow-hidden rounded-md border">
        <OnlyTable table={table} colSpan={columns.length} />
      </div>


      <PaginationTable table={table} />
    </div>
  )
}


export default DataTable;
