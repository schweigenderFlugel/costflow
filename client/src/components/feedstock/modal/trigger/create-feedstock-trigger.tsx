"use client"

import { Button } from "@/components/ui/button"
import { useCreateFeedstockDialog } from "@/hooks/use-feedstock-dialog"
import { PlusIcon } from "@heroicons/react/24/outline"


const CreateFeedstockTrigger = ({ variant }: { variant?: "not-default" | "default" | "outline" }) => {
  const { setIsOpen } = useCreateFeedstockDialog()

  return (
    <Button
      type="button"
      className="gap-2 flex"
      onClick={() => setIsOpen(true)}
      data-slot="feedstock-create-dialog-trigger"
      variant={variant}
    >
      <PlusIcon className="size-5" />
      Agregar insumo
    </Button >
  )
}

export default CreateFeedstockTrigger;
