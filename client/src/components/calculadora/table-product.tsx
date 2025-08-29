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

// 🔹 Tipo de datos
export type Product = {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
};

// 🔹 Tabla ahora recibe productos desde el Sheet
export function ProductTable({
  products,
  setProducts,
  className,
}: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  className?: string;
}) {
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDeleteRow = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDeleteSelected = (table: ReactTableInstance<Product>) => {
    const selectedIds = table
      .getSelectedRowModel()
      .rows.map((row) => row.original.id);
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    table.resetRowSelection();
  };

  // 🔹 Definición de columnas
  const columns: ColumnDef<Product>[] = [
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
      header: "Producto",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "quantity",
      header: "Cantidad",
      cell: ({ row }) => (
        <QuantityInput item={row.original} setItems={setProducts} />
      ),
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
    <div
      className={`w-full overflow-hidden rounded-md border ${className ?? ""}`}
    >
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
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center bg-blue-200">
          <p className="text-xl font-bold">
            Aquí verás todos los productos disponibles para crear tu presupuesto
          </p>
          <p className="text-sm">
            Utiliza el buscador para seleccionar los productos que quieras
            agregar a la lista.
          </p>
          {/* <Button onClick={() => console.log("Abrir Sheet")}>
            + Agregar producto
          </Button> */}
        </div>
      )}
    </div>
  );
}
