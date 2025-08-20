"use client"
import FeedstockForm from "@/components/feedstock/form/form-feedstock";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { fetcher } from "@/utils/fetcher";
import { ClipboardCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";


const CreateFeedstock = () => {
  const { isOpen, setIsOpen, close } = useCreateFeedstockDialog()
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { toggle: tableToggle } = useUpdateDataTable("feedstock")


  const handleCreate = async (values: FormDataFeedstock) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/feedstock`, method: "POST", body: JSON.stringify(values) })
      if (data.error) setErrorMessage(data.errro)
      else {
        setAlreadyCreated(true)
        toast(data.description || data.message)
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
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[calc(100svw-3rem)] sm md:max-w-[calc(100%-6rem)] sm:min-w-[330px] sm:w-3/4 md:w-2xl overflow-y-auto max-h-[80svh] p-6 gap-8">

        <DialogHeader className={alreadyCreated ? "sr-only" : ""}>
          <DialogTitle>Agregar insumo</DialogTitle>
          <DialogDescription className="text-left">
            Acá vas a cargar y mantener la lista de {(" ")}
            <strong>
              todos los insumos y materia prima
            </strong>
            {(" ")}que necesitás para crear tus productos.
          </DialogDescription>
        </DialogHeader>

        {
          alreadyCreated
            ?
            <div className="flex flex-col items-center justify-between gap-5 my-5">
              <ClipboardCheck className="size-24 text-muted-foreground" />
              <p className="text-lg font-semibold">Insumo agregado exitosamente</p>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleClose} variant="outline">Cerrar</Button>
                <Button onClick={() => setAlreadyCreated(false)} variant="default">
                  Volver al formulario
                </Button>
              </div>
            </div>
            :
            <>
              <FeedstockForm
                defaultValues={{
                  name: "",
                  quantity: 0,
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

      </DialogContent>
    </Dialog>


  );
}


export default CreateFeedstock
