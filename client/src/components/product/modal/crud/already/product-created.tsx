import DetailProduct from "@/components/product/modal/crud/detail-product";
import { Button } from "@/components/ui/button";
import { ObjProduct, Product } from "@/types/items/product";
import { ClipboardCheck } from "lucide-react";

interface AlreadyCreatedProps {
  product: ObjProduct | Product | null;
  handleClose: () => void;
  handleReturn: () => void;
}

const ProductCreated = ({ product, handleClose, handleReturn }: AlreadyCreatedProps) => {

  return (
    <div className="flex flex-col gap-6 my-auto">
      <div className="flex items-center flex-col gap-1">
        <ClipboardCheck className="size-24 text-muted-foreground" />
        <p className="text-lg font-semibold">Producto agregado</p>
      </div>

      <DetailProduct product={product} />

      <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
        <Button
          onClick={handleClose} variant="outline"
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
  )
}

export default ProductCreated
