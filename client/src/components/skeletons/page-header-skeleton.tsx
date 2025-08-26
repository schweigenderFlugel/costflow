import { Skeleton } from "@/components/ui/skeleton"

const PageHeaderSkeleton = () => {
  return (
    <header className="flex align-middle flex-col justify-start gap-3 max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5">
      <div className="flex items-center align-middle gap-2">
        <Skeleton className="h-9 w-64" /> {/* Title */}
        <Skeleton className="h-6 w-6 rounded block md:hidden" /> {/* Info trigger mobile */}
      </div>

      <div className="flex items-center gap-2 align-middle">
        <Skeleton className="h-6 w-6 rounded hidden md:block" /> {/* Info trigger desktop */}
        <Skeleton className="h-5 w-96" /> {/* Description */}
      </div>
    </header>
  )
}

export default PageHeaderSkeleton
