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
import { useDeleteProductDialog } from "@/hooks/use-product-dialog"
import { useUpdateDataTable } from "@/hooks/use-update-data-table"
import { fetcher } from "@/utils/fetcher"
import { translateMeasureUnit } from "@/utils/translate/feedstock"
import { toast } from "sonner"

const DeleteProduct = () => {
  const { isOpen, setIsOpen, product, setProduct } = useDeleteProductDialog()
  const { toggle: tableToggle } = useUpdateDataTable("product")
  if (product === null) return;


  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setProduct(null)
    }
    setIsOpen(open)
  }

  const handleClick = async () => {
    const data = await fetcher({ input: `/api/product/${product.id}`, method: "DELETE" })
    toast(data.description || data.message || data.error)
    tableToggle()
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="w-md max-w-[calc(100swh-3rem)] p-6 gap-8">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="text-muted-foreground" data-slot="alert-dialog-description">
          {/* detalles del producto a eliminar */}
          <p>Nombre: {product.name}</p>
          <p>Descripción: {product.description}</p>
          <p>Unidad de medida: {translateMeasureUnit(product.measure_unit)}</p>
          <p>Cantidad: {product.quantity}</p>
          <p>Subtotal: {product.subtotal}</p>
        </div>

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
