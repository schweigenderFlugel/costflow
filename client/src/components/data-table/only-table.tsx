import LoadingRow from "@/components/data-table/loading-row"
import NoResult from "@/components/data-table/no-results"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { flexRender, Table as ITTable } from "@tanstack/react-table"


const OnlyTable = <TData,>({ table, colSpan, isLoading }: { table: ITTable<TData>, colSpan: number, isLoading?: boolean }) => (
  <div className="relative overflow-auto">
    <Table className="border">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isFixed = header.column.columnDef.meta?.isFixed
              return (
                <TableHead
                  key={header.id}
                  className={
                    cn(isFixed ? "sticky right-0 shadow-lg z-10" : "",
                      "bg-primary border text-center text-background px-0")
                  }
                >
                  {
                    header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                  }
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {
          isLoading ? (
            <LoadingRow colSpan={colSpan} />
          ) :
            table.getRowModel().rows?.length
              ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isFixed = cell.column.columnDef.meta?.isFixed
                      return (
                        <TableCell
                          key={cell.id}
                          className={isFixed ? "pr-0 sticky right-0 bg-background group-hover:bg-muted shadow-lg w-fit transition-colors" : "min-w-28 max-w-44"}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              )
              : <NoResult colSpan={colSpan} />
        }
      </TableBody>
    </Table>
  </div >
)

export default OnlyTable
