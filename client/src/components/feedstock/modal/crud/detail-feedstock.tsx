import { Feedstock, ObjFeedstock } from "@/types/items/feedstock";
import { translateMeasureUnit } from "@/utils/translate/items-translate";


const DetailFeedstock = ({ feedstock }: { feedstock: ObjFeedstock | Feedstock | null }) => {

  if (feedstock == null) return null;

  return (
    <div className="p-4 w-full mx-auto bg-muted/60 rounded-xs text-muted-foreground">
      <h4 className="text-base font-medium">Detalles del insumo:</h4>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Nombre:</span>
          <span className="text-sm font-medium text-foreground">{feedstock.name}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Proveedor:</span>
          <span className="text-sm font-medium text-foreground">
            {feedstock.provider || "No especificado"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Costo unitario:</span>
          <span className="text-sm font-medium text-foreground">
            {
              (new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: feedstock.currency,
              }).format(feedstock.unit_cost))
            }
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Unidad de medida:</span>
          <span className="text-sm font-medium text-foreground">
            {translateMeasureUnit(feedstock.measure_unit)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Agregado en la fecha:</span>
          <span className="text-sm font-medium text-foreground">
            {
              'created_at' in feedstock ?
                new Date(feedstock.created_at).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
          </span>
        </div>


      </div>
    </div>
  )
}

export default DetailFeedstock
