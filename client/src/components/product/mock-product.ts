import { ObjProduct } from "@/types/items/product";
import { MeasureUnit, StateMatter } from "@/types/measure/measure-unit";
import { Currency } from "@/types/measure/currency";
import { randomUUID, UUID } from "crypto";

// UUIDs fijos para materias primas (para referencias consistentes)
const FEEDSTOCK_IDS = {
  HARINA: "550e8400-e29b-41d4-a716-446655440001" as UUID,
  AZUCAR: "550e8400-e29b-41d4-a716-446655440002" as UUID,
  ACEITE: "550e8400-e29b-41d4-a716-446655440003" as UUID,
  LECHE: "550e8400-e29b-41d4-a716-446655440004" as UUID,
  CACAO: "550e8400-e29b-41d4-a716-446655440005" as UUID,
  SAL: "550e8400-e29b-41d4-a716-446655440006" as UUID,
  VAINILLA: "550e8400-e29b-41d4-a716-446655440007" as UUID,
  HUEVOS: "550e8400-e29b-41d4-a716-446655440008" as UUID,
  MANTECA: "550e8400-e29b-41d4-a716-446655440009" as UUID,
  LEVADURA: "550e8400-e29b-41d4-a716-446655440010" as UUID,
  CHOCOLATE: "550e8400-e29b-41d4-a716-446655440011" as UUID,
  MERMELADA: "550e8400-e29b-41d4-a716-446655440012" as UUID,
  NUECES: "550e8400-e29b-41d4-a716-446655440013" as UUID,
  CREMA: "550e8400-e29b-41d4-a716-446655440014" as UUID,
  QUESO: "550e8400-e29b-41d4-a716-446655440015" as UUID,
  TOMATE: "550e8400-e29b-41d4-a716-446655440016" as UUID,
  JAMON: "550e8400-e29b-41d4-a716-446655440017" as UUID
};

