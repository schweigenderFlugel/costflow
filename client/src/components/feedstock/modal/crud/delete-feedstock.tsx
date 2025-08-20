"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteFeedstockDialog } from "@/hooks/use-feedstock-dialog"
import { useUpdateDataTable } from "@/hooks/use-update-data-table"
import { fetcher } from "@/utils/fetcher"
import { toast } from "sonner"

const DeleteFeedstock = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useDeleteFeedstockDialog()
  const { toggle: tableToggle } = useUpdateDataTable("feedstock")
  if (feedstock === null) return;


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFeedstock(null)
    }
    setIsOpen(open)
  }

  const handleClick = async () => {
    const data = await fetcher({ input: `/api/feedstock/${feedstock.id}`, method: "DELETE" })
    toast(data.description || data.message || data.error)
    tableToggle()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="w-md max-w-[calc(100swh-3rem)] p-6 gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este insumo?</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="text-muted-foreground" data-slot="alert-dialog-description">
          {/* detalles del insumo a eliminar */}
          <p className="block text-md">
            Proveedor: {feedstock.provider}
          </p>
          <p className="block text-md">
            Nombre: {feedstock.name}
          </p>
          {/* <p className="block text-md">
            Cantidad: {feedstock.quantity}
          </p> */}
          <p className="block text-md">
            Unidad de medida: {feedstock.measure_unit}
          </p>
          <p className="block text-md">
            Costo unitario: {feedstock.unit_cost}
          </p>
        </div>

        <AlertDialogFooter className="grid grid-cols-2 gap-4 sm:gap-8 w-full justify-between items-center">
          <AlertDialogCancel className="cursor-pointer"
            onClick={() => {
              setIsOpen(false)
              setFeedstock(null)
            }}
          >Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleClick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default DeleteFeedstock
