import { TableCell, TableRow } from "@/components/ui/table"
import SpinLoader from "@/components/shared/spin-loader"

const LoadingRow = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24 text-center">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <SpinLoader isPending />
          <span>Actualizando datos...</span>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default LoadingRow
