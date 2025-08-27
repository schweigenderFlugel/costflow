"use client"
import FeedstockForm from "@/components/feedstock/form/feedstock-form";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { useUpdateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { itemToasts } from "@/components/item-toasts";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState, useTransition } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useInvalidateQuery } from "@/hooks/use-invalidate-query";
import FeedstockUpdated from "@/components/feedstock/modal/crud/already/feedstock-updated";


const UpdateFeedstock = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useUpdateFeedstockDialog()
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [updatedFeedstockData, setUpdatedFeedstockData] = useState<FormDataFeedstock | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const { invalidateData } = useInvalidateQuery()

  // Limpiar mensaje de error cuando se actualiza exitosamente
  useEffect(() => {
    if (errorMessage && alreadyUpdated) {
      setErrorMessage(undefined)
    }
  }, [alreadyUpdated, errorMessage])

  if (feedstock === null) return;

  const handleUpdate = async (values: FormDataFeedstock) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/feedstock/${feedstock.id}`, method: "PUT", body: JSON.stringify(values) })

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage = data.detail || data.error || data.description || data.message
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map(detail => detail.msg)).join(". \n")
        }
        console.error(data)
        setErrorMessage(posibleMessage)
      }
      else {
        setUpdatedFeedstockData(values)
        setAlreadyUpdated(true)
        itemToasts.updateSuccess({ description: data.name })
        invalidateData("feedstock")
      }
    })
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyUpdated(false)
      setUpdatedFeedstockData(null)
      setErrorMessage(undefined)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setFeedstock(null)
    setAlreadyUpdated(false)
    setUpdatedFeedstockData(null)
    setErrorMessage(undefined)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-10 justify-start">

        <SheetHeader className={alreadyUpdated ? "sr-only" : " p-0"}>
          <SheetTitle className="text-xl">Editar insumo</SheetTitle>
          <SheetDescription className="text-left">
            Actualizá la información de un insumo ya cargado, modificando su nombre, cantidad, valor o cualquier otro dato relevante para mantener tus registros siempre correctos y actualizados.
          </SheetDescription>
        </SheetHeader>

        {
          alreadyUpdated
            ?
            <FeedstockUpdated
              feedstock={updatedFeedstockData || feedstock}
              handleClose={handleClose}
              handleReturn={() => setAlreadyUpdated(false)}
            />
            :
            <>
              <FeedstockForm
                formId="update-feedstock-form"
                defaultValues={updatedFeedstockData || feedstock}
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
