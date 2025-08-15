
import GenericDataTable from "@/components/data-table/generic-data-table"
import columns from "@/components/product/columns"
import { mockProducts } from "@/components/product/mock-product"
import { ObjProduct } from "@/types/items/product"

const ProductTable = () => {
  return (
    <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">

      <GenericDataTable
        <ObjProduct>
        columnsTo="product"
        initialData={mockProducts}
        columns={columns}
      />

    </section>
  )
}


export default ProductTable

