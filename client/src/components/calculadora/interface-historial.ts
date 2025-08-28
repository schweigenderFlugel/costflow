export interface HistorialData {
  period: string;
  labour: Labour;
  monthly_production: MonthlyProduction;
  indirect_costs: IndirectCosts;
  feedstocks: Feedstock[];
}

export interface Feedstock {
  name: string;
  currency: Currency;
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
  products?: MonthlyProduction[];
  product_name?: string;
}
