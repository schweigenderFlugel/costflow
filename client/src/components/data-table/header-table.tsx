import ColumnsDropdown from "@/components/data-table/columns-dropdown";
import CreateFeedstockTrigger from "@/components/feedstock/modal/trigger/create-feedstock-trigger";
import CreateProductTrigger from "@/components/product/modal/trigger/create-product-trigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { Download, ListFilter } from "lucide-react";


const HeaderTable = <T,>({ table, columnsTo }: { table: Table<T>, columnsTo: "product" | "feedstock" }) => (
  <header className="flex items-center justify-between pt-4 pb-6 gap-4 sm:flex-nowrap flex-wrap">

    <div className="flex gap-2 justify-between items-center sm:w-auto w-full">
      <ColumnsDropdown <T> columnsTo={columnsTo} table={table} />
      <Input
        placeholder="Buscar por nombre..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="w-xs max-w-[calc(100%-10rem)]"
      />
      <Button type="button" variant={"ghost"} disabled>
        <ListFilter className="size-full" />
      </Button>
    </div>

    <div className="flex items-center justify-end gap-4 w-full">
      <Button variant={"outline"} disabled>
        <Download />
        Importar
      </Button>
      {
        columnsTo == "feedstock"
          ? <CreateFeedstockTrigger />
          : <CreateProductTrigger />
      }
    </div>
  </header >
)

export default HeaderTable
