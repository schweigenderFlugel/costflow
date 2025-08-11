import ColumnsDropdown from "@/components/data-table/columns-dropdown";
import { Input } from "@/components/ui/input";
import { ObjFeedstock } from "@/types/items/feedstock";
import { Table } from "@tanstack/react-table";


const HeaderTable = ({ table }: { table: Table<ObjFeedstock> }) => (
  <header className="flex items-center justify-between py-4 gap-4 sm:flex-nowrap flex-wrap">

    <div className="flex gap-x-5 gap-y-2 items-center sm:w-auto w-full">
      <Input
        placeholder="Filter sku..."
        value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("sku")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Input
        placeholder="Filter names..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
    </div>

    <div className="flex items-center ml-auto space-x-2">
      <ColumnsDropdown table={table} />
      {/* <CreateFeedstockForm /> */}
    </div>
  </header >
)

export default HeaderTable
