"use client"
import { ColumnDef } from "@tanstack/react-table"
import {
  createSelectColumn,
  createTextColumn,
  createNumberColumn,
  createDateColumn,
  createActionsColumn
} from "@/components/shared/data-table/column-helpers"
import { IndirectCostObj } from "@/types/items/indirect-cost"
import IndirectCostActions from "@/components/indirect-cost/indirect-cost-actions"

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
  createNumberColumn<IndirectCostObj>("total_usage", "Total de Uso", {
    alignment: "right",
    raw: true
  }),

  createDateColumn<IndirectCostObj>("date", "Fecha", true),

  createActionsColumn<IndirectCostObj>(IndirectCostActions, "indirect_cost"),

]

export default columns
