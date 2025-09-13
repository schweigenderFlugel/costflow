"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsChartProps } from "@/interfaces/interface-stats-chart-props";
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

export default function StatsChart({ data, loading }: StatsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-700 p-2 rounded">
            <ChartPie />
          </div>
          <div>
            Productos e insumos
            <p className="text-sm text-muted-foreground">Últimos meses</p>
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
                    value: "Cantidad",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                    dx: -40,
                  }}
                />
                <Tooltip />
                <Legend
                  content={({ payload }) => (
                    <div className="flex gap-20 mt-2 items-center justify-center w-full ps-10">
                      {payload
                        ?.slice()
                        .sort((a, b) => {
                          if (a.value === "Productos") return -1;
                          if (b.value === "Productos") return 1;
                          return 0;
                        })
                        .map((entry, index) => (
                          <div
                            key={`item-${index}`}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-4 h-4 "
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="font-semibold text-sm">
                              {entry.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                />
                <Bar dataKey="productos" name="Productos" fill="#060428" />
                <Bar dataKey="insumos" name="Insumos" fill="#B6CEE5" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
