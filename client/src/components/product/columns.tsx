"use client"
import ProductActions from "@/components/product/product-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ObjProduct } from "@/types/items/product"
import { translateMeasureUnit } from "@/utils/translate/feedstock"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

const columns: ColumnDef<ObjProduct>[] = [
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "product_feedstock",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID Feedstock
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("product_feedstock")}</div>,
  },
  {
    accessorKey: "measure_unit",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Unidad
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{translateMeasureUnit(row.getValue("measure_unit"))}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cantidad
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "subtotal",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subtotal
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const subtotal = parseFloat(row.getValue("subtotal"))
      return <div className="font-medium">{subtotal.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "indirect_cost",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Costo Indirecto
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue("indirect_cost"))
      return <div>{cost.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "resale_percentage",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % Reventa
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const perc = parseFloat(row.getValue("resale_percentage"))
      return <div>{perc}%</div>
    },
  },
  {
    accessorKey: "public_percentage",
    header: ({ column }) => (
      <div>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % Público
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const perc = parseFloat(row.getValue("public_percentage"))
      return <div>{perc}%</div>
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Descripción
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ProductActions product={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
]

export default columns
