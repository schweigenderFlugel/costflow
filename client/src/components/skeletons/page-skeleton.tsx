import PageHeaderSkeleton from "@/components/skeletons/page-header-skeleton"
import TableSkeleton from "@/components/skeletons/table-skeleton"

interface PageSkeletonProps {
  type?: "feedstock" | "product"
  rows?: number
}

const PageSkeleton = ({ type = "feedstock", rows = 8 }: PageSkeletonProps) => {
  return (
    <main className="space-y-8 py-10">
      <PageHeaderSkeleton />
      <TableSkeleton type={type} rows={rows} />
    </main>
  )
}

export default PageSkeleton
