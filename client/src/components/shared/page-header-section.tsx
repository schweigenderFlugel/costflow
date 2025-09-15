import PageInfoTrigger from "@/components/shared/page-info-trigger";
import { FC } from "react";
import type { PageHeaderSectionProps } from "@/types/page-header-section/type-page-header-section";

const PageHeaderSection: FC<PageHeaderSectionProps> = ({
  title,
  description,
  triggerInfo,
  children,
}) => {
  return (
    <header className="flex align-middle flex-col justify-start gap-3 max-w-[calc(100svw-2rem)] w-6xl mx-auto px-1 sm:px-5 relative">
      <div className="flex items-center align-middle gap-1">
        <h1 className="font-bold text-3xl">{title}</h1>
        {triggerInfo && <PageInfoTrigger className="block md:hidden" />}
      </div>

      <div className="flex items-center gap-1 align-middle">
        {triggerInfo && <PageInfoTrigger className="hidden md:block" />}
        <p className="text-base text-muted-foreground">{description}</p>
      </div>

      {children}
    </header>
  );
};

export default PageHeaderSection;
