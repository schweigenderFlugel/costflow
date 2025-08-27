"use client"
import DetailIndirectCost from "@/components/indirect-cost/crud/detail-indirect-cost"
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
import { useIndirectCostMutations } from "@/hooks/mutations/use-indirect-cost-mutations"

const DeleteIndirectCost = () => {
  const { isOpen, setIsOpen, indirectCost, setIndirectCost } = useDeleteIndirectCostDialog()
  const { deleteIndirectCost } = useIndirectCostMutations()

  if (indirectCost === null) return;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIndirectCost(null)
    }
    setIsOpen(open)
  }

  const handleClick = () => {
    deleteIndirectCost.mutate(
      { indirectCostId: indirectCost.id, indirectCostType: indirectCost.type },
      {
        onSuccess: () => {
          handleOpenChange(false)
        }
      }
    )
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
