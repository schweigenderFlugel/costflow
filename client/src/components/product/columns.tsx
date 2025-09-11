"use client";
import ProductActions from "@/components/product/product-actions";
import { MeasureUnit, StateMatter } from "@/types/measure/measure-unit";
import {
  translateMeasureUnit,
  translateStateMatter,
} from "@/utils/translate/shared-translate";
import { ColumnDef } from "@tanstack/react-table";
import {
  createSelectColumn,
  createTextColumn,
  createTranslatedColumn,
  createNumberColumn,
  createDateColumn,
  createActionsColumn,
} from "@/components/shared/data-table/column-helpers";
import { ObjProduct } from "@/interfaces/interface-product";

const columns: ColumnDef<ObjProduct>[] = [
  createSelectColumn<ObjProduct>(),

  createTextColumn<ObjProduct>("sku", "SKU", {
    uppercase: true,
    fontWeight: "medium",
  }),

  createTextColumn<ObjProduct>("name", "Nombre", {
    fontWeight: "medium",
  }),

  createTranslatedColumn<ObjProduct, StateMatter>(
    "state",
    "Material",
    translateStateMatter,
    {
      capitalize: true,
      alignment: "left",
    }
  ),

  createNumberColumn<ObjProduct>("quantity", "Cantidad", {
    alignment: "right",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }),

  createTranslatedColumn<ObjProduct, MeasureUnit>(
    "measure_unit",
    "Unidad",
    translateMeasureUnit
  ),

  createTextColumn<ObjProduct>("description", "Descripción", {
    tooltip: true,
  }),

  // createDateColumn<ObjProduct>("created_at", "Creación"),
  createDateColumn<ObjProduct>("date", "Fecha"),
  // createDateColumn<ObjProduct>("updated_at", "Actualizado"),

  createActionsColumn<ObjProduct>(ProductActions, "product"),
];

export default columns;
