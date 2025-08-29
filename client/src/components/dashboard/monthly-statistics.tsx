"use client";
import StatsChart from "@/components/dashboard/stats-chart";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";

type DataItem = {
  month: string;
  insumos: number;
  productos: number;
};

type Feedstock = {
  id: string;
  name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
};

type Product = {
  id: string;
  name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
};

type ApiResponseItem = {
  period: string;
  feedstocks: Feedstock[];
  monthly_production: {
    products: Product[];
  };
};

const MonthlyStatistics = () => {
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
              insumos: item.feedstocks?.length ?? 0,
              productos: item.monthly_production?.products?.length ?? 0,
            };
          });

        setChartData(transformed);
      }
      setLoading(false);
    });
  }, []);

  return <StatsChart data={chartData} loading={loading} />;
};

export default MonthlyStatistics;
