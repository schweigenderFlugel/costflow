import { Feedstock, ObjFeedstock } from "@/types/items/feedstock";
import { translateMeasureUnit, translateStateMatter } from "@/utils/translate/shared-translate";


const DetailFeedstock = ({ feedstock }: { feedstock: ObjFeedstock | Feedstock | null }) => {

  if (feedstock == null) return null;

  return (
    <div className="p-4 mb-12 bg-muted/60 rounded-xs text-muted-foreground">
      <h4 className="text-base font-medium">Detalles del insumo:</h4>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm">SKU:</h3>
          <span className="text-sm font-medium text-foreground text-truncate pl-2" title={feedstock.sku}>{feedstock.sku}</span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm">Nombre:</h3>
          <span className="text-sm font-medium text-foreground text-truncate pl-2" title={feedstock.name}>{feedstock.name}</span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm">Proveedor:</h3>
          <span className="text-sm font-medium text-foreground text-truncate pl-2" title={feedstock.provider} >
            {feedstock.provider || "No especificado"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm">Costo unitario:</h3>
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
          <h3 className="text-sm">Estado:</h3>
          <span className="text-sm font-medium text-foreground">
            {translateStateMatter(feedstock.state)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm">Unidad de medida:</h3>
          <span className="text-sm font-medium text-foreground">
            {translateMeasureUnit(feedstock.measure_unit)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-sm">Fecha de creación:</h3>
          <span className="text-sm font-medium text-foreground">
            {
              'date' in feedstock ?
                new Date(feedstock.date).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
          </span>
        </div>

      </div>
    </div >
  )
}

export default DetailFeedstock
