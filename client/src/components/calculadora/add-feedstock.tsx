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
import { HistorialData } from "@/components/calculadora/interface-historial";
import { ProductCalculation } from "@/components/calculadora/table-calculation";
import FeedstockTable from "@/components/calculadora/table-feedstock";
import { MeasureUnits } from "@/components/calculadora/measure-units";

type FeedstockOption = {
  id: string;
  name: string;
  currency: "ARS" | "USD";
  unit_cost: number;
  measure_unit: keyof typeof MeasureUnits;
};

export default function AddFeedstockSheet({
  setProducts,
}: {
  setProducts: React.Dispatch<React.SetStateAction<ProductCalculation[]>>;
}) {
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [selectedFeedstocks, setSelectedFeedstocks] = React.useState<
    ProductCalculation[]
  >([]);
  const [open, setOpen] = React.useState(false);

  const { data: rawData = [] } = useQuery({
    queryKey: ["historial-products"],
    queryFn: () => fetch("/api/historial").then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const latestPeriodData: HistorialData | null = React.useMemo(() => {
    if (!Array.isArray(rawData) || rawData.length === 0) return null;
    const sorted = [...rawData].sort((a, b) => {
      const [monthA, yearA] = a.period.split("-").map(Number);
      const [monthB, yearB] = b.period.split("-").map(Number);
      if (yearA !== yearB) return yearB - yearA;
      return monthB - monthA;
    });
    return sorted[0];
  }, [rawData]);

  const feedstocks: FeedstockOption[] = React.useMemo(() => {
    if (!latestPeriodData?.feedstocks) return [];
    return latestPeriodData.feedstocks.map((f) => ({
      id: f.id,
      name: f.name,
      unit_cost: f.unit_cost,
      currency: f.currency === "USD" ? "USD" : "ARS",
      measure_unit:
        f.measure_unit in MeasureUnits
          ? (f.measure_unit as keyof typeof MeasureUnits)
          : "UNITS",
    }));
  }, [latestPeriodData]);

  const filteredFeedstocks = React.useMemo(() => {
    if (!search) return feedstocks.slice(0, 5);
    return feedstocks
      .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search, feedstocks]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredFeedstocks.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 < filteredFeedstocks.length ? prev + 1 : 0
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 >= 0 ? prev - 1 : filteredFeedstocks.length - 1
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSelectFeedstock(filteredFeedstocks[highlightedIndex]);
    }
  };

  const handleSelectFeedstock = (f: FeedstockOption) => {
    console.log(f);
    setSelectedFeedstocks((prev) => {
      const existing = prev.find((sf) => sf.id === f.id);
      if (existing) return prev; // ya está en la lista temporal, no agregamos otra vez
      const unitValue =
        f.currency === "USD"
          ? f.unit_cost * (latestPeriodData?.dolar.price ?? 1)
          : f.unit_cost;

      return [
        ...prev,
        {
          id: f.id,
          name: f.name,
          quantity: 1,
          unit: f.measure_unit,
          unitValue,
        },
      ];
    });
    setSearch("");
  };

  const handleAddToList = () => {
    if (selectedFeedstocks.length === 0) return;

    setProducts((prev) => {
      const updated = [...prev];
      selectedFeedstocks.forEach((sf) => {
        const existingIndex = updated.findIndex((p) => p.id === sf.id);

        if (existingIndex >= 0) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + (sf.quantity ?? 1),
          };
        } else {
          // si no existe, lo agregamos tal cual
          updated.push({ ...sf });
        }
      });

      return updated;
    });

    setSelectedFeedstocks([]);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="flex-1 bg-white hover:bg-gray-100 text-black border shadow-sm">
          + Agregar insumo
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="sm:max-w-1/2 p-4">
        <SheetHeader>
          <SheetClose asChild>
            <button className="text-sm mb-3 text-start cursor-pointer hover:font-bold">
              &lt; Volver a calculadora
            </button>
          </SheetClose>

          <SheetTitle className="mt-5 text-lg font-bold">
            Agregar insumo
          </SheetTitle>
          <SheetDescription>
            Buscá y seleccioná los insumos que desees agregar a la lista.
          </SheetDescription>

          <div className="flex items-center justify-center gap-5 mt-4">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar insumo"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              {search && filteredFeedstocks.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto">
                  {filteredFeedstocks.map((f, idx) => (
                    <div
                      key={idx}
                      className={`p-2 cursor-pointer text-sm ${
                        idx === highlightedIndex
                          ? "bg-blue-200"
                          : "hover:bg-blue-200"
                      }`}
                      onClick={() => handleSelectFeedstock(f)}
                    >
                      {f.name}
                      {/* ${f.unit_cost} */}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              disabled={!search}
              onClick={() => {
                const f = filteredFeedstocks[0];
                if (f) handleSelectFeedstock(f);
              }}
            >
              +
            </Button>
          </div>

          <div className="mt-5">
            <FeedstockTable
              feedstocks={selectedFeedstocks}
              setFeedstocks={setSelectedFeedstocks}
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
