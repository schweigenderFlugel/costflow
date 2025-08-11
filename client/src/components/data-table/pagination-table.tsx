import { Button } from "@/components/ui/button"
import { ObjFeedstock } from "@/types/items/feedstock"
import { Table } from "@tanstack/react-table"


const PaginationTable = ({ table }: { table: Table<ObjFeedstock> }) => {
  return (
    <footer className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </footer>
  )
}

export default PaginationTable
