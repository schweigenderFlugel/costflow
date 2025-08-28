"use client";

import AddProductSheet from "@/components/calculadora/add-product";
import PageHeaderSection from "@/components/shared/page-header-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const Page = () => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Cálculos y presupuestos"
        description="Creá tus presupuestos añadiendo productos, insumos y costos adicionales a la calculadora. Descargá el presupuesto en formato .pdf para enviarle a tus clientes."
      />

      <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5 flex gap-4">
        <div className="w-7/12 flex flex-col gap-2">
          <Card>
            <CardHeader className="flex items-center gap-3">
              <CalculatorIcon className="size-9 bg-blue-200 rounded-lg text-blue-900 p-1" />
              <div>
                <CardTitle className="text-lg">Nuevo cálculo</CardTitle>
                <CardDescription>
                  Calculadora automática de costos y presupuestos
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
          <div className="flex w-full gap-3 ">
            <AddProductSheet />

            <Button className="flex-1 bg-white text-black border shadow-sm hover:bg-gray-200 hover:border hover:shadow-sm">
              + Agregar insumo
            </Button>
          </div>
        </div>
        <div className="w-5/12">
          <Card>
            <CardHeader className="flex items-center gap-3">
              <CurrencyDollarIcon className="size-9 bg-green-200 rounded-lg text-green-900 p-1" />
              <div>
                <CardTitle className="text-lg">Presupuesto</CardTitle>
              </div>
              <div className="flex-1"></div>
              <Button disabled>
                <ArrowDownIcon className="size-3" />
                <p className="text-sm">Descargar pdf</p>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Artículo</TableHead>
                    <TableHead className="font-bold">Cantidad</TableHead>
                    <TableHead className="font-bold">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>

                <TableFooter className="bg-white">
                  <TableRow>
                    <TableCell className="font-bold" colSpan={2}>
                      Subtotal de productos
                    </TableCell>
                    <TableCell className="font-bold">$</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold" colSpan={2}>
                      IVA
                    </TableCell>
                    <TableCell className="font-bold">$</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold" colSpan={2}>
                      Total
                    </TableCell>
                    <TableCell className="font-bold">$</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Page;
