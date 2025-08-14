import { FC } from "react"

type PageHeaderSectionProps = {
  title: string
  description: string
  triggerInfo?: React.ReactNode
}


const PageHeaderSection: FC<PageHeaderSectionProps> = ({ title, description, triggerInfo }) => {
  return <header className="flex align-middle flex-col justify-start gap-3 max-w-5xl mx-auto px-5">
    <h1 className="font-bold text-3xl">
      {title}
    </h1>

    <div className="flex items-center gap-2 align-middle">
      {triggerInfo}
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  </header>
}


export default PageHeaderSection
