"use client"
import FeedstockForm from "@/components/feedstock/form/form-feedstock";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { fetcher } from "@/utils/fetcher";
import { ClipboardCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";


const UpdateFeedstock = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useUpdateFeedstockDialog()
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const { toggle: tableToggle } = useUpdateDataTable("feedstock")

  if (feedstock === null) return;

  const handleUpdate = async (values: FormDataFeedstock) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/feedstock/${feedstock.id}`, method: "PUT", body: JSON.stringify(values) })
      if (data.error) setErrorMessage(data.errro)
      else {
        setAlreadyUpdated(true)
        toast(data.description || data.message)
        tableToggle()
      }
    })
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyUpdated(false)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setFeedstock(null)
    setAlreadyUpdated(false)
  }


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[calc(100svw-3rem)] sm md:max-w-[calc(100%-6rem)] sm:min-w-[330px] sm:w-3/4 md:w-2xl overflow-y-auto max-h-[80svh] p-6 gap-8">

        <DialogHeader className={alreadyUpdated ? "sr-only" : ""}>
          <DialogTitle>Editar insumo</DialogTitle>
          <DialogDescription className="text-left">
            Actualizá la información de un insumo ya cargado, modificando su nombre, cantidad, valor o cualquier otro dato relevante para mantener tus registros siempre correctos y actualizados.
          </DialogDescription>
        </DialogHeader>

        {
          alreadyUpdated
            ?
            <div className="flex flex-col items-center justify-between gap-5 my-5">
              <ClipboardCheck className="size-24 text-muted-foreground" />
              <p className="text-lg font-semibold text-center">
                Cambios guardados
              </p>
              <p className="text-md text-muted-foreground">
                La información del insumo se actualizó correctamente.
              </p>
              <Button onClick={handleClose} variant="outline" className="w-3/4"       >
                Cerrar
              </Button>
            </div>
            :
            <>
              <FeedstockForm
                formId="update-feedstock-form"
                defaultValues={feedstock}
                onSubmit={handleUpdate}
              />

              <FormFeedstockFooter
                errorMessage={errorMessage}
                isPending={isPending}
                submitLabel="Guardar cambios"
                submitingLabel="Actualizando..."
                formId="update-feedstock-form"
                onClose={handleClose}
              />
            </>
        }
      </DialogContent>
    </Dialog>

  );
}

export default UpdateFeedstock
