"use client";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import BudgetPDF from "@/components/calculadora/budget-pdf";
import { ProductCalculation } from "@/components/calculadora/table-calculation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";

export default function BudgetPDFButton({
  products,
}: {
  products: ProductCalculation[];
}) {
  const hasProducts = products.length > 0;
  const pdfDocument = React.useMemo(() => {
    return <BudgetPDF products={products} ivaRate={0.21} />;
  }, [products]);

  if (!hasProducts) {
    return (
      <Button
        disabled
        className="bg-gray-200 text-gray-500 border shadow-sm cursor-not-allowed"
      >
        <ArrowDownIcon className="size-3" />
        <p className="text-sm">Descargar pdf</p>
      </Button>
    );
  }

  return (
    <PDFDownloadLink document={pdfDocument} fileName="Presupuesto.pdf">
      {({ loading }) => (
        <Button className="bg-white hover:bg-gray-100 text-black border shadow-sm">
          <ArrowDownIcon className="size-3" />
          <p className="text-sm">
            {loading ? "Generando..." : "Descargar pdf"}
          </p>
        </Button>
      )}
    </PDFDownloadLink>
  );
}
