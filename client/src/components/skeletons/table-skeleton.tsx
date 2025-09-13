"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TableSkeletonProps } from "@/interfaces/interface-table-skeleton-props";

const TableSkeleton = ({
  type = "feedstock",
  rows = 8,
}: TableSkeletonProps) => {
  const feedstockColumns = [
    { width: "w-16" }, // SKU
    { width: "w-40" }, // Nombre
    { width: "w-20" }, // Estado
    { width: "w-24" }, // Unidad
    { width: "w-28" }, // Costo Unitario
    { width: "w-20" }, // Moneda
    { width: "w-32" }, // Proveedor
    { width: "w-20" }, // Acciones
  ];

  const productColumns = [
    { width: "w-40" }, // Nombre
    { width: "w-24" }, // SKU
    { width: "w-24" }, // Material
    { width: "w-20" }, // Cantidad
    { width: "w-20" }, // Unidad
    { width: "w-48" }, // Descripción
    { width: "w-20" }, // Acciones
  ];

  const columns = type === "product" ? productColumns : feedstockColumns;

  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-64" /> {/* Search input */}
              <Skeleton className="h-10 w-32" /> {/* Filter button */}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24" /> {/* View toggle */}
              <Skeleton className="h-10 w-10" /> {/* Settings */}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="flex gap-4 py-3 border-b">
              {columns.map((col, index) => (
                <Skeleton key={index} className={`h-4 ${col.width}`} />
              ))}
            </div>

            {/* Table Rows */}
            {Array.from({ length: rows }).map((_, index) => (
              <div
                key={index}
                className="flex gap-4 py-4 border-b border-gray-100"
              >
                {columns.map((col, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    className={`h-4 ${col.width} ${
                      colIndex === columns.length - 1 ? "flex gap-1" : ""
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between pt-6">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default TableSkeleton;
