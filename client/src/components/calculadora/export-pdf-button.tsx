"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { ProductCalculation } from "@/components/calculadora/table-calculation";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { MeasureUnits } from "@/components/calculadora/measure-units";

export function ExportPdfButton({
  products,
}: {
  products: ProductCalculation[];
}) {
  const handleExport = () => {
    // Crear PDF en horizontal
    const doc = new jsPDF({ orientation: "landscape" });

    // Fecha y hora Argentina
    const argentinaTime = new Date().toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
    });

    // Título
    doc.setFont("helvetica", "bold"); // Fuente Helvetica en negrita
    doc.setFontSize(26);
    doc.text("Cotzia", 14, 22);

    // Fecha normal
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Exportado: ${argentinaTime}`, 14, 29);

    // Calcular subtotal, IVA y total
    const subtotal = products.reduce(
      (acc, p) => acc + p.unitValue * p.quantity,
      0
    );
    const ivaRate = 0.21;
    const iva = subtotal * ivaRate;
    const total = subtotal + iva;

    // Datos de la tabla
    const tableColumn = [
      "Artículo",
      "Cantidad",
      "Unidad",
      "Valor por Unidad",
      "Subtotal",
    ];
    const tableRows = products.map((p) => [
      p.name,
      p.quantity,
      MeasureUnits[p.unit as keyof typeof MeasureUnits]?.label ?? p.unit,
      `$${p.unitValue.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      `$${(p.unitValue * p.quantity).toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    ]);

    // Filas de totales
    tableRows.push(
      [
        "Subtotal de productos",
        "",
        "",
        "",
        `$${subtotal.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ],
      [
        `IVA (${(ivaRate * 100).toFixed(0)}%)`,
        "",
        "",
        "",
        `$${iva.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ],
      [
        "Total",
        "",
        "",
        "",
        `$${total.toLocaleString("es-AR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      ]
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 115] },
    });

    doc.save("presupuesto.pdf");
  };

  return (
    <Button
      onClick={handleExport}
      disabled={products.length === 0}
      className={`bg-white text-black border shadow-sm ${
        products.length === 0
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-gray-100"
      }`}
    >
      <ArrowDownIcon className="size-3" />
      <p className="text-sm">Descargar PDF</p>
    </Button>
  );
}
