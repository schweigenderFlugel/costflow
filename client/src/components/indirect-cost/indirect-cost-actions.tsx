import { Button } from "@/components/ui/button";
import {
  useDeleteIndirectCostDialog,
  useUpdateIndirectCostDialog,
} from "@/hooks/use-indirect-cost-dialog";
import { IndirectCostObj } from "@/interfaces/interface-indirect-costs";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const IndirectCostActions = ({
  indirect_cost,
}: {
  indirect_cost: IndirectCostObj;
}) => {
  const {
    setIsOpen: setUpdateState,
    setIndirectCost: setUpdateIndirectCost,
    // setIsLoadingIndirectCost
  } = useUpdateIndirectCostDialog();
  const { setIsOpen: setDeleteState, setIndirectCost: setDeleteIndirectCost } =
    useDeleteIndirectCostDialog();

  const handleUpdate = () => {
    setUpdateIndirectCost(null);
    setUpdateState(true);
    setUpdateIndirectCost(indirect_cost);
  };

  const handleDelete = () => {
    setDeleteState(true);
    setDeleteIndirectCost(indirect_cost);
  };

  return (
    <div className="flex gap-0.5 justify-center">
      <Button
        data-slot="product-update-dialog-trigger"
        onClick={handleUpdate}
        type="button"
        className="text-primary hover:text-primary cursor-pointer"
        variant={"outline-ghost"}
        size={"icon"}
      >
        <PencilIcon className="size-5" />
      </Button>

      <Button
        data-slot="product-delete-dialog-trigger"
        onClick={handleDelete}
        type="button"
        className="text-red-800 hover:text-red-800 cursor-pointer"
        variant={"outline-ghost"}
        size={"icon"}
      >
        <TrashIcon className="size-5" />
      </Button>
    </div>
  );
};

export default IndirectCostActions;
