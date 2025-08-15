import FeedstockTable from "@/components/feedstock/feedstock-table"
import InfoFeedstock from "@/components/feedstock/modal/trigger/info-feedstock-trigger"
import PageHeaderSection from "@/components/shared/page-header-section"
import dynamic from "next/dynamic"

const CreateFeedstock = dynamic(() => import("@/components/feedstock/modal/crud/create-feedstock"))
const UpdateFeedstock = dynamic(() => import("@/components/feedstock/modal/crud/update-feedstock"))
const DeleteFeedstock = dynamic(() => import("@/components/feedstock/modal/crud/delete-feedstock"))
const PageInfoDialog = dynamic(() => import("@/components/shared/page-info-dialog"))


export const metadata = {
  title: "Insumos"
}


const infoList = [
  { heading: "Nombre", description: "Cómo lo identificás (por ejemplo, Ácido clorhídrico 37%, Etanol 96%, Sulfato de cobre pentahidratado)." },
  { heading: "Cantidad y unidad", description: "La cantidad total comprada y su medida (litros, mililitros, gramos, kilogramos, etc.)." },
  { heading: "Moneda", description: "Pesos argentinos o dólares, según la moneda de compra." },
  { heading: "Valor", description: "El precio total o el precio por unidad/medida." },
  { heading: "Fecha de ingreso", description: "El día en que recibiste o registraste la compra." },
]


const Page = () => {


  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Insumos y materia prima"
        description="Cargá y administrá todos los materiales que necesitás para producir. Mantené actualizadas las cantidades, precios y unidades para que el cálculo de costos sea preciso y automático."
        triggerInfo={<InfoFeedstock />}
      />
      <FeedstockTable />
      <CreateFeedstock />
      <UpdateFeedstock />
      <DeleteFeedstock />
      <PageInfoDialog
        heading="¿De qué se trata esta sección?"
        description={<>
          Acá vas a cargar y mantener la lista de <strong>todos los insumos y materia prima</strong> que necesitás para crear tus productos.
        </>}
      >
        <div className="space-y-3">
          <h3 className="font-semibold">Cada insumo tiene su propia “ficha” con información clave:</h3>
          <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
            {infoList.map((item, index) => (
              <li key={index}>
                <strong>{item.heading}:</strong> {item.description}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Esta sección funciona como tu <strong>inventario digital</strong>: siempre actualizado, centralizado y fácil de consulta
          </p>
          <p className="text-sm text-muted-foreground">
            Cuando después crees un producto, vas a elegir de esta lista los insumos que lleva y la cantidad exacta que necesita para esa “receta”. El sistema tomará esos datos y calculará automáticamente el costo final, sumando todo lo que usaste, sin que tengas que hacer las cuentas a mano.
          </p>
        </div>
      </PageInfoDialog>
    </main>
  )
}


export default Page
