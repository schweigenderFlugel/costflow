"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    title: "Plan Emprendedor",
    price: "15 USD",
    description: "por mes",
    features: [
      "1 usuario",
      "Hasta 50 productos/insumos",
      "Presupuestos ilimitados en PDF",
      "Dashboard básico de ventas y producción",
      "Almacenamiento en la nube limitado",
      "Soporte por email",
    ],
    isRecommended: false,
  },
  {
    title: "Plan Pymes",
    price: "79 USD",
    description: "por mes",
    features: [
      "Hasta 10 usuarios",
      "Productos/insumos ilimitados",
      "Presupuestos ilimitados con diseño avanzado y exportación a Excel",
      "Dashboard premium con comparativos y proyecciones",
      "Almacenamiento en la nube ilimitado",
      "Control de permisos por usuario",
      "Integración con API",
      "Soporte prioritario 24/7",
    ],
    isRecommended: true,
  },
  {
    title: "Plan Negocio",
    price: "39 USD",
    description: "por mes",
    features: [
      "Hasta 3 usuarios",
      "Hasta 500 productos/insumos",
      "Presupuestos ilimitados con logo personalizado",
      "Dashboard avanzado con métricas de ganancias, producción y ventas",
      "Almacenamiento en la nube intermedio",
      "Notificaciones de stock bajo",
      "Soporte por email y chat",
    ],
    isRecommended: false,
  },
];

export function Pricing() {
  return (
    <section className="w-full py-20 lg:py-28 bg-[#0B1120]" id="precios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Precios pensados para vos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.title}
              className={`flex flex-col h-full bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl transition-transform transform-gpu
                ${plan.isRecommended ? "scale-105" : "scale-100"}`}
            >
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold text-slate-900 mx-auto">
                  {plan.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-500 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col items-stretch p-6 bg-slate-50/50 rounded-b-2xl mt-auto">
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-slate-900">{plan.price}</p>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>
                <Button
                  onClick={() => alert(`Seleccionaste el ${plan.title}`)}
                  className={`w-full text-base font-semibold py-4
                    ${plan.isRecommended
                      ? "bg-slate-900 hover:bg-slate-800 text-white"
                      : "bg-indigo-800 hover:bg-indigo-700 text-white"
                    }`}
                >
                  Comprar plan
                </Button>
                <Button
                  onClick={() => alert(`Solicitaste info del ${plan.title}`)}
                  variant="outline"
                  className="w-full mt-2 text-slate-700 bg-transparent border-black"
                >
                  Quiero recibir más información
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
