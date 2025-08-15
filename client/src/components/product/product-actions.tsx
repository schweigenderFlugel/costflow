"use client"
import { Button } from "@/components/ui/button"
import { useDeleteProductDialog, useUpdateProductDialog } from "@/hooks/use-product-dialog"
import { ObjProduct } from "@/types/items/product"
import { Trash2, Pencil } from "lucide-react"

const ProductActions = ({ product }: { product: ObjProduct }) => {
  const { setIsOpen: setUpdateState, setProduct: setUpdateFeedstock } = useUpdateProductDialog()
  const { setIsOpen: setDeleteState, setProduct: setDeleteFeedstock } = useDeleteProductDialog()

  const handleDelete = () => {
    setDeleteState(true)
    setDeleteFeedstock(product)
    console.log("Delete product", product.id)
  }
  const handleUpdate = () => {
    setUpdateState(true)
    setUpdateFeedstock(product)
    console.log("Update product", product.id)
  }


  return (<div className="flex gap-1 px-1">
    <Button
      data-slot="product-update-dialog-trigger"
      onClick={handleUpdate}
      type="button"
      className="text-primary hover:text-primary cursor-pointer"
      variant={"ghost"}
    >
      <Pencil className="size-4" />
    </Button>

    <Button
      data-slot="product-delete-dialog-trigger"
      onClick={handleDelete}
      type="button"
      className="text-red-800 hover:text-red-800 cursor-pointer"
      variant={"ghost"}
    >
      <Trash2 className="size-4" />
    </Button>
  </div>)
}

export default ProductActions
