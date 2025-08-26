"use client"
import DetailIndirectCost from "@/components/indirect-cost/crud/detail-indirect-cost"
import { itemToasts } from "@/components/item-toasts"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog"
import { useUpdateDataTable } from "@/hooks/use-update-data-table"
import { fetcher } from "@/utils/fetcher"

const DeleteIndirectCost = () => {
  const { isOpen, setIsOpen, indirectCost, setIndirectCost } = useDeleteIndirectCostDialog()
  const { toggle: updateTable } = useUpdateDataTable("indirect_cost")

  if (indirectCost === null) return;


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIndirectCost(null)
    }
    setIsOpen(open)
  }

  const handleClick = async () => {
    const data = await fetcher({ input: `/api/indirect_cost/${indirectCost.id}`, method: "DELETE" })

    if (data.error || !data.message?.includes("successfully")) {
      let posibleMessage = data.error || data.description || data.message || data.detail
      if (Array.isArray(posibleMessage)) {
        posibleMessage = (posibleMessage.map(detail => detail.msg)).join(". \n")
      }
      console.error(data)
      itemToasts.error({ description: indirectCost.type, message: posibleMessage, type: "costo indirecto" })
    } else {
      itemToasts.deleteSuccess({ description: indirectCost.type, type: "costo indirecto" })
      handleOpenChange(false)
      updateTable()
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange} data-slot="alert-dialog-delete-product">
      <AlertDialogContent className="w-md max-w-[calc(100svw-3rem)] p-6 gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este costo?</AlertDialogTitle>
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        </AlertDialogHeader>

        <DetailIndirectCost indirectCost={indirectCost} />

        <AlertDialogFooter className="grid grid-cols-2 gap-4 sm:gap-8 w-full justify-between items-center">
          <AlertDialogCancel className="cursor-pointer"
            onClick={() => {
              setIsOpen(false)
              setIndirectCost(null)
            }}
          >Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleClick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default DeleteIndirectCost
