import getHistorial from "@/components/dashboard/get-historial";
import InfoCard from "@/components/dashboard/info-card";
import MonthlyStatistics from "@/components/dashboard/monthly-statistics";
import CreateFeedstock from "@/components/feedstock/modal/crud/create-feedstock";
import CreateFeedstockTrigger from "@/components/feedstock/modal/trigger/create-feedstock-trigger";
import CreateProduct from "@/components/product/modal/crud/create-product";
import CreateProductTrigger from "@/components/product/modal/trigger/create-product-trigger";
import PageHeaderSection from "@/components/shared/page-header-section";
import PageInfoDialog from "@/components/shared/page-info-dialog";
import { fetcher } from "@/utils/fetcher";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import type { Historial } from "@/types/type-historial";

export const revalidate = 6400;

export const metadata = pageMetadata.dashboard();

const infoList = [
  {
    heading: "Resumen del sistema",
    description:
      "Una vista rápida de los costos, productos e insumos más importantes.",
  },
  {
    heading: "Productos e insumos",
    description: "Acceso directo a lo que ya cargaste.",
  },
  {
    heading: "Notificaciones clave",
    description: "Alertas sobre precios, insumos críticos o novedades.",
  },
  {
    heading: "Atajos rápidos",
    description: "Accesos directos para crear o configurar sin perder tiempo.",
  },
];
const getOfficialDollar = async () => {
  return await fetcher({
    input: "https://dolarapi.com/v1/dolares/oficial",
    cache: "force-cache", // Habilitar cache
    next: {
      tags: ["dollar"],
      revalidate: 300, // Revalidar cada 5 minutos automáticamente
    },
  });
};

function numberFormat(value: number | string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(value));
}

export default async function Page() {
  const dollar = await getOfficialDollar();

  const historial = await getHistorial();

  const historialArray = Array.isArray(historial) ? historial : [];

  const historialOrdenado = historialArray.sort(
    (a: Historial, b: Historial) => {
      const [ma, ya] = a.period.split("-").map(Number);
      const [mb, yb] = b.period.split("-").map(Number);
      return ya - yb || ma - mb;
    }
  );

  const ultimoHistorial = historialOrdenado.at(-1);
  const anteriorHistorial = historialOrdenado.at(-2);

  const insumosCount = ultimoHistorial?.feedstocks?.length ?? 0;
  const productosCount =
    ultimoHistorial?.monthly_production?.products?.length ?? 0;

  const insumosPrev = anteriorHistorial?.feedstocks?.length ?? 0;
  const productosPrev =
    anteriorHistorial?.monthly_production?.products?.length ?? 0;

  function calcPercentage(actual: number, prev: number): string {
    if (!prev && !actual) return "0%";
    if (!prev && actual > 0) return "100%";
    if (prev === 0) return "N/A";
    const diff = ((actual - prev) / prev) * 100;
    return `${diff.toFixed(1)}%`;
  }

  const productosPercentage = calcPercentage(productosCount, productosPrev);
  const insumosPercentage = calcPercentage(insumosCount, insumosPrev);

  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Mi gestión"
        description="Gestioná, calculá y presupuestá desde el mismo lugar"
        triggerInfo
      >
        <div className="flex gap-6 relative ml-auto md:absolute right-0 px-1 sm:px-5 top-1/4">
          <CreateProductTrigger />
          <CreateFeedstockTrigger variant="outline" />
        </div>
      </PageHeaderSection>

      <section className="w-6xl max-w-[calc(100svw-2rem)] px-1 sm:px-5 flex md:flex-row flex-col justify-center md:justify-between gap-6 mx-auto items-center">
        <InfoCard
          type="dollar"
          value={numberFormat(dollar.compra)}
          secondValue={numberFormat(dollar.venta)}
          description={`${new Date(
            dollar.fechaActualizacion
          ).toLocaleDateString("es-ar", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
        />
        <InfoCard
          type="product"
          value={productosCount}
          description="Comparado con el último mes"
          percentage={productosPercentage}
        />
        <InfoCard
          type="feedstock"
          value={insumosCount}
          description="Comparado con el último mes"
          percentage={insumosPercentage}
        />
      </section>

      <section className="w-6xl max-w-[calc(100svw-2rem)] px-1 sm:px-5 flex md:flex-row flex-col justify-center md:justify-between gap-6 mx-auto items-center mb-3">
        <Suspense>
          <MonthlyStatistics />
        </Suspense>
      </section>

      <Suspense>
        <CreateProduct />
        <CreateFeedstock />

        <PageInfoDialog
          heading="¿De qué se trata esta sección?"
          description={
            <>
              Tu panel de control principal, el <strong>dashboard</strong>, es
              la vista general de todo el sistema.
            </>
          }
        >
          <div className="space-y-3">
            <h3 className="font-semibold">
              Acá vas a encontrar un resumen con la información más importante:
            </h3>

            <ul className="list-disc space-y-1 text-sm pl-6 pr-2 text-muted-foreground">
              {infoList.map((item, index) => (
                <li key={index}>
                  <strong>{item.heading}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </div>
        </PageInfoDialog>
      </Suspense>
    </main>
  );
}
