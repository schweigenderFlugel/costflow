"use client"
import { Button } from "@/components/ui/button"
import { useDeleteProductDialog, useUpdateProductDialog } from "@/hooks/use-product-dialog"
import { ObjProduct } from "@/types/items/product"
import { fetcher } from "@/utils/fetcher"
import { Trash2, Pencil } from "lucide-react"

const ProductActions = ({ product }: { product: ObjProduct }) => {
  const { setIsOpen: setUpdateState, setProduct: setUpdateFeedstock, setIsLoadingProduct } = useUpdateProductDialog()
  const { setIsOpen: setDeleteState, setProduct: setDeleteFeedstock } = useDeleteProductDialog()

  const handleDelete = () => {
    setDeleteState(true)
    setDeleteFeedstock(product)
  }

  const handleUpdate = async () => {
    setIsLoadingProduct(true)
    setUpdateState(true)

    try {
      const allInfoToProduct = await fetcher({ input: `/api/product/${product.id}` })

      if (!('error' in allInfoToProduct) && !(allInfoToProduct.detail)) {
        setUpdateFeedstock(allInfoToProduct)
      }
    } catch (error) {
      console.error('Error fetching product details:', error)
    } finally {
      setIsLoadingProduct(false)
    }
  }


  return (<div className="flex gap-1">
    <Button
      data-slot="product-update-dialog-trigger"
      onClick={handleUpdate}
      type="button"
      className="text-primary hover:text-primary cursor-pointer"
      variant={"ghost"}
      size={"sm"}
    >
      <Pencil className="size-4" />
    </Button>

    <Button
      data-slot="product-delete-dialog-trigger"
      onClick={handleDelete}
      type="button"
      className="text-red-800 hover:text-red-800 cursor-pointer"
      variant={"ghost"}
      size={"sm"}
    >
      <Trash2 className="size-4" />
    </Button>
  </div>)
}

export default ProductActions
