
import DataTable from "@/components/data-table/data-table"
import columns from "@/components/feedstock/columns"
import { mockFeedstocks } from "@/components/feedstock/mock-feedstocks"


const FeedstockTable = () => {
  return (
    <section className="max-w-5xl mx-auto py-10 px-5">

      <DataTable
        initialData={mockFeedstocks}
        columns={columns}
      />

    </section>
  )
}


export default FeedstockTable

