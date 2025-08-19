import PageInfoTrigger from "@/components/shared/page-info-trigger"
import { FC } from "react"

type PageHeaderSectionProps = {
  title: string
  description: string
  triggerInfo?: boolean
}


const PageHeaderSection: FC<PageHeaderSectionProps> = ({ title, description, triggerInfo }) => {
  return <header className="flex align-middle flex-col justify-start gap-3 max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5">
    <div className="flex items-center align-middle gap-2">
      <h1 className="font-bold text-3xl">
        {title}
      </h1>
      {triggerInfo && <PageInfoTrigger className="block md:hidden" />}
    </div>

    <div className="flex items-center gap-2 align-middle">
      {triggerInfo && <PageInfoTrigger className="hidden md:block" />}
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  </header>
}


export default PageHeaderSection
