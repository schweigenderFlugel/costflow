export interface InfoCardProps {
  type: "dollar" | "product" | "feedstock";
  value: string | number;
  secondValue?: string | number;
  description: string;
  percentage?: string;
}
