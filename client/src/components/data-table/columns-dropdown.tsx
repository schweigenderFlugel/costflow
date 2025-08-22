import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Table } from "@tanstack/react-table"
import { ObjFeedstock } from "@/types/items/feedstock"
import { translateFeedstockHeaders, translateProductsHeaders } from "@/utils/translate/items-translate"
import { ObjProduct } from "@/types/items/product"

type DropdownProps<T> = {
  table: Table<T>,
  columnsTo: "feedstock" | "product"
}

const ColumnsDropdown = <TData,>({ table, columnsTo }: DropdownProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Columns <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(!!value)
                }
              >
                {
                  columnsTo == "feedstock"
                    ? translateFeedstockHeaders(column.id as keyof ObjFeedstock)
                    : translateProductsHeaders(column.id as keyof ObjProduct)
                }
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ColumnsDropdown
