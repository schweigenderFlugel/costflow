"use client";

import PageHeaderSection from "@/components/shared/page-header-section";
import StatsChart from "@/components/dashboard/stats-chart";
import DashboardCards from "@/components/home/dashboard-cards";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

type DataItem = {
  month: string;
  labour: number;
  indirect: number;
  feedstocks: number;
};

type ApiResponseItem = {
  period: string;
  labour: {
    salary: number;
  };
  indirect_costs: {
    total: number;
  };
  feedstocks: {
    total: number;
  };
};

export default function PageClient() {
  const [chartData, setChartData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher({ input: "/api/historial" }).then((data: ApiResponseItem[]) => {
      if (!("error" in data)) {
        const nombresMeses = [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ];

        const transformed: DataItem[] = data
          .sort((a, b) => {
            const [mesA, anioA] = a.period.split("-");
            const [mesB, anioB] = b.period.split("-");
            const fechaA = new Date(
              parseInt(anioA, 10),
              parseInt(mesA, 10) - 1
            );
            const fechaB = new Date(
              parseInt(anioB, 10),
              parseInt(mesB, 10) - 1
            );
            return fechaA.getTime() - fechaB.getTime();
          })
          .slice(-6)
          .map((item) => {
            const [mes, anio] = item.period.split("-");
            return {
              month: `${nombresMeses[parseInt(mes, 10) - 1]} ${anio}`,
              labour: item.labour.salary,
              indirect: item.indirect_costs.total,
              feedstocks: item.feedstocks.total,
            };
          });

        setChartData(transformed);
      }
      setLoading(false);
    });
  }, []);

  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Mi gestión"
        description="Gestioná, calculá y presupuestá desde el mismo lugar"
      />

      <section className="w-6xl max-w-[calc(100svw-2rem)] mx-auto">
        <DashboardCards
          data={{
            revenue: { percentage: "12.5%", value: "$300 ARS" },
            production: { percentage: "8.5%", value: "500 unidades" },
            supplies: { percentage: "-4.3%", value: "50 insumos" },
            customers: {
              percentage: "0%",
              value: "12 usuarios",
              href: "/dashboard/usuarios",
            },
          }}
        />
      </section>

      <section className="w-6xl max-w-[calc(100svw-2rem)] mx-auto py-6">
        <StatsChart data={chartData} loading={loading} />
      </section>
    </main>
  );
}
