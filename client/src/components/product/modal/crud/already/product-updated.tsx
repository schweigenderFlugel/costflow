import DetailProduct from "@/components/product/modal/crud/detail-product";
import { Button } from "@/components/ui/button";
import { ObjProduct, Product } from "@/types/items/product";
import { FormDataProduct } from "@/schemas/product-schema";
import { ClipboardCheck } from "lucide-react";

interface AlreadyUpdatedProps {
  product: ObjProduct | Product | FormDataProduct | null;
  handleClose: () => void;
  handleReturn: () => void;
}

const ProductUpdated = ({ product, handleClose, handleReturn }: AlreadyUpdatedProps) => {

  return (
    <div className="flex flex-col gap-6 my-auto px-0 sm:px-6">
      <div className="flex items-center flex-col gap-1">
        <ClipboardCheck className="size-24 text-muted-foreground" />
        <p className="text-lg font-semibold text-center">Cambios guardados</p>
        <p className="text-md text-muted-foreground">
          La información del producto se actualizó correctamente.
        </p>
      </div>
      <DetailProduct product={product} />

      <div className="grid grid-cols-2 gap-4 w-full mt-auto">
        <Button onClick={handleClose} variant="outline" className="cursor-pointer">
          Cerrar
        </Button>
        <Button
          onClick={handleReturn}
          variant="default"
          className="cursor-pointer"
        >
          Editar otra vez
        </Button>
      </div>
    </div>
  )
}

export default ProductUpdated
