import { Button } from "@/components/ui/button"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"
import { Table } from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"


const PaginationTable = <T,>({ table }: { table: Table<T> }) => {
  return (
    <footer className="flex flex-col gap-2">
      <div className="text-muted-foreground flex-1 text-sm py-2">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} fila
        {table.getFilteredRowModel().rows.length > 1 ? "s " : " "}
        seleccionada
        {table.getFilteredRowModel().rows.length > 1 ? "s" : ""}.
      </div>

      <Pagination>
        <PaginationContent className="flex w-full justify-between items-center py-2">
          <PaginationItem>
            <Button
              type="button"
              className="flex"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Atrás</span>
            </Button>
          </PaginationItem>

          <div className="flex gap-5 items-center align-middle">

            {table.getPageCount() > 1 && (<>
              {new Array(table.getPageCount()).fill(0).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" isActive={index === table.getState().pagination.pageIndex}
                    onClick={() => table.setPageIndex(index)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </>)}

          </div>

          <PaginationItem>
            <Button
              type="button"
              className="flex"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="hidden sm:block">Siguiente</span>
              <ChevronRightIcon />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </footer >
  )
}

export default PaginationTable
