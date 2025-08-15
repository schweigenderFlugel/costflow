"use client"
import { Button } from "@/components/ui/button";
import { usePageInfoDialog } from "@/hooks/use-page-info-dialog";
import { Info } from "lucide-react";

const InfoFeedstock = () => {
  const { open } = usePageInfoDialog()

  return (<Button
    type="button"
    variant={"ghost"}
    title="Información sobre insumos"
    className="cursor-pointer"
    data-slot="feedstock-info-dialog-trigger"
    onClick={open}
  >
    <Info className="size-full" />
  </Button>)
}

export default InfoFeedstock;
