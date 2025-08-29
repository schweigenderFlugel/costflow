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
  currency: string;
  id: string;
  unit_cost: number;
  measure_unit: string;
}

export interface IndirectCosts {
  total: number;
  services: Service[];
}

export interface Service {
  type: string;
  amount: number;
  total_usage: number | null;
  id: string;
}

export interface Labour {
  salary: number;
  id: string;
  hours: number;
}

export interface MonthlyProduction {
  feedstocks_costs: number;
  labour_costs: number;
  indirect_costs: number;
  products?: MonthlyProduction[];
  product_name?: string;
}
