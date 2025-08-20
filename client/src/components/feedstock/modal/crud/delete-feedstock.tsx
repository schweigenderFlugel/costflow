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
import { itemToasts } from "@/components/item-toasts"
import DetailFeedstock from "@/components/feedstock/modal/crud/detail-feedstock"

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

    if (!data.message?.includes("successfully")) {
      let message = data.description || data.message || data.detail
      if (Array.isArray(message)) {
        message = (message.map(detail => detail.msg)).join(". \n")
      }

      // Usar el toast de error personalizado
      itemToasts.error({
        description: feedstock.name,
        message
      })
    }
    else {
      // Usar el toast de éxito personalizado
      itemToasts.deleteSuccess({
        description: feedstock.name,
      })
      handleOpenChange(false)
      tableToggle()
    }

  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="w-md max-w-[calc(100swh-3rem)] p-6 gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este insumo?</AlertDialogTitle>
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
