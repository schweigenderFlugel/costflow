import { IndirectCostInput } from "@/interfaces/interface-indirect-costs";

const translationIndirectCost: Record<keyof IndirectCostInput, string> = {
  type: "Tipo",
  amount: "Monto",
  date: "Fecha",
  total_usage: "Uso",
};

export const translateIndirectCostHeaders = (header: keyof IndirectCostInput) =>
  translationIndirectCost[header];
