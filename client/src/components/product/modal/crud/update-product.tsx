"use client"
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import ProductForm from "@/components/product/form/product-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateProductDialog } from "@/hooks/use-product-dialog";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { FormDataProduct } from "@/schemas/product-schema";
import { fetcher } from "@/utils/fetcher";
import { ClipboardCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";


const UpdateFeedstock = () => {
  const { isOpen, setIsOpen, product, setProduct } = useUpdateProductDialog()
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [isPending, startTransition] = useTransition()
  const { toggle: tableToggle } = useUpdateDataTable("product")

  if (product === null) return;

  const handleUpdate = async (values: FormDataProduct) => {
    startTransition(async () => {
      const data = await fetcher({ input: `/api/product/${product.id}`, method: "PUT", body: JSON.stringify(values) })
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
    setProduct(null)
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
              <ProductForm
                formId="update-product-form"
                defaultValues={product}
                onSubmit={handleUpdate}
              />

              <FormFeedstockFooter
                errorMessage={errorMessage}
                isPending={isPending}
                submitLabel="Guardar cambios"
                submitingLabel="Actualizando..."
                formId="update-product-form"
                onClose={handleClose}
              />
            </>
        }
      </DialogContent>
    </Dialog>

  );
}

export default UpdateFeedstock
