"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePageInfoDialog } from "@/hooks/use-page-info-dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";


const PageInfoDialog = ({ heading, description, children }: {
  heading: string,
  description?: string | ReactNode,
  children: ReactNode
}) => {
  const { isOpen, setIsOpen } = usePageInfoDialog()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} data-slot="page-info-dialog">
      <DialogContent className="max-w-[calc(100svw-3rem)] sm md:max-w-[calc(100%-6rem)] sm:min-w-[330px] sm:w-3/4 md:w-2xl overflow-y-auto max-h-[80svh] p-6 py-8 gap-8">
        <DialogHeader>
          <DialogTitle className="text-left">{heading}</DialogTitle>
          <DialogDescription className={cn("text-left text-sm text-muted-foreground", !description && "sr-only")}>
            {description ?? "Dialog para mostrar información de la página"}
          </DialogDescription>
        </DialogHeader>

        {children}

      </DialogContent>
    </Dialog>
  )
}

export default PageInfoDialog;
