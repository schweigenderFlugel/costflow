"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import {
  HistorialData,
  MonthlyProduction,
} from "@/components/calculadora/interface-historial";
import { Product, ProductTable } from "@/components/calculadora/table-product";
import { ProductCalculation } from "@/components/calculadora/table-calculation";

type ProductOption = {
  product_name: string;
  indirect_costs: number;
  feedstocks_costs: number;
  labour_costs: number;
};

export type SelectedProduct = Product & {
  indirect_costs: number;
  feedstocks_costs: number;
  labour_costs: number;
};

export default function AddProductSheet({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<ProductCalculation[]>>;
}) {
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredProducts.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 < filteredProducts.length ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredProducts.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSelectProduct(filteredProducts[highlightedIndex]);
    }
  };

  const [search, setSearch] = React.useState("");
  const [selectedProducts, setSelectedProducts] = React.useState<
    SelectedProduct[]
  >([]);

  const [open, setOpen] = React.useState(false);
  const handleAddToList = () => {
    if (selectedProducts.length === 0) return;

    setProducts((prev) => {
      const updatedProducts = [...prev];

      selectedProducts.forEach((sp) => {
        // Buscar por nombre
        const existingIndex = updatedProducts.findIndex(
          (p) => p.name === sp.name
        );

        if (existingIndex >= 0) {
          // Si ya existe, sumamos la cantidad
          updatedProducts[existingIndex] = {
            ...updatedProducts[existingIndex],
            quantity:
              updatedProducts[existingIndex].quantity + (sp.quantity ?? 1),
          };
        } else {
          // Si no existe, agregamos nuevo producto
          updatedProducts.push({
            id: crypto.randomUUID(), // UUID único solo para tabla
            name: sp.name,
            quantity: sp.quantity ?? 1,
            unit: sp.unit ?? "pza",
            unitValue:
              sp.indirect_costs + sp.feedstocks_costs + sp.labour_costs,
          });
        }
      });

      return updatedProducts;
    });

    setSelectedProducts([]);
    setOpen(false);
  };

  const { data: rawData = [] } = useQuery({
    queryKey: ["historial-products"],
    queryFn: () => fetch("/api/historial").then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  // Obtener el periodo más reciente
  const latestPeriodData: HistorialData | null = React.useMemo(() => {
    if (!Array.isArray(rawData) || rawData.length === 0) return null;

    // Ordenamos por fecha (año-mes)
    const sorted = [...rawData].sort((a, b) => {
      const [monthA, yearA] = a.period.split("-").map(Number);
      const [monthB, yearB] = b.period.split("-").map(Number);

      // Comparar primero por año, luego por mes
      if (yearA !== yearB) return yearB - yearA;
      return monthB - monthA;
    });

    return sorted[0]; // el más reciente
  }, [rawData]);

  // Productos SOLO del último periodo
  const products: ProductOption[] = React.useMemo(() => {
    if (!latestPeriodData) return [];
    return (
      latestPeriodData.monthly_production?.products
        ?.filter(
          (p): p is MonthlyProduction & { product_name: string } =>
            !!p.product_name
        ) // 👈 asegura que product_name es string
        .map((p) => ({
          product_name: p.product_name,
          indirect_costs: p.indirect_costs,
          feedstocks_costs: p.feedstocks_costs,
          labour_costs: p.labour_costs,
        })) ?? []
    );
  }, [latestPeriodData]);

  // Filtered products for autocomplete
  const filteredProducts = React.useMemo(() => {
    if (!search) return products.slice(0, 5);
    return products
      .filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);
  }, [search, products]);

  const handleSelectProduct = (product: ProductOption) => {
    if (!selectedProducts.find((p) => p.name === product.product_name)) {
      setSelectedProducts((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: product.product_name,
          quantity: 1,
          unit: "pza",
          indirect_costs: product.indirect_costs,
          feedstocks_costs: product.feedstocks_costs,
          labour_costs: product.labour_costs,
        },
      ]);
    }
    setSearch("");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="flex-1">+ Agregar producto</Button>
      </SheetTrigger>

      <SheetContent side="right" className="sm:max-w-1/2 p-4">
        <SheetHeader>
          <SheetClose asChild>
            <button className="text-sm mb-3 text-start cursor-pointer hover:font-bold">
              &lt; Volver a calculadora
            </button>
          </SheetClose>

          <SheetTitle className="mt-5 text-lg font-bold">
            Agregar producto para calcular
          </SheetTitle>
          <SheetDescription>
            Buscá y seleccioná los productos que desees agregar a la lista de tu
            presupuesto.
          </SheetDescription>

          <div className="flex items-center justify-center gap-5">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar producto"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(0); // reset cuando cambia búsqueda
                }}
                onKeyDown={handleKeyDown}
              />

              {search && filteredProducts.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                  {filteredProducts.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-2 cursor-pointer text-sm ${
                        idx === highlightedIndex
                          ? "bg-blue-200"
                          : "hover:bg-blue-200"
                      }`}
                      onClick={() => handleSelectProduct(p)}
                    >
                      {p.product_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              disabled={!search}
              onClick={() => {
                const product = filteredProducts[0];
                if (product) handleSelectProduct(product);
              }}
            >
              +
            </Button>
          </div>

          <div className="mt-5">
            <ProductTable
              products={selectedProducts as Product[]}
              setProducts={
                setSelectedProducts as React.Dispatch<
                  React.SetStateAction<Product[]>
                >
              }
            />
          </div>

          <Button className="w-fit px-6 mt-5" onClick={handleAddToList}>
            + Agregar a la lista
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
