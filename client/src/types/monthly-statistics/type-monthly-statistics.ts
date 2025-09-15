type Feedstock = {
  id: string;
  name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
};

type ProductMonthlyStatistics = {
  id: string;
  name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
};

export type ApiResponseItem = {
  period: string;
  feedstocks: Feedstock[];
  monthly_production: {
    products: ProductMonthlyStatistics[];
  };
};
