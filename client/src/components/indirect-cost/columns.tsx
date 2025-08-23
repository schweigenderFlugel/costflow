"use client"
import { ColumnDef } from "@tanstack/react-table"
import {
  createSelectColumn,
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createActionsColumn
} from "@/components/data-table/column-helpers"
import { IndirectCostObj } from "@/types/items/indirect-cost"

const columns: ColumnDef<IndirectCostObj>[] = [
  createSelectColumn<IndirectCostObj>(),

  createTextColumn<IndirectCostObj>("type", "Tipo", {
    fontWeight: "medium"
  }),

  createNumberColumn<IndirectCostObj>("amount", "Costo", {
    alignment: "right",
    fontWeight: "medium",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }),

  createDateColumn<IndirectCostObj>("date", "Fecha"),
  // createActionsColumn<IndirectCostObj>(({ indirect_cost }) => {
  //   return (
  //     <div>
  //       {indirect_cost}
  //     </div>
  //   )
  // }, "indirect_cost"),
]


export default columns
