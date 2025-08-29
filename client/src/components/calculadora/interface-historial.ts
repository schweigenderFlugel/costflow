export interface HistorialData {
  period: string;
  labour: Labour;
  monthly_production: MonthlyProduction;
  indirect_costs: IndirectCosts;
  feedstocks: Feedstock[];
  dolar: Dolar;
}

export interface Dolar {
  price: number;
  date: Date;
}

export interface Feedstock {
  name: string;
  currency: Currency;
  measure_unit: string;
  id: string;
  unit_cost: number;
}

export enum Currency {
  Ars = "ARS",
  Usd = "USD",
}

export interface IndirectCosts {
  total: number;
  services: Service[];
}

export interface Service {
  total_usage: number | null;
  amount: number;
  id: string;
  type: string;
}

export interface Labour {
  hours: number;
  id: string;
  salary: number;
}

export interface MonthlyProduction {
  feedstocks_costs: number;
  labour_costs: number;
  indirect_costs: number;
  products: Product[];
}

export interface Product {
  product_name: string;
  feedstocks_costs: number;
  labour_costs: number;
  measure_unit: string;
  indirect_costs: number;
  id: string;
  quantity: number;
}
