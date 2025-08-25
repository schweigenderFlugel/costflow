import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Link as LinkIcon } from "lucide-react"
import Image from "next/image"
import PageHeaderSection from "@/components/shared/page-header-section"
import { Suspense } from "react"
import PageInfoDialog from "@/components/shared/page-info-dialog"

export const metadata = {
  title: "Calculadora"
}

const Page = () => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Cálculos y presupuestos"
        description="Creá tus presupuestos añadiendo productos, insumos y costos adicionales a la calculadora. Descargá el presupuesto en formato .pdf para enviarle a tus clientes."
        triggerInfo
      />


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


      <Image
        src={"https://media.tenor.com/y-XNYFHZLgQAAAAM/homer-simpson.gif"}
        alt="homer-simpson"
        width={220}
        height={165}
        className="mx-auto"
        unoptimized
      />

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          Página en desarollo
        </h1>
        <p className="text-center text-muted-foreground">
          Esta página está en construcción. Por favor, vuelve más tarde.
        </p>
        <Link href="/"
          className={buttonVariants({ variant: "outline" })}
        >
          <LinkIcon />
          Volver a la página principal
        </Link>
      </div>
    </main>
  )
}

export default Page
