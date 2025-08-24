import PageHeaderSection from "@/components/shared/page-header-section"
import { Suspense } from "react"
import PageInfoDialog from "@/components/shared/page-info-dialog"
import IndirectCostTable from "@/components/indirect-cost/indirect-cost-table"
import AddIndirectCost from "@/components/indirect-cost/crud/add-indirect-cost"
import UpdateIndirectCost from "@/components/indirect-cost/crud/update-indirect-cost"
import DeleteIndirectCost from "@/components/indirect-cost/crud/delete-indirect-cost"

export const metadata = {
  title: "Configuración"
}

const Page = () => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Configuración de Costos"
        description="Ajustá los parámetros generales de tu producto. Estos valores se aplican automáticamente en los cálculos de costos de todos tus productos."
        triggerInfo
      />
      <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          <IndirectCostTable className="col-span-7" />
          <div className="space-y-6 col-span-5">
            <AddIndirectCost />
          </div>
        </div>
      </section>



      <Suspense>
        <UpdateIndirectCost />
        <DeleteIndirectCost />
        <PageInfoDialog
          heading="¿De qué se trata esta sección?"
          description={<>En esta sección podés gestionar los <strong>{(" ")}costos indirectos</strong> de tus productos. </>

          }
        >
          <div className="space-y-5 pb-2">
            <h3 className="font-semibold">¿Qué son los costos indirectos?</h3>

            <ul className="list-disc space-y-5 text-sm px-6 text-muted-foreground">
              <li>Los costos indirectos son aquellos que no se pueden atribuir directamente a un producto específico, pero que son necesarios para su producción.</li>
              <li>Estos costos pueden incluir gastos generales, como alquiler, servicios públicos y salarios del personal que no está directamente involucrado en la producción.</li>
            </ul>
          </div>
        </PageInfoDialog>
      </Suspense>
    </main>
  )
}

export default Page
