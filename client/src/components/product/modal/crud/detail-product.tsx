import { cn } from "@/lib/utils";
import { ObjProduct, Product } from "@/types/items/product";
import { translateMeasureUnit } from "@/utils/translate/shared-translate";


const DetailProduct = ({ product }: { product: ObjProduct | Product | null }) => {

  if (product == null) return null;
  const hasFeedstocks = Array.isArray(product.feedstocks)

  return (
    <div className={cn(
      hasFeedstocks ? "my-12" : "my-0",
      "p-4 sm:p-6 bg-muted/70 rounded-xs text-muted-foreground"
    )}>
      <h3 className="text-base font-medium">Detalles del producto:</h3>

      <div className={cn(hasFeedstocks ? "md:grid-cols-2" : "",
        "grid grid-cols-1 gap-4 md:gap-8 mt-3"
      )}>

        <div className="space-y-2">

          <div className="flex justify-between items-center">
            <h4 className="text-sm">SKU:</h4>
            <span className="text-sm font-medium text-foreground uppercase truncate pl-2" title={product.sku}>{product.sku}</span>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-sm">Nombre:</h4>
            <span className="text-sm font-medium text-foreground uppercase truncate pl-2" title={product.name}>{product.name}</span>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-sm">Cantidad:</h4>
            <span className="text-sm font-medium text-foreground">{product.quantity} {translateMeasureUnit(product.measure_unit)}</span>
          </div>


          <div>
            <h4 className="text-sm">Descripción:</h4>
            <p className="text-sm font-medium text-foreground p-3 bg-background border border-input/80 rounded">
              {product.description || "No especificada"}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <h4 className="text-sm">Fecha de creación:</h4>
            <span className="text-sm font-medium text-foreground">
              {
                'created_at' in product ?
                  new Date(product.created_at).toLocaleDateString()
                  : new Date().toLocaleDateString()
              }
            </span>
          </div>
          {
            'created_at' in product &&
              (product.created_at === product.updated_at) ?
              <div className="flex justify-between items-center">
                <h4 className="text-sm">Fecha de modificación:</h4>
                <span className="text-sm font-medium text-foreground">
                  {
                    new Date(product.updated_at).toLocaleDateString()
                  }
                </span>
              </div>
              : ""
          }
          <div className="flex justify-between items-center">
            <h4 className="text-sm">Agregado en la fecha:</h4>
            <span className="text-sm font-medium text-foreground">
              {
                'created_at' in product ?
                  new Date(product.created_at).toLocaleDateString()
                  : new Date().toLocaleDateString()
              }
            </span>
          </div>


        </div>

        {
          hasFeedstocks && (
            <div className="space-y-1">
              <h4 className="text-base font-bold">Insumos necesarios:</h4>

              <div className="space-y-2 px-5 py-3 border-input/80 rounded overflow-y-auto bg-background">

                <div className="flex justify-between text-xs">
                  <h3>Nombre</h3>
                  <h3>Cantidad</h3>
                </div>

                <ol className="space-y-2 list-decimal text-xs text-foreground">
                  {
                    product.feedstocks?.map((feedstock) => (
                      <li key={'feedstock_id' in feedstock ? feedstock.feedstock_id : feedstock.id}>
                        <div className="flex justify-between items-center text-sm">
                          <h5> {'name' in feedstock && feedstock.name}</h5>
                          <h5> {feedstock.quantity_required}</h5>
                        </div>
                      </li>
                    ))
                  }
                </ol>

              </div>

            </div>
          )
        }

      </div>

    </div >
  )
}

export default DetailProduct
