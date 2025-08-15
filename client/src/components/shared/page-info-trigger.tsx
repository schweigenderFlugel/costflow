"use client"
import { Button } from "@/components/ui/button";
import { usePageInfoDialog } from "@/hooks/use-page-info-dialog";
import { Info } from "lucide-react";

const PageInfoTrigger = () => {
  const { open } = usePageInfoDialog()

  return (<Button
    type="button"
    variant={"ghost"}
    title="Información sobre página"
    className="cursor-pointer"
    data-slot="page-info-dialog-trigger"
    onClick={open}
  >
    <Info className="size-full" />
  </Button>)
}

export default PageInfoTrigger;
