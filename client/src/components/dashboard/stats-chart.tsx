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
  sales: number;
  production: number;
};

interface StatsChartProps {
  data: DataItem[];
}

export default function StatsChart({ data }: StatsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-700 p-2 rounded">
            <ChartPie />
          </div>
          <div>
            Estadísticas de ventas y producción
            <p className="text-sm text-muted-foreground">
              Últimos 12 meses de performance
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] flex items-center justify-center">
          {data.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Aún no hay información para mostrar aquí
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barSize={30} className="p-4">
                <XAxis dataKey="month" />
                <YAxis
                  label={{
                    value: "Ingresos por ventas",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                    dx: -40,
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" name="Ventas" fill="#0f172a" />
                <Bar dataKey="production" name="Producción" fill="#cbd5e1" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
