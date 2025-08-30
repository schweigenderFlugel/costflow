"use client"
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
import { useDeleteFeedstockDialog } from "@/hooks/use-feedstock-dialog"
import { useFeedstockMutations } from "@/hooks/mutations/use-feedstock-mutations"
import DetailFeedstock from "@/components/feedstock/modal/crud/detail-feedstock"

const DeleteFeedstock = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useDeleteFeedstockDialog()
  const { deleteFeedstock } = useFeedstockMutations()

  if (feedstock === null) return;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFeedstock(null)
    }
    setIsOpen(open)
  }

  const handleClick = () => {
    deleteFeedstock.mutate({ feedstockId: feedstock.id, feedstockName: feedstock.name }, {
      onSuccess: () => {
        handleOpenChange(false)
      }
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="w-md max-w-[calc(100svw-3rem)] p-6 gap-8" data-slot="alert-dialog-delete-product">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este insumo?</AlertDialogTitle>
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        </AlertDialogHeader>


        <DetailFeedstock feedstock={feedstock} data-slot="alert-dialog-description" />


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
