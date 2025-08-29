export type FeedstockCalculation = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitValue: number; // ya convertido a ARS si es USD
};
