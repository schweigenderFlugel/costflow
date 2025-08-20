"use client"
import FeedstockActions from "@/components/feedstock/feedstock-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ObjFeedstock } from "@/types/items/feedstock"
import { translateMeasureUnit, translateStateMatter } from "@/utils/translate/shared-translate"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

const columns: ColumnDef<ObjFeedstock>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {translateStateMatter(row.getValue("state"))}
      </div>
    ),
  },
  {
    accessorKey: "measure_unit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unidad
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{translateMeasureUnit(row.getValue("measure_unit"))}</div>,
  },
  {
    accessorKey: "unit_cost",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Costo Unitario
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const unit_cost = parseFloat(row.getValue("unit_cost"))

      // Format the amount as a number without currency symbol
      const formatted = new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(unit_cost)

      return <div className="font-medium text-right pl-2">
        {formatted}
      </div>
    },
  },
  {
    accessorKey: "currency",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Moneda
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const currency = row.getValue("currency") as string
      return (
        <div className="text-center font-medium" title={`Moneda: ${currency}`}>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${currency === 'USD'
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
            {currency}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Proveedor
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate" title={row.getValue("provider")}>
        {row.getValue("provider") || "-"}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <FeedstockActions feedstock={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },

]


export default columns
