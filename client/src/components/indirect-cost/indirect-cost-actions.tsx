import { Button } from "@/components/ui/button";
import { useDeleteIndirectCostDialog, useUpdateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog";
import { IndirectCostObj } from "@/types/items/indirect-cost";
import { Pencil, Trash2 } from "lucide-react";



const IndirectCostActions = ({ indirect_cost }: { indirect_cost: IndirectCostObj }) => {
  const { setIsOpen: setUpdateState, setIndirectCost: setUpdateIndirectCost,
    // setIsLoadingIndirectCost
  } = useUpdateIndirectCostDialog()
  const { setIsOpen: setDeleteState, setIndirectCost: setDeleteIndirectCost } = useDeleteIndirectCostDialog()


  const handleUpdate = () => {
    setUpdateIndirectCost(null)
    setUpdateState(true)
    setUpdateIndirectCost(indirect_cost)
  }

  const handleDelete = () => {
    setDeleteState(true)
    setDeleteIndirectCost(indirect_cost)
  }

  return (
    <div className="flex gap-1">
      <Button
        data-slot="product-update-dialog-trigger"
        onClick={handleUpdate}
        type="button"
        className="text-primary hover:text-primary cursor-pointer"
        variant={"outline-ghost"}
        size={"sm"}
      >
        <Pencil className="size-4" />
      </Button>

      <Button
        data-slot="product-delete-dialog-trigger"
        onClick={handleDelete}
        type="button"
        className="text-red-800 hover:text-red-800 cursor-pointer"
        variant={"outline-ghost"}
        size={"sm"}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}


export default IndirectCostActions;
