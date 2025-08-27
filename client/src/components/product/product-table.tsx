
import GenericDataTable from "@/components/data-table/generic-data-table"
import columns from "@/components/product/columns"
import { mockProducts } from "@/components/product/mock-product"
import { ObjProduct } from "@/types/items/product"
import { fetcher } from "@/utils/fetcher"
import { getToken } from "@/utils/get-token"

const getData = async () => {
  const token = await getToken()

  if (!token) {
    return ({ error: "No estas autorizado." })
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/products`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "force-cache", // Habilitar cache
    next: {
      tags: ["products"],
      revalidate: 300 // Revalidar cada 5 minutos automáticamente
    }
  });

  if (Array.isArray(data)) {
    return data.reverse()
  }
  return data;
}

const ProductTable = async () => {
  const data = await getData()
  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
      {
        (data.error || data.detail) &&
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">Mensaje del servidor: {data.error || data.detail}</p>
          <p className="text-xs text-muted-foreground">Usando datos de prueba</p>
        </div>
      }

      <GenericDataTable<ObjProduct>
        columnsTo="product"
        initialData={!(data.detail || data.error) ? data : mockProducts}
        columns={columns}
      />

    </section>
  )
}


export default ProductTable

