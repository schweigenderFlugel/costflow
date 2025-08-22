import PageHeaderSection from "@/components/shared/page-header-section"
import TableSkeleton from "@/components/skeletons/table-skeleton"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const ProductTable = dynamic(() => import("@/components/product/product-table"), {
  loading: () => <TableSkeleton type="product" />
})

const CreateProduct = dynamic(() => import("@/components/product/modal/crud/create-product"))
const UpdateProduct = dynamic(() => import("@/components/product/modal/crud/update-product"))
const DeleteProduct = dynamic(() => import("@/components/product/modal/crud/delete-product"))
const PageInfoDialog = dynamic(() => import("@/components/shared/page-info-dialog"))


export const metadata = {
  title: "Productos"
}

export const revalidate = false
export const dynamicParams = false

const infoList = [
  { heading: "SKU", description: "Código único de identificación del producto para tu catálogo." },
  { heading: "Nombre", description: "Cómo lo llamás (por ejemplo, Detergente concentrado 1L, Crema facial 50ml)." },
  { heading: "Estado de la materia", description: "Si el producto final es sólido, líquido o gas." },
  { heading: "Unidad de medida", description: "La unidad en que se mide el producto final (gramos, litros, unidades, etc.)." },
  { heading: "Cantidad del producto", description: "Cuánto producto obtenés con esta receta (cantidad que producís)." },
  { heading: "Descripción", description: "Información adicional sobre el producto (opcional)." },
  { heading: "Insumos asociados", description: "Seleccionás de tu lista de insumos los que lleva el producto y definís cuánto necesitás de cada uno." },
]


const Page = () => {


  return (
    <main className="space-y-8 py-10">
      <PageHeaderSection
        title="Productos"
        description="Definí cada producto a partir de su “receta” combinando insumos y costos indirectos. Registrá las cantidades exactas que necesita, y el sistema calculará automáticamente su costo final para que tengas precios claros y precisos."
        triggerInfo
      />
      <ProductTable />

      <Suspense>
        <CreateProduct />
        <UpdateProduct />
        <DeleteProduct />
        <PageInfoDialog
          heading="¿De qué se trata esta sección?"
          description={<>
            Acá vas a crear la ficha de cada producto que fabricás o vendés, asociándolo a los insumos que usa y a la cantidad necesaria de cada uno.
          </>}
        >
          <div className="space-y-3">
            <h3 className="font-semibold">Cada producto tiene su propio &quot;campo&quot; con información clave:</h3>
            <ul className="list-disc space-y-1 text-sm px-6 text-muted-foreground">
              {infoList.map((item, index) => (
                <li key={index}>
                  <strong>{item.heading}:</strong> {item.description}
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground">
              El objetivo es que cada producto quede &quot;<strong>armado</strong>&quot; como una receta: con todos sus componentes y costos listos para el cálculo final.
            </p>
          </div>
        </PageInfoDialog>
      </Suspense>

    </main >
  )
}


export default Page
