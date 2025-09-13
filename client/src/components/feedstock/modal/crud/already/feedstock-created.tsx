import DetailFeedstock from "@/components/feedstock/modal/crud/detail-feedstock";
import { Button } from "@/components/ui/button";
import { AlreadyFeedstockCreatedProps } from "@/interfaces/interface-already-feedstock-created-props";
import { ClipboardCheck } from "lucide-react";

const FeedstockCreated = ({
  feedstock,
  handleClose,
  handleReturn,
}: AlreadyFeedstockCreatedProps) => {
  return (
    <div className="flex flex-col gap-6 my-auto">
      <div className="flex items-center flex-col gap-1">
        <ClipboardCheck className="size-24 text-muted-foreground" />
        <p className="text-lg font-semibold">Insumo agregado</p>
      </div>

      <DetailFeedstock feedstock={feedstock} />

      <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
        <Button
          onClick={handleClose}
          variant="outline"
          className="cursor-pointer rounded-xs"
        >
          Cerrar
        </Button>
        <Button
          onClick={handleReturn}
          variant="default"
          className="cursor-pointer rounded-xs"
        >
          Agregar otro
        </Button>
      </div>
    </div>
  );
};

export default FeedstockCreated;
