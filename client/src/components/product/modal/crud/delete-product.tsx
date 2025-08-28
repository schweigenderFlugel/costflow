"use client"
import { itemToasts } from "@/components/item-toasts"
import DetailProduct from "@/components/product/modal/crud/detail-product"
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
import { useDeleteProductDialog } from "@/hooks/use-product-dialog"
import useProductMutations from "@/hooks/mutations/use-product-mutations"

const DeleteProduct = () => {
  const { isOpen, setIsOpen, product, setProduct } = useDeleteProductDialog()
  const { deleteProduct } = useProductMutations()

  if (product === null) return;


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setProduct(null)
    }
    setIsOpen(open)
  }

  const handleClick = () => {
    deleteProduct.mutate({ productId: product.id, productName: product.name }, {
      onSuccess: () => {
        handleOpenChange(false)
      }
    })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange} data-slot="alert-dialog-delete-product">
      <AlertDialogContent className="w-md max-w-[calc(100svw-3rem)] p-6 gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        </AlertDialogHeader>

        <DetailProduct product={product} data-slot="alert-dialog-description" />

        <AlertDialogFooter className="grid grid-cols-2 gap-4 sm:gap-8 w-full justify-between items-center">
          <AlertDialogCancel className="cursor-pointer"
            onClick={() => {
              setIsOpen(false)
              setProduct(null)
            }}
          >Cancelar</AlertDialogCancel>
          <AlertDialogAction className="cursor-pointer" onClick={handleClick}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default DeleteProduct
