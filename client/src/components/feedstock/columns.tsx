"use client"
import FeedstockActions from "@/components/feedstock/feedstock-actions"
import { ObjFeedstock } from "@/types/items/feedstock"
import { MeasureUnit, StateMatter } from "@/types/measure/measure-unit"
import { translateMeasureUnit, translateStateMatter } from "@/utils/translate/shared-translate"
import { ColumnDef } from "@tanstack/react-table"
import {
  createSelectColumn,
  createTextColumn,
  createTranslatedColumn,
  createNumberColumn,
  createCurrencyColumn,
  createDateColumn,
  createActionsColumn
} from "@/components/data-table/column-helpers"

const columns: ColumnDef<ObjFeedstock>[] = [
  createSelectColumn<ObjFeedstock>(),

  createTextColumn<ObjFeedstock>("sku", "SKU", {
    uppercase: true,
    fontWeight: "medium"
  }),

  createTextColumn<ObjFeedstock>("name", "Nombre", {
    fontWeight: "medium"
  }),

  createTranslatedColumn<ObjFeedstock, StateMatter>("state", "Estado", translateStateMatter, {
    capitalize: true
  }),

  createTranslatedColumn<ObjFeedstock, MeasureUnit>("measure_unit", "Unidad", translateMeasureUnit),

  createNumberColumn<ObjFeedstock>("unit_cost", "Costo Unitario", {
    alignment: "right",
    fontWeight: "medium",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }),

  createCurrencyColumn<ObjFeedstock>(),

  createTextColumn<ObjFeedstock>("provider", "Proveedor", {
    tooltip: true
  }),

  createDateColumn<ObjFeedstock>("created_at", "Creación"),

  createDateColumn<ObjFeedstock>("updated_at", "Actualizado"),

  createActionsColumn<ObjFeedstock>(FeedstockActions, "feedstock"),
]


export default columns
