"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductCalculation } from "./table-calculation";

interface BudgetTableProps {
  products: ProductCalculation[];
  ivaRate?: number; // por defecto 21%
}

export default function BudgetTable({
  products,
  ivaRate = 0.21,
}: BudgetTableProps) {
  const subtotal = products.reduce(
    (acc, p) => acc + p.unitValue * p.quantity,
    0
  );
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Artículo</TableHead>
          <TableHead className="font-bold">Cantidad</TableHead>
          <TableHead className="font-bold">Subtotal</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{p.name}</TableCell>
            <TableCell>{p.quantity}</TableCell>
            <TableCell>
              $
              {(p.unitValue * p.quantity).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter className="bg-white">
        <TableRow>
          <TableCell className="font-bold" colSpan={2}>
            Subtotal de productos
          </TableCell>
          <TableCell className="font-bold">
            $
            {subtotal.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-bold" colSpan={2}>
            IVA ({(ivaRate * 100).toFixed(0)}%)
          </TableCell>
          <TableCell className="font-bold">
            $
            {iva.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-bold" colSpan={2}>
            Total
          </TableCell>
          <TableCell className="font-bold">
            $
            {total.toLocaleString("es-AR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
