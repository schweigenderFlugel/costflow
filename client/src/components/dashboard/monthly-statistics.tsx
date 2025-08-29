"use client";
import StatsChart from "@/components/dashboard/stats-chart";
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
    <StatsChart data={chartData} loading={loading} />
  );
}

export default MonthlyStatistics;
