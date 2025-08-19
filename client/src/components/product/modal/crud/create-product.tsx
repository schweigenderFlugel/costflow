"use client"
import ProductForm from "@/components/product/form/product-form";
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateProductDialog } from "@/hooks/use-product-dialog";
import { FormDataProduct } from "@/schemas/product-schema";
import { ClipboardCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { fetcher } from "@/utils/fetcher";
import { toast } from "sonner";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";


const CreateProduct = () => {
  const { isOpen, setIsOpen, close } = useCreateProductDialog()
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { toggle: tableToggle } = useUpdateDataTable("product")

  const handleCreate = async (values: FormDataProduct) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/product`, method: "POST", body: JSON.stringify(values) })
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
          <DialogTitle>Agregar producto</DialogTitle>
          <DialogDescription className="text-left">
            Acá vas a cargar y mantener la lista de {(" ")}
            <strong>
              productos
            </strong>.
          </DialogDescription>
        </DialogHeader>

        {
          alreadyCreated
            ?
            <div className="flex flex-col items-center justify-between gap-5 my-5">
              <ClipboardCheck className="size-24 text-muted-foreground" />
              <p className="text-lg font-semibold">Producto agregado exitosamente</p>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleClose} variant="outline">Cerrar</Button>
                <Button onClick={() => setAlreadyCreated(false)} variant="default">
                  Volver al formulario
                </Button>
              </div>
            </div>
            :
            <>
              <ProductForm
                defaultValues={{
                  name: "",
                  description: "",
                  product_feedstock: "",
                  measure_unit: undefined,
                  quantity: undefined,
                  subtotal: undefined,
                  indirect_cost: undefined,
                  resale_percentage: undefined,
                  public_percentage: undefined,
                }}
                onSubmit={handleCreate}
                formId="create-product-form"
              />

              <FormProductFooter
                errorMessage={errorMessage}
                isPending={isPending}
                submitLabel="Agregar producto"
                submitingLabel="Agregando..."
                formId="create-product-form"
                onClose={close}
              />
            </>
        }

      </DialogContent>
    </Dialog>


  );
}


export default CreateProduct
