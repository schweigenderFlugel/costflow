import GenericDataTable from "@/components/data-table/generic-data-table"
import columns from "@/components/feedstock/columns"
import { mockFeedstocks } from "@/components/feedstock/mock-feedstocks"
import { ObjFeedstock } from "@/types/items/feedstock"
import { fetcher } from "@/utils/fetcher"
import { getToken } from "@/utils/get-token"

const getData = async () => {
  const token = await getToken()

  if (!token) {
    return ({ error: "No estas autorizado." })
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/feedstocks`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "force-cache", // Habilitar cache
    next: {
      tags: ["feedstocks"],
      revalidate: 300 // Revalidar cada 5 minutos automáticamente
    }
  });

  if (Array.isArray(data)) {
    return data.reverse()
  }
  return data;
}

const FeedstockTable = async () => {
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
      <GenericDataTable<ObjFeedstock>
        initialData={!(data.detail || data.error) ? data : mockFeedstocks}
        columns={columns}
      />
    </section>
  )
}


export default FeedstockTable

