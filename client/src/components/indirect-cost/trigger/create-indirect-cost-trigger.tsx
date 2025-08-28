import { Button } from "@/components/ui/button"
import { useCreateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog"
import { Plus } from "lucide-react"


const CreateIndirectCostTrigger = () => {
  const { setIsOpen } = useCreateIndirectCostDialog()

  return (
    <Button
      type="button"
      className="gap-2 flex"
      onClick={() => setIsOpen(true)}
      data-slot="indirect-cost-create-dialog-trigger"
    >
      <Plus />
      Agregar Costo Indirecto
    </Button>
  )
}

export default CreateIndirectCostTrigger;
