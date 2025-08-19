import LoadingRow from "@/components/data-table/loading-row"
import NoResult from "@/components/data-table/no-results"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { flexRender, Table as ITTable } from "@tanstack/react-table"


const OnlyTable = <TData,>({ table, colSpan, isLoading }: { table: ITTable<TData>, colSpan: number, isLoading?: boolean }) => (
  <Table>
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )
            : <NoResult colSpan={colSpan} />
      }
    </TableBody>
  </Table>
)

export default OnlyTable
