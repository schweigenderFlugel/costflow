"use client"
import FeedstockActions from "@/components/feedstock/feedstock-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Currency, ObjFeedstock } from "@/types/items/feedstock"
import { translateMeasureUnit } from "@/utils/translate/feedstock"
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
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SKU
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("sku")}</div>,
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
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
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
      // const unit_cost = parseFloat(row.getValue("unit_cost"))

      // const formatted = (new Intl.NumberFormat("es-AR", {
      //   style: "currency",
      //   currency: Currency[row.original.currency]
      // }).format(unit_cost)).split(/(\s+)/)

      return (<div title={row.getValue("currency")} className="text-center">
        {/* {formatted[0]} */}
        {row.getValue("currency")}
      </div>)
    },
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
            Monto
            <ArrowUpDown />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const unit_cost = parseFloat(row.getValue("unit_cost"))

      // Format the amount as a dollar amount
      const formatted = (new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: Currency[row.original.currency]
      }).format(unit_cost)).split(/(\s+)/)


      return <div className="font-medium text-right pl-2">
        {/* <span className="block">{formatted[0]}</span> */}
        {formatted[2]}
      </div>
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
    cell: ({ row }) => <div>{row.getValue("provider")}</div>,
  },
  {
    accessorKey: "entry_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          F. de entrada
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{new Date(row.getValue("entry_date")).toLocaleDateString()}</div>,
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
