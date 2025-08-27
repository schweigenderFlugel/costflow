"use client"
import FeedstockForm from "@/components/feedstock/form/feedstock-form";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { useUpdateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useFeedstockMutations } from "@/hooks/mutations/use-feedstock-mutations";
import FeedstockUpdated from "@/components/feedstock/modal/crud/already/feedstock-updated";


const UpdateFeedstock = () => {
  const { isOpen, setIsOpen, feedstock, setFeedstock } = useUpdateFeedstockDialog()
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [updatedFeedstockData, setUpdatedFeedstockData] = useState<FormDataFeedstock | null>(null)
  const { updateFeedstock } = useFeedstockMutations()

  if (feedstock === null) return;

  const handleUpdate = (values: FormDataFeedstock) => {
    updateFeedstock.mutate(
      { feedstockId: feedstock.id, ...values },
      {
        onSuccess: (data) => {
          setUpdatedFeedstockData(values)
          setAlreadyUpdated(true)
        }
      }
    )
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyUpdated(false)
      setUpdatedFeedstockData(null)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setFeedstock(null)
    setAlreadyUpdated(false)
    setUpdatedFeedstockData(null)
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
                errorMessage={updateFeedstock.error?.message}
                isPending={updateFeedstock.isPending}
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
