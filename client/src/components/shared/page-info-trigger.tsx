"use client"
import { Button } from "@/components/ui/button";
import { usePageInfoDialog } from "@/hooks/use-page-info-dialog";
import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const PageInfoTrigger = ({ className }: { className?: string }) => {
  const { open } = usePageInfoDialog()

  return (<Button
    type="button"
    variant={"ghost"}
    size={"icon"}
    title="Información sobre página"
    className={cn("cursor-pointer", className)}
    data-slot="page-info-dialog-trigger"
    onClick={open}
  >
    <ExclamationCircleIcon className="size-full p-1.5" />
  </Button>)
}

export default PageInfoTrigger;
