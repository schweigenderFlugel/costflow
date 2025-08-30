import { TableCell, TableRow } from "@/components/ui/table";

const NoResult = ({ colSpan }: { colSpan: number }) => (
  <TableRow>
    <TableCell
      colSpan={colSpan}
      className="h-24 text-center"
    >
      No results.
    </TableCell>
  </TableRow>)


export default NoResult
