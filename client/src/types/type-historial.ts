export type Historial = {
  period: string;
  feedstocks?: { name: string }[];
  monthly_production?: { products: { product_name: string }[] };
};
