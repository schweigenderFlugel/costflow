"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table as ReactTableInstance } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { MeasureUnits } from "@/components/calculadora/measure-units";

export type ProductCalculation = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unitValue: number;
};

export function CalculationTable({
  products,
  setProducts,
  className,
}: {
  products: ProductCalculation[];
  setProducts: React.Dispatch<React.SetStateAction<ProductCalculation[]>>;
  className?: string;
}) {
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteRow = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteSelected = (
    table: ReactTableInstance<ProductCalculation>
  ) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    table.resetRowSelection();
  };

  // 🔹 Definición de columnas
  const columns: ColumnDef<ProductCalculation>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Artículo",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },

    {
      accessorKey: "quantity",
      header: "Cantidad",
      cell: ({ row }) => {
        const { quantity, unit } = row.original;

        const displayUnit =
          unit === "pza" && quantity > 1
            ? "pzas"
            : MeasureUnits[unit as keyof typeof MeasureUnits]?.label ?? unit;

        return (
          <div>
            {quantity} {displayUnit}
          </div>
        );
      },
    },

    {
      accessorKey: "unitValue",
      header: "Valor por Unidad",
      cell: ({ row }) => {
        const { unitValue } = row.original;
        return (
          <div>
            $
            {unitValue.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        );
      },
    },
    {
      id: "total",
      header: "Valor Total",
      cell: ({ row }) => {
        const { quantity, unitValue } = row.original;
        const total = quantity * unitValue;
        return (
          <div>
            $
            {total.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        );
      },
    },

    {
      id: "delete",
      header: ({ table }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteSelected(table)}
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      ),
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDeleteRow(row.original.id)}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <div className={`w-full overflow-hidden rounded-md ${className ?? ""}`}>
      {products.length > 0 ? (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
