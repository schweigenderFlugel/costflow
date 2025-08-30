"use client";

import AddFeedstockSheet from "@/components/calculadora/add-feedstock";
import AddProductSheet from "@/components/calculadora/add-product";
import BudgetTable from "@/components/calculadora/budget-table";
import { ExportPdfButton } from "@/components/calculadora/export-pdf-button";
import {
  CalculationTable,
  ProductCalculation,
} from "@/components/calculadora/table-calculation";
import PageHeaderSection from "@/components/shared/page-header-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const PageCalculator = () => {
  const [products, setProducts] = React.useState<ProductCalculation[]>([]);

  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Cálculos y presupuestos"
        description="Creá tus presupuestos añadiendo productos, insumos y costos adicionales a la calculadora. Descargá el presupuesto en formato .pdf para enviarle a tus clientes."
      />
      <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5 flex flex-col lg:flex-row gap-4">
        {/* 🧮 Cálculo */}
        <div className="w-full lg:w-7/12 flex flex-col gap-2">
          <Card>
            <CardHeader className="flex items-center gap-3">
              <CalculatorIcon className="size-9 bg-blue-200 rounded-lg text-blue-900 p-1" />
              <div>
                <CardTitle className="text-lg">Nuevo cálculo</CardTitle>
                <CardDescription>
                  Calculadora automática de costos y presupuestos
                </CardDescription>
              </div>
            </CardHeader>
            <CalculationTable
              products={products}
              setProducts={setProducts}
              className="px-4"
            />
          </Card>

          <div className="flex w-full gap-3">
            <AddProductSheet setProducts={setProducts} />
            <AddFeedstockSheet setProducts={setProducts} />
          </div>
        </div>

        {/* 💵 Presupuesto */}
        <div className="w-full lg:w-5/12 ">
          <Card className="mb-8 md:mb-0">
            <CardHeader className="flex items-center gap-3">
              <CurrencyDollarIcon className="size-9 bg-green-200 rounded-lg text-green-900 p-1" />
              <div>
                <CardTitle className="text-lg">Presupuesto</CardTitle>
              </div>
              <div className="flex-1"></div>
              <ExportPdfButton products={products} />
            </CardHeader>
            <CardContent>
              <BudgetTable products={products} ivaRate={0.21} />
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default PageCalculator;
