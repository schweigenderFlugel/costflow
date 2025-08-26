"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPie } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DataItem = {
  month: string;
  labour: number;
  indirect: number;
  feedstocks: number;
};

interface StatsChartProps {
  data: DataItem[];
  loading: boolean;
}

export default function StatsChart({ data, loading }: StatsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-700 p-2 rounded">
            <ChartPie />
          </div>
          <div>
            Costos y gastos
            <p className="text-sm text-muted-foreground">
              Últimos meses de gestión
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] flex items-center justify-center">
          {loading ? (
            <div className="flex items-end justify-center gap-4 h-full w-full p-6">
              <div className="w-10 h-24 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-10 h-32 bg-slate-200 rounded animate-pulse"></div>
              <div className="w-10 h-16 bg-slate-200 rounded animate-pulse"></div>
            </div>
          ) : data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aún no hay información para mostrar aquí
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barSize={30} className="p-4">
                <XAxis dataKey="month" />
                <YAxis
                  label={{
                    value: "Monto",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                    dx: -40,
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="indirect"
                  name="Costos indirectos"
                  fill="#8D99AE"
                />
                <Bar dataKey="feedstocks" name="Insumos" fill="#2B2D42" />
                <Bar dataKey="labour" name="Mano de obra" fill="#D90429" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
