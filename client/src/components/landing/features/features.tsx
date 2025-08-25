import { Check } from "lucide-react";
import { FeatureTables } from "./features-tables";

export function Features() {
  const features = [
    "Gestión de stock de insumos rápido y fácil",
    "Estadísticas claras de ventas y producción",
    "Sistema automatizado de costos y presupuestos",
    "Presupuestos profesionales para enviar",
    "Versión mobile para usar en todo momento",
  ];

  return (
    <section className="w-full py-20 lg:py-28 bg-stone-100 text-[#0A0559]">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Columna Derecha */}
        <div className="flex flex-col justify-center text-center md:text-left px-4">

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
            Todo en un solo lugar
          </h2>

          <div className="mt-8 mx-6 flex flex-col gap-y-5">
            {features.map((text, index) => (
              <div key={index} className="flex items-center text-left gap-3 text-black">
                <div className="flex-shrink-0 rounded-full p-1.5 border border-[#0A0559]">
                  <Check className="h-5 w-5" />
                </div>
                <span className="text-base">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Izquierda */}
        <FeatureTables />
      </div>
    </section>
  );
}
