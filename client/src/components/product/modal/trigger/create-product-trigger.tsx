"use client"
import { Button } from "@/components/ui/button"
import { useCreateProductDialog } from "@/hooks/use-product-dialog"
import { PlusIcon } from "@heroicons/react/24/outline"


const CreateProductTrigger = () => {
  const { setIsOpen } = useCreateProductDialog()

  return (
    <Button
      type="button"
      className="gap-2 flex"
      onClick={() => setIsOpen(true)}
      data-slot="product-create-dialog-trigger"
    >
      <PlusIcon className="size-5" />
      Agregar producto
    </Button >
  )
}

export default CreateProductTrigger;
