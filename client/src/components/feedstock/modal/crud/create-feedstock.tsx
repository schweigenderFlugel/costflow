"use client"
import FeedstockForm from "@/components/feedstock/form/form-feedstock";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Button } from "@/components/ui/button";
import { useCreateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { itemToasts } from "@/components/item-toasts";
import { fetcher } from "@/utils/fetcher";
import { ClipboardCheck } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Feedstock } from "@/types/items/feedstock";
import DetailFeedstock from "@/components/feedstock/modal/crud/detail-feedstock";


const CreateFeedstock = () => {
  const { isOpen, setIsOpen, close } = useCreateFeedstockDialog()
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false)
  const [currentFeedstock, setCurrentFeedstock] = useState<null | Feedstock>(null)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { toggle: tableToggle } = useUpdateDataTable("feedstock")

  useEffect(() => {
    setErrorMessage(undefined)
    setCurrentFeedstock(null)
  }, [])

  const handleCreate = async (values: FormDataFeedstock) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/feedstock`, method: "POST", body: JSON.stringify(values) })

      // (aún) no existe una estructura clara de error como respuesta
      if (!data.message?.includes("successfully")) {
        let posibleMessage = data.description || data.message || data.detail
        if (Array.isArray(posibleMessage)) {

          posibleMessage = (posibleMessage.map(detail => detail.msg)).join(". \n")
        }
        setErrorMessage(posibleMessage)
      }
      else {
        setCurrentFeedstock(values)
        setAlreadyCreated(true)
        itemToasts.createSuccess({ description: data.name })
        // toast.success(successMessage)
        tableToggle()
      }
    })
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyCreated(false)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setAlreadyCreated(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-auto py-6 px-4 gap-10 justify-start">

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
            <div className="flex flex-col gap-6 my-auto">
              <div className="flex items-center flex-col gap-1">
                <ClipboardCheck className="size-24 text-muted-foreground" />
                <p className="text-lg font-semibold">Insumo agregado</p>
              </div>

              <DetailFeedstock feedstock={currentFeedstock} />

              <div className="grid grid-cols-2 gap-4 w-full justify-between items-center">
                <Button onClick={handleClose} variant="outline" className="cursor-pointer rounded-xs">Cerrar</Button>
                <Button onClick={() => setAlreadyCreated(false)} variant="default" className="cursor-pointer rounded-xs">
                  Agregar otro
                </Button>
              </div>
            </div>
            :
            <>
              <FeedstockForm
                defaultValues={{
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
