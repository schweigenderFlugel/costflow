
import GenericDataTable from "@/components/data-table/generic-data-table"
import columns from "@/components/feedstock/columns"
import { mockFeedstocks } from "@/components/feedstock/mock-feedstocks"
import { ObjFeedstock } from "@/types/items/feedstock"


const FeedstockTable = () => {
  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">

      <GenericDataTable
        <ObjFeedstock>
        initialData={mockFeedstocks}
        columns={columns}
      />

    </section>
  )
}


export default FeedstockTable

