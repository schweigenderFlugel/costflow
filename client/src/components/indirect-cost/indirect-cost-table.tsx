import GenericDataTable from "@/components/data-table/generic-data-table";
import columns from "@/components/indirect-cost/columns";
import { indirectCostMock } from "@/components/indirect-cost/indirect-cost-mock";
import { IndirectCostObj } from "@/types/items/indirect-cost";
import { fetcher } from "@/utils/fetcher"

const getIndirectCostData = async () => {
  const data = await fetcher({
    input: `${process.env.SERVER_API}/indirect-costs`
  })
  return data;
}

const IndirectCost = async () => {
  const data = await getIndirectCostData()

  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
      {
        (data.error || data.detail) &&
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">Mensaje del servidor: {data.error || data.detail}</p>
          <p className="text-xs text-muted-foreground">Usando datos de prueba</p>
        </div>
      }
      <div className="max-w-lg mr-auto">
        <GenericDataTable
          <IndirectCostObj>
          columnsTo={"indirect_cost"}
          initialData={!(data.detail || data.error) ? data : indirectCostMock}
          columns={columns}
        />
      </div>
    </section>
  )
}


export default IndirectCost
