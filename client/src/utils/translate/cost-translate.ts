import { IndirectCostInput } from "@/types/items/indirect-cost";



const translationIndirectCost: Record<keyof IndirectCostInput, string> = {
  type: "Tipo",
  amount: "Monto",
  date: "Fecha",
  total_usage: "Uso"
};




export const translateIndirectCostHeaders = (header: keyof IndirectCostInput) => translationIndirectCost[header]
