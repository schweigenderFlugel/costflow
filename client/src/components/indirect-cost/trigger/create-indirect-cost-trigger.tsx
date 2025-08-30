import { Button } from "@/components/ui/button"
import { useCreateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog"
import { PlusIcon } from "@heroicons/react/24/outline"


const CreateIndirectCostTrigger = () => {
  const { setIsOpen } = useCreateIndirectCostDialog()

  return (
    <Button
      type="button"
      className="gap-2 flex"
      onClick={() => setIsOpen(true)}
      data-slot="indirect-cost-create-dialog-trigger"
    >
      <PlusIcon className="size-5" />
      Agregar Costo Indirecto
    </Button>
  )
}

export default CreateIndirectCostTrigger;
