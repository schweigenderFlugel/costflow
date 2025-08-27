"use client"
import FeedstockForm from "@/components/feedstock/form/feedstock-form";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { useCreateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { itemToasts } from "@/components/item-toasts";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState, useTransition } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Feedstock } from "@/types/items/feedstock";
import { useInvalidateQuery } from "@/hooks/use-invalidate-query";
import FeedstockCreated from "@/components/feedstock/modal/crud/already/feedstock-created";


const CreateFeedstock = () => {
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false)
  const [currentFeedstock, setCurrentFeedstock] = useState<null | Feedstock>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { isOpen, setIsOpen, close } = useCreateFeedstockDialog()
  const [isPending, startTransition] = useTransition()
  const { invalidateData } = useInvalidateQuery()

  const handleCreate = async (values: FormDataFeedstock) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/feedstock`, method: "POST", body: JSON.stringify(values) })

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage = data.detail || data.error || data.description || data.message
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map(detail => detail.msg)).join(". \n")
        }
        console.error(data)
        setErrorMessage(posibleMessage)
      }
      else {
        setCurrentFeedstock(values)
        setAlreadyCreated(true)
        itemToasts.createSuccess({ description: values.name })
        invalidateData("feedstock")
      }
    })
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyCreated(false)
      setErrorMessage(undefined)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setAlreadyCreated(false)
    setErrorMessage(undefined)
  }

  useEffect(() => {
    if (currentFeedstock) setCurrentFeedstock(null)
  }, [currentFeedstock])

  useEffect(() => {
    if (errorMessage) setErrorMessage(undefined)
  }, [errorMessage, alreadyCreated])

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-10 justify-start">

        <SheetHeader className={alreadyCreated ? "sr-only" : " p-0"}>
          <SheetTitle className="text-xl">Crear insumo</SheetTitle>
          <SheetDescription className="text-left">
            Acá vas a cargar y mantener la lista de {(" ")}
            <strong>
              todos los insumos y materia prima
            </strong>
            {(" ")}que necesitás para crear tus productos.
          </SheetDescription>
        </SheetHeader>

        {
          alreadyCreated
            ?
            <FeedstockCreated
              feedstock={currentFeedstock}
              handleClose={handleClose}
              handleReturn={() => setAlreadyCreated(false)}
            />
            :
            <>
              <FeedstockForm
                defaultValues={{
                  sku: "",
                  name: "",
                  currency: undefined,
                  measure_unit: undefined,
                  unit_cost: 0,
                  provider: "",
                  state: undefined,
                }}
                onSubmit={handleCreate}
                formId="create-feedstock-form"
              />

              <FormFeedstockFooter
                errorMessage={errorMessage}
                isPending={isPending}
                submitLabel="Agregar insumo"
                submitingLabel="Agregando..."
                formId="create-feedstock-form"
                onClose={close}
              />
            </>
        }

      </SheetContent>
    </Sheet>


  );
}


export default CreateFeedstock