export const mockProducts: ObjProduct[] = [
  {
    id: randomUUID(),
    name: "Pan Francés",
    description: "Pan clásico de harina y levadura",
    sku: "PROD-0001",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 50,
    labour_time: 45, // 45 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 1.2
      },
      {
        id: "9c6349f7-59ee-4c6b-81e6-9ecbb23361d0",
        usage: 0.8
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HARINA,
        product: randomUUID(),
        quantity_required: 500,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Harina de trigo 000",
        unit_cost: 1200,
        sku: "HAR-0001",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.LEVADURA,
        product: randomUUID(),
        quantity_required: 10,
        currency: Currency.USD,
        measure_unit: MeasureUnit.GRAMS,
        name: "Levadura seca",
        unit_cost: 0.5,
        sku: "LEV-0010",
      },
    ],
    date: new Date("2025-07-01"),
    is_deleted: false,
  },
  {
    id: randomUUID(),
    name: "Bizcochuelo Vainilla",
    description: "Bizcochuelo esponjoso sabor vainilla",
    sku: "PROD-0002",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 20,
    labour_time: 60, // 60 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 1.5
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HARINA,
        product: randomUUID(),
        quantity_required: 300,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Harina de trigo 000",
        unit_cost: 1200,
        sku: "HAR-0001",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.AZUCAR,
        product: randomUUID(),
        quantity_required: 200,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Azúcar refinada",
        unit_cost: 950,
        sku: "AZU-0002",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HUEVOS,
        product: randomUUID(),
        quantity_required: 3,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.UNITS,
        name: "Huevos",
        unit_cost: 120,
        sku: "HUE-0008",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.VAINILLA,
        product: randomUUID(),
        quantity_required: 5,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.MILLILITERS,
        name: "Esencia de vainilla",
        unit_cost: 320,
        sku: "ESV-0007",
      },
    ],
    date: new Date("2025-07-02"),
    is_deleted: false,
  },
  {
    id: randomUUID(),
    name: "Tarta de Manzana",
    description: "Tarta dulce con relleno de manzana",
    sku: "PROD-0003",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 15,
    labour_time: 90, // 90 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 2.0
      },
      {
        id: "9c6349f7-59ee-4c6b-81e6-9ecbb23361d0",
        usage: 1.0
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HARINA,
        product: randomUUID(),
        quantity_required: 250,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Harina de trigo 000",
        unit_cost: 1200,
        sku: "HAR-0001",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.MANTECA,
        product: randomUUID(),
        quantity_required: 100,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Manteca",
        unit_cost: 2700,
        sku: "MAN-0009",
      },
    ],
    date: new Date("2025-07-03"),
    is_deleted: false,
  },
  {
    id: randomUUID(),
    name: "Galletas de Chocolate",
    description: "Galletas dulces con chips de chocolate",
    sku: "PROD-0004",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 100,
    labour_time: 30, // 30 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 0.8
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HARINA,
        product: randomUUID(),
        quantity_required: 200,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Harina de trigo 000",
        unit_cost: 1200,
        sku: "HAR-0001",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.CHOCOLATE,
        product: randomUUID(),
        quantity_required: 150,
        currency: Currency.USD,
        measure_unit: MeasureUnit.GRAMS,
        name: "Chocolate cobertura",
        unit_cost: 14.8,
        sku: "CHO-0011",
      },
    ],
    date: new Date("2025-07-04"),
    is_deleted: false,
  },
  {
    id: randomUUID(),
    name: "Pizza Margarita",
    description: "Pizza clásica con tomate, mozzarella y albahaca",
    sku: "PROD-0008",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 12,
    labour_time: 25, // 25 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 1.8
      },
      {
        id: "9c6349f7-59ee-4c6b-81e6-9ecbb23361d0",
        usage: 1.2
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HARINA,
        product: randomUUID(),
        quantity_required: 200,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Harina de trigo 000",
        unit_cost: 1200,
        sku: "HAR-0001",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.QUESO,
        product: randomUUID(),
        quantity_required: 150,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Queso mozzarella",
        unit_cost: 3500,
        sku: "QUE-0016",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.TOMATE,
        product: randomUUID(),
        quantity_required: 100,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.MILLILITERS,
        name: "Tomate triturado",
        unit_cost: 1200,
        sku: "TOM-0017",
      },
    ],
    date: new Date("2025-07-08"),
    is_deleted: false,
  },
  {
    id: randomUUID(),
    name: "Torta de Chocolate",
    description: "Torta húmeda con ganache",
    sku: "PROD-0011",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 10,
    labour_time: 120, // 120 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 2.5
      },
      {
        id: "9c6349f7-59ee-4c6b-81e6-9ecbb23361d0",
        usage: 1.8
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.HARINA,
        product: randomUUID(),
        quantity_required: 400,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.GRAMS,
        name: "Harina de trigo 000",
        unit_cost: 1200,
        sku: "HAR-0001",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.CHOCOLATE,
        product: randomUUID(),
        quantity_required: 300,
        currency: Currency.USD,
        measure_unit: MeasureUnit.GRAMS,
        name: "Chocolate cobertura",
        unit_cost: 14.8,
        sku: "CHO-0011",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.CREMA,
        product: randomUUID(),
        quantity_required: 200,
        currency: Currency.ARS,
        measure_unit: MeasureUnit.MILLILITERS,
        name: "Crema de leche",
        unit_cost: 2500,
        sku: "CRE-0014",
      },
    ],
    date: new Date("2025-07-11"),
    is_deleted: false,
  },
  {
    id: randomUUID(),
    name: "Brownie",
    description: "Brownie húmedo con nueces",
    sku: "PROD-0014",
    state: StateMatter.SOLID,
    measure_unit: MeasureUnit.UNITS,
    quantity: 20,
    labour_time: 50, // 50 minutos
    indirect_costs: [
      {
        id: "9864fdee-1dc8-4c03-a95a-7d7ff854f425",
        usage: 1.5
      }
    ],
    feedstocks: [
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.CHOCOLATE,
        product: randomUUID(),
        quantity_required: 200,
        currency: Currency.USD,
        measure_unit: MeasureUnit.GRAMS,
        name: "Chocolate cobertura",
        unit_cost: 14.8,
        sku: "CHO-0011",
      },
      {
        id: randomUUID(),
        feedstock: FEEDSTOCK_IDS.NUECES,
        product: randomUUID(),
        quantity_required: 100,
        currency: Currency.USD,
        measure_unit: MeasureUnit.GRAMS,
        name: "Nueces peladas",
        unit_cost: 9.4,
        sku: "NUE-0013",
      },
    ],
    date: new Date("2025-07-14"),
    is_deleted: false,
  },
];
