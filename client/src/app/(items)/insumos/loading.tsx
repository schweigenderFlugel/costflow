import PageSkeleton from "@/components/skeletons/page-skeleton"

export const metadata = {
  title: "Cargando..."
}

export default function Loading() {
  return <PageSkeleton type="feedstock" />
}
