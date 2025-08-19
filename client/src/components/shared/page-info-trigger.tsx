"use client"
import { Button } from "@/components/ui/button";
import { usePageInfoDialog } from "@/hooks/use-page-info-dialog";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const PageInfoTrigger = ({ className }: { className?: string }) => {
  const { open } = usePageInfoDialog()

  return (<Button
    type="button"
    variant={"ghost"}
    title="Información sobre página"
    className={cn("cursor-pointer", className)}
    data-slot="page-info-dialog-trigger"
    onClick={open}
  >
    <Info className="size-full" />
  </Button>)
}

export default PageInfoTrigger;
