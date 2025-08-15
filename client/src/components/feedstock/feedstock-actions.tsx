"use client"
import { Button } from "@/components/ui/button"
import { useDeleteFeedstockDialog, useUpdateFeedstockDialog } from "@/hooks/use-feedstock-dialog"
import { ObjFeedstock } from "@/types/items/feedstock"
import { Trash2, Pencil } from "lucide-react"

const FeedstockActions = ({ feedstock }: { feedstock: ObjFeedstock }) => {
  const { setIsOpen: setUpdateState, setFeedstock: setUpdateFeedstock } = useUpdateFeedstockDialog()
  const { setIsOpen: setDeleteState, setFeedstock: setDeleteFeedstock } = useDeleteFeedstockDialog()

  const handleDelete = () => {
    setDeleteState(true)
    setDeleteFeedstock(feedstock)
    console.log("Delete feedstock", feedstock.id)
  }
  const handleUpdate = () => {
    setUpdateState(true)
    setUpdateFeedstock(feedstock)
    console.log("Update feedstock", feedstock.id)
  }


  return (<div className="flex gap-1 px-1">
    <Button
      data-slot="feedstock-update-dialog-trigger"
      onClick={handleUpdate}
      type="button"
      className="text-primary hover:text-primary cursor-pointer"
      variant={"ghost"}
    >
      <Pencil className="size-4" />
    </Button>

    <Button
      data-slot="feedstock-delete-dialog-trigger"
      onClick={handleDelete}
      type="button"
      className="text-red-800 hover:text-red-800 cursor-pointer"
      variant={"ghost"}
    >
      <Trash2 className="size-4" />
    </Button>
  </div>)
}

export default FeedstockActions
