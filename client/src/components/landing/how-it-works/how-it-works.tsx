import { Package, DatabaseZap, FileText, Download } from "lucide-react";
import { HowTables } from "@/components/landing/how-it-works/how-tables";

// Datos con la información de cada paso
const stepsData = [
  {
    icon: <Package className="size-7 text-purple-600" />,
    bgColor: "bg-purple-100",
    text: "Cargá tus productos e insumos con precios y stock",
  },
  {
    icon: <DatabaseZap className="size-7 text-blue-600" />,
    bgColor: "bg-blue-100",
    text: "Configurá tus costos indirectos",
  },
  {
    icon: <FileText className="size-7 text-green-600" />,
    bgColor: "bg-green-100",
    text: "Creá tu presupuesto seleccionando ítems y cantidades",
  },
  {
    icon: <Download className="size-7 text-orange-600" />,
    bgColor: "bg-orange-100",
    text: "Descargá el PDF en segundos y compartilo con tu cliente",
  },
];

export function HowItWorks() {
  return (
    <section className="w-full py-20 lg:py-28 bg-slate-100">
      <div className="container mx-auto px-4 grid gap-16 md:grid-cols-2 items-center">

        {/* Columna Izquierda */}
        <div className="flex flex-col gap-8 max-w-xl mx-auto md:mx-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A0559] text-center md:text-left">
            ¿Cómo funciona?
          </h2>

          <div className="flex flex-col gap-4">
            {stepsData.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 w-full max-w-md mx-auto md:mx-0"
              >
                <div className={`max-w-12 max-h-12 p-3 rounded-xl flex items-center justify-center ${step.bgColor}`}>
                  {step.icon}
                </div>
                <p className="text-lg font-semibold text-slate-700">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="mx-auto md:mx-0 max-w-full">
          <HowTables />
        </div>

      </div>
    </section>
  );
}
