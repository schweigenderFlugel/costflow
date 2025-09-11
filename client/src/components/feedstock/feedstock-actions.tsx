"use client";
import { Button } from "@/components/ui/button";
import {
  useDeleteFeedstockDialog,
  useUpdateFeedstockDialog,
} from "@/hooks/use-feedstock-dialog";
import { ObjFeedstock } from "@/interfaces/interface-obj-feedstock";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const FeedstockActions = ({ feedstock }: { feedstock: ObjFeedstock }) => {
  const { setIsOpen: setUpdateState, setFeedstock: setUpdateFeedstock } =
    useUpdateFeedstockDialog();
  const { setIsOpen: setDeleteState, setFeedstock: setDeleteFeedstock } =
    useDeleteFeedstockDialog();

  const handleDelete = () => {
    setDeleteState(true);
    setDeleteFeedstock(feedstock);
  };
  const handleUpdate = () => {
    setUpdateState(true);
    setUpdateFeedstock(feedstock);
  };

  return (
    <div className="flex gap-0.5 justify-center">
      <Button
        data-slot="feedstock-update-dialog-trigger"
        onClick={handleUpdate}
        type="button"
        className="text-primary hover:text-primary cursor-pointer"
        variant={"ghost"}
        size={"icon"}
      >
        <PencilIcon className="size-5" />
      </Button>

      <Button
        data-slot="feedstock-delete-dialog-trigger"
        onClick={handleDelete}
        type="button"
        className="text-red-800 hover:text-red-800 cursor-pointer"
        variant={"ghost"}
        size={"icon"}
      >
        <TrashIcon className="size-5" />
      </Button>
    </div>
  );
};

export default FeedstockActions;
