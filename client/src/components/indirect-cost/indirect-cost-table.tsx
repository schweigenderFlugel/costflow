import GenericDataTable from "@/components/shared/data-table/generic-data-table";
import columns from "@/components/indirect-cost/columns";
import { indirectCostMock } from "@/components/indirect-cost/indirect-cost-mock";
import { IndirectCostObj } from "@/types/items/indirect-cost";
import { fetcher } from "@/utils/fetcher"
import { getToken } from "@/utils/get-token";

const getIndirectCostData = async () => {
  const token = await getToken()
  if (!token) {
    return ({ error: "No estas autorizado." })
  }
  const data = await fetcher({
    input: `${process.env.SERVER_API}/indirect-costs`,
    cache: "force-cache", // Habilitar cache
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    next: {
      tags: ["indirect-costs"],
      revalidate: 300 // Revalidar cada 5 minutos automáticamente
    },
  })
  if (Array.isArray(data)) {
    return data.reverse()
  }
  return data;
}

const IndirectCost = async ({ className }: { className: string }) => {
  const data = await getIndirectCostData()

  return (
    <section className={className}>
      {
        (data.error || data.detail) &&
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">Mensaje del servidor: {data.error || data.detail}</p>
          <p className="text-xs text-muted-foreground">Usando datos de prueba</p>
        </div>
      }
      <GenericDataTable
        <IndirectCostObj>
        columnsTo={"indirect_cost"}
        initialData={!(data.detail || data.error) ? data : indirectCostMock}
        columns={columns}
      />
    </section>
  )
}


export default IndirectCost
