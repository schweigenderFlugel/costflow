const ContentLoadingSkeleton = () => (
  <section className="max-w-[calc(100svw-2rem)] w-6xl mx-auto my-8 px-1 sm:px-5">
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  </section>
)

export default ContentLoadingSkeleton
