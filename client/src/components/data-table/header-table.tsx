import ColumnsDropdown from "@/components/data-table/columns-dropdown";
import CreateFeedstockTrigger from "@/components/feedstock/modal/trigger/create-feedstock-trigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ObjFeedstock } from "@/types/items/feedstock";
import { Table } from "@tanstack/react-table";
import { Download, ListFilter } from "lucide-react";


const HeaderTable = ({ table }: { table: Table<ObjFeedstock> }) => (
  <header className="flex items-center justify-between pt-4 pb-6 gap-4 sm:flex-nowrap flex-wrap">

    <div className="flex gap-2 justify-between items-center sm:w-auto w-full">
      {/* <Input
        placeholder="Filter sku..."
        value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("sku")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      /> */}
      <ColumnsDropdown table={table} />
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
      <CreateFeedstockTrigger />
    </div>
  </header >
)

export default HeaderTable
