import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductFormSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-2 sm:px-4">

      {/* Columna izquierda - Campos del producto */}
      <div className="flex flex-col col-span-1 gap-y-4">
        {/* SKU */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Nombre */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Estado de la materia */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Unidad de medida */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Cantidad */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>

      {/* Columna derecha - Insumos */}
      <div className="col-span-1 space-y-4 h-full">
        {/* Buscador de insumos */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Lista de insumos skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <div className="space-y-3 px-2">
            {[1, 2].map((item) => (
              <Card key={item} className="p-3">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-8 w-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-16" />
                  <div className="relative flex-1">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductFormSkeleton;
