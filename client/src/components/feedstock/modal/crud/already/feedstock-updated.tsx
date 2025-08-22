import DetailFeedstock from "@/components/feedstock/modal/crud/detail-feedstock";
import { Button } from "@/components/ui/button";
import { Feedstock, ObjFeedstock } from "@/types/items/feedstock";
import { ClipboardCheck } from "lucide-react";

interface AlreadyFeedstockProps {
  feedstock: ObjFeedstock | Feedstock | null;
  handleClose: () => void;
  handleReturn: () => void;
}

const FeedstockUpdated = ({ feedstock, handleClose, handleReturn }: AlreadyFeedstockProps) => {

  return (
    <div className="flex flex-col gap-6 my-auto">
      <div className="flex items-center flex-col gap-1 text-center">
        <ClipboardCheck className="size-24 text-muted-foreground" />
        <p className="text-lg font-semibold">Cambios guardados</p>
        <p className="text-md text-muted-foreground">
          La información del insumo se actualizó correctamente.
        </p>
      </div>

      <DetailFeedstock feedstock={feedstock} />

      <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
        <Button onClick={handleClose} variant="outline" className="cursor-pointer rounded-xs">Cerrar</Button>
        <Button onClick={handleReturn} variant="default" className="cursor-pointer rounded-xs">
          Volver a editar
        </Button>
      </div>
    </div>
  )
}

export default FeedstockUpdated
