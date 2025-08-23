import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// Helper para crear columna de selección
export const createSelectColumn = <T,>(): ColumnDef<T> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="mx-0.5"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="mx-0.5"
    />
  ),
  enableSorting: false,
  enableHiding: false,
})

// Helper para crear columna de texto básica
export const createTextColumn = <T,>(
  accessorKey: string,
  header: string,
  options?: {
    uppercase?: boolean
    fontWeight?: "normal" | "medium"
    alignment?: "left" | "center" | "right"
    tooltip?: boolean
  }
): ColumnDef<T> => ({
  accessorKey,
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={`w-full h-full hover:bg-transparent hover:text-inherit ${options?.alignment === "center" ? "justify-center" :
        options?.alignment === "right" ? "justify-end" : "justify-start"
        }`}
    >
      {header}
      <ArrowUpDown />
    </Button>
  ),
  cell: ({ row }) => {
    const value = row.getValue(accessorKey) as string
    const classes = [
      "pr-3 truncate",
      options?.fontWeight === "medium" ? "font-medium" : "",
      options?.uppercase ? "uppercase" : "",
      options?.alignment === "center" ? "text-center" :
        options?.alignment === "right" ? "text-right" : ""
    ].filter(Boolean).join(" ")

    return (
      <div
        className={classes}
        title={options?.tooltip ? value : undefined}
      >
        {value || "-"}
      </div>
    )
  },
})

// Helper para crear columna de fecha
export const createDateColumn = <T,>(
  accessorKey: string,
  header: string
): ColumnDef<T> => ({
  accessorKey,
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="w-full h-full justify-start hover:bg-transparent hover:text-inherit"
    >
      {header}
      <ArrowUpDown />
    </Button>
  ),
  cell: ({ row }) => {
    const date = row.getValue(accessorKey) as Date
    return (
      <div className="pr-3 truncate">
        {new Intl.DateTimeFormat("es-AR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(date))}
      </div>
    )
  },
  enableHiding: true,
})

// Helper para crear columna de número formateado
export const createNumberColumn = <T,>(
  accessorKey: string,
  header: string,
  options?: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    alignment?: "left" | "center" | "right"
    fontWeight?: "normal" | "medium"
  }
): ColumnDef<T> => ({
  accessorKey,
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className={`w-full h-full hover:bg-transparent hover:text-inherit ${options?.alignment === "center" ? "justify-center" :
        options?.alignment === "right" ? "justify-end" : "justify-start"
        }`}
    >
      {header}
      <ArrowUpDown />
    </Button>
  ),
  cell: ({ row }) => {
    const value = parseFloat(row.getValue(accessorKey))
    const formatted = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: options?.minimumFractionDigits ?? 2,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    }).format(value)

    const classes = [
      "pr-3 truncate",
      options?.fontWeight === "medium" ? "font-medium" : "",
      options?.alignment === "center" ? "text-center" :
        options?.alignment === "right" ? "text-right" : ""
    ].filter(Boolean).join(" ")

    return <div className={classes}>{formatted}</div>
  },
})

// Helper para crear columna de moneda con badge
export const createCurrencyColumn = <T,>(
  accessorKey: string = "currency",
  header: string = "Moneda"
): ColumnDef<T> => ({
  accessorKey,
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="w-full h-full justify-center hover:bg-transparent hover:text-inherit"
    >
      {header}
      <ArrowUpDown />
    </Button>
  ),
  cell: ({ row }) => {
    const currency = row.getValue(accessorKey) as string
    return (
      <div className="text-center font-medium px-3" title={`Moneda: ${currency}`}>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${currency === 'USD'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
          {currency}
        </span>
      </div>
    )
  },
})

// Helper para crear columna traducida (state, measure_unit, etc.)
export const createTranslatedColumn = <T, V = unknown>(
  accessorKey: string,
  header: string,
  translateFunction: (value: V) => string,
  options?: {
    capitalize?: boolean
  }
): ColumnDef<T> => ({
  accessorKey,
  header: ({ column }) => (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="w-full h-full justify-start hover:bg-transparent hover:text-inherit"
    >
      {header}
      <ArrowUpDown />
    </Button>
  ),
  cell: ({ row }) => (
    <div className={`pr-3 truncate ${options?.capitalize ? "capitalize" : ""}`}>
      {translateFunction(row.getValue(accessorKey) as V)}
    </div>
  ),
})

// Helper para crear columna de acciones
export const createActionsColumn = <T,>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ActionsComponent: React.ComponentType<any>,
  propName: string = "item",
  header: string = ""
): ColumnDef<T> => ({
  accessorKey: "actions",
  header,
  cell: ({ row }) => {
    const props = { [propName]: row.original }
    return <ActionsComponent {...props} />
  },
  enableSorting: false,
  enableHiding: false,
  meta: {
    isFixed: true,
  },
})
