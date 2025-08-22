import { ObjProduct } from "@/types/items/product";
import { MeasureUnit, StateMatter } from "@/types/measure/measure-unit";


export const dtoProduct = (prod: ObjProduct) => {
  // Validación para evitar el error de map
  if (!prod || !prod.feedstocks || !Array.isArray(prod.feedstocks)) {
    const result = {
      name: prod?.name || "",
      sku: prod?.sku || "",
      state: prod?.state as StateMatter,
      measure_unit: prod?.measure_unit as MeasureUnit,
      quantity: prod?.quantity || 0,
      description: prod?.description || "",
      feedstocks: []
    };
    return result;
  }

  const result = {
    name: prod.name,
    sku: prod.sku,
    state: prod.state as StateMatter,  // Usar directamente el valor sin transformar
    measure_unit: prod.measure_unit as MeasureUnit,  // Usar directamente el valor sin transformar
    quantity: prod.quantity,
    description: prod.description || "",
    feedstocks: prod.feedstocks.map(fs => {
      return {
        name: fs.name,
        measure_unit: fs.measure_unit,
        feedstock_id: fs.feedstock || fs.id,
        quantity_required: fs.quantity_required
      };
    })
  };
  return result;
}
