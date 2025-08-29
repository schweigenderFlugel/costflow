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
import QuantityInput from "@/components/calculadora/quantity-input";
import { FeedstockCalculation } from "./feedstock-type";
import { MeasureUnits } from "@/components/calculadora/measure-units";

interface FeedstockTableProps {
  feedstocks: FeedstockCalculation[];
  setFeedstocks: React.Dispatch<React.SetStateAction<FeedstockCalculation[]>>;
  className?: string;
}

export default function FeedstockTable({
  feedstocks,
  setFeedstocks,
  className,
}: FeedstockTableProps) {
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteRow = (id: string) => {
    setFeedstocks((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDeleteSelected = (
    table: ReactTableInstance<FeedstockCalculation>
  ) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    setFeedstocks((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
    table.resetRowSelection();
  };

  const columns: ColumnDef<FeedstockCalculation>[] = [
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
      header: "Insumo",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Cantidad",
      cell: ({ row }) => (
        <QuantityInput item={row.original} setItems={setFeedstocks} />
      ),
    },
    {
      accessorKey: "unit",
      header: "Tipo de unidad",
      cell: ({ row }) => {
        const unitKey = row.getValue("unit") as keyof typeof MeasureUnits;
        return (
          <div>{MeasureUnits[unitKey]?.label ?? row.getValue("unit")}</div>
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
    data: feedstocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <div
      className={`w-full overflow-hidden rounded-md border ${className ?? ""}`}
    >
      {feedstocks.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center bg-blue-200">
          <p className="text-xl font-bold">
            Aquí verás todos los insumos disponibles para crear tu presupuesto
          </p>
          <p className="text-sm">
            Utiliza el buscador para seleccionar los insumos que quieras agregar
            a la lista.
          </p>
        </div>
      )}
    </div>
  );
}
