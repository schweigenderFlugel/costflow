import GenericDataTable from "@/components/shared/data-table/generic-data-table";
import columns from "@/components/indirect-cost/columns";
import { indirectCostMock } from "@/components/indirect-cost/indirect-cost-mock";
import { IndirectCostObj } from "@/types/items/indirect-cost";
import { use } from "react";


const IndirectCost = ({ className, getData }: { className?: string, getData: Promise<IndirectCostObj[]> }) => {
  const data: IndirectCostObj[] | { error?: string, detail?: string } = use<IndirectCostObj[]>(getData)

  return (
    <section className={className}>
      {('error' in data || 'detail' in data) ? (
        <div className="flex sm:flex-row flex-col justify-between place-items-start sm:items-center px-5 py-3 border rounded-md bg-muted/80">
          <p className="text-red-400">Mensaje del servidor: {
            new String('error' in data ? data.error : 'detail' in data ? data.detail : '')
          }</p>
          <p className="text-xs text-muted-foreground">Usando datos de prueba</p>
        </div>
      ) : null}
      <GenericDataTable<IndirectCostObj>
        columnsTo={"indirect_cost"}
        initialData={!('error' in data || 'detail' in data) ? data : indirectCostMock}
        columns={columns}
      />
    </section>
  )
}


export default IndirectCost
