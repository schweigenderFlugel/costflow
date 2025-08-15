import { Button } from "@/components/ui/button"
import { useCreateFeedstockDialog } from "@/hooks/use-feedstock-dialog"
import { Plus } from "lucide-react"


const CreateFeedstockTrigger = () => {
  const { setIsOpen } = useCreateFeedstockDialog()

  return (
    <Button
      type="button"
      className="gap-2 flex"
      onClick={() => setIsOpen(true)}
      data-slot="feedstock-create-dialog-trigger"
    >
      <Plus />
      Agregar insumo
    </Button >
  )
}

export default CreateFeedstockTrigger;
