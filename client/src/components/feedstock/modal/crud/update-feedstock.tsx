"use client"
import FeedstockForm from "@/components/feedstock/form/form-feedstock";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Button } from "@/components/ui/button";
import { useUpdateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { itemToasts } from "@/components/item-toasts";
import { fetcher } from "@/utils/fetcher";
import { ClipboardCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import DetailFeedstock from "@/components/feedstock/modal/crud/detail-feedstock";


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

      // (aún) no existe una estructura clara de error como respuesta
      if (!data.message?.includes("successfully")) {
        let posibleMessage = data.description || data.message || data.detail
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map(detail => detail.msg)).join(". \n")
        }
        setErrorMessage(posibleMessage)
      }
      else {
        setAlreadyUpdated(true)
        itemToasts.updateSuccess({ description: data.name })
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
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-auto py-6 px-4 gap-10 justify-start">

        <SheetHeader className={alreadyUpdated ? "sr-only" : " p-0"}>
          <SheetTitle className="text-xl">Editar insumo</SheetTitle>
          <SheetDescription className="text-left">
            Actualizá la información de un insumo ya cargado, modificando su nombre, cantidad, valor o cualquier otro dato relevante para mantener tus registros siempre correctos y actualizados.
          </SheetDescription>
        </SheetHeader>

        {
          alreadyUpdated
            ?
            <div className="flex flex-col gap-6 my-auto">

              <div className="flex items-center flex-col gap-1 text-center">
                <ClipboardCheck className="size-24 text-muted-foreground" />
                <p className="text-lg font-semibold">Cambios guardados</p>
                <p className="text-md text-muted-foreground">
                  La información del insumo se actualizó correctamente.
                </p>
              </div>

              <DetailFeedstock feedstock={feedstock} />

              <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
                <Button onClick={handleClose} variant="outline" className="cursor-pointer rounded-xs">Cerrar</Button>
                <Button onClick={() => setAlreadyUpdated(false)} variant="default" className="cursor-pointer rounded-xs">
                  Volver a editar
                </Button>
              </div>
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
      </SheetContent>
    </Sheet>

  );
}

export default UpdateFeedstock
