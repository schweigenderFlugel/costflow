import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import PageHeaderSection from "@/components/shared/page-header-section"
import { Suspense } from "react"
import PageInfoDialog from "@/components/shared/page-info-dialog"
import IndirectCostTable from "@/components/indirect-cost/indirect-cost-table"
import AddIndirectCost from "@/components/indirect-cost/crud/add-indirect-cost"

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <IndirectCostTable />
          <AddIndirectCost />
        </div>
      </section>

      <Suspense>
        <PageInfoDialog
          heading="¿De qué se trata esta sección?"
          description={<>
            Acá vas a cargar y mantener la lista de <strong>todos los insumos y materia prima</strong> que necesitás para crear tus productos.
          </>}
        >
          <div className="space-y-3">
            <h3 className="font-semibold">Cada insumo tiene su propia “ficha” con información clave:</h3>
            <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
              En proceso chabal
            </ul>
            <p className="text-sm text-muted-foreground">
              Esta sección funciona como tu <strong>inventario digital</strong>: siempre actualizado, centralizado y fácil de consulta
            </p>
            <p className="text-sm text-muted-foreground">
            </p>
          </div>
        </PageInfoDialog>
      </Suspense>
    </main>
  )
}

export default Page
