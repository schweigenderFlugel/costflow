import { Button } from "@/components/ui/button"
import { useCreateProductDialog } from "@/hooks/use-product-dialog"
import { Plus } from "lucide-react"


const CreateProductTrigger = () => {
  const { setIsOpen } = useCreateProductDialog()

  return (
    <Button
      type="button"
      className="gap-2 flex"
      onClick={() => setIsOpen(true)}
      data-slot="product-create-dialog-trigger"
    >
      <Plus />
      Agregar producto
    </Button >
  )
}

export default CreateProductTrigger;
