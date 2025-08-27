
import { ObjFeedstock } from "@/types/items/feedstock";
import { ObjProduct } from "@/types/items/product";

const translationsFeedstockHeaders: Record<keyof ObjFeedstock, string> = {
  // Información general
  id: "ID",
  sku: "SKU",
  is_deleted: "Eliminado",
  // created_at: "Creación",
  date: "Fecha",
  // updated_at: "Actualizado",
  // Información del insumo
  name: "Nombre",
  //
  state: "Estado",
  measure_unit: "Unidad",
  //
  provider: "Proveedor",
  currency: "Moneda",
  unit_cost: "Costo",
};


const translationsProductsHeaders: Record<keyof ObjProduct, string> = {
  // Información general
  id: "ID",
  sku: "SKU",
  is_deleted: "Eliminado",
  // created_at: "Creación",
  date: "Fecha",
  // updated_at: "Actualizado",
  // Información del producto
  name: "Nombre",
  description: "Descripción",
  //
  state: "Material",
  measure_unit: "Unidad",
  quantity: "Cantidad",
  //
  feedstocks: "Materias Primas",
};




export const translateFeedstockHeaders = (header: keyof ObjFeedstock) => translationsFeedstockHeaders[header]
export const translateProductsHeaders = (header: keyof ObjProduct) => translationsProductsHeaders[header]
