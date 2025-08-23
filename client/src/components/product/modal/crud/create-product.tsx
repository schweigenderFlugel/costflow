"use client"
import ProductForm from "@/components/product/form/product-form";
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCreateProductDialog } from "@/hooks/use-product-dialog";
import { FormDataProduct } from "@/schemas/product-schema";
import { useEffect, useState, useTransition } from "react";
import { fetcher } from "@/utils/fetcher";
import { Product } from "@/types/items/product";
import { itemToasts } from "@/components/item-toasts";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import ProductCreated from "@/components/product/modal/crud/already/product-created";


const CreateProduct = () => {
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<null | Product>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { isOpen, setIsOpen, close } = useCreateProductDialog()
  const [isPending, startTransition] = useTransition()
  const { toggle: updateTable } = useUpdateDataTable("product")

  const handleCreate = async (values: FormDataProduct) => {
    startTransition(async () => {
      const productDTO = {
        ...values,
        feedstocks: values.feedstocks.map(fs => ({
          feedstock_id: fs.feedstock_id,
          quantity_required: fs.quantity_required
        }))
      }

      const data = await fetcher({ input: `/api/product`, method: "POST", body: JSON.stringify(productDTO) })

      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage = data.error || data.description || data.message || data.detail
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map(detail => detail.msg)).join(". \n")
        }
        console.error(data)
        setErrorMessage(posibleMessage)
      }
      else {
        setCurrentProduct(values)
        setAlreadyCreated(true)
        itemToasts.createSuccess({ description: values.name, type: "producto" })
        updateTable()
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
    if (currentProduct) setCurrentProduct(null)
  }, [currentProduct])

  useEffect(() => {
    if (errorMessage && alreadyCreated) setErrorMessage(undefined)
  }, [alreadyCreated, errorMessage])

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-10 justify-start sm:max-w-xl">

        <SheetHeader className={alreadyCreated ? "sr-only" : "p-0"}>
          <SheetTitle className="text-xl">Agregar producto</SheetTitle>
          <SheetDescription className="text-left">
            Acá vas a cargar y mantener la lista de {(" ")}
            <strong>
              productos
            </strong>.
          </SheetDescription>
        </SheetHeader>

        {
          alreadyCreated
            ?
            <ProductCreated
              product={currentProduct}
              handleClose={handleClose}
              handleReturn={() => setAlreadyCreated(false)}
            />
            :
            <>
              <ProductForm
                defaultValues={{
                  name: "",
                  description: "",
                  feedstocks: [],
                  measure_unit: undefined,
                  quantity: 0,
                  sku: "",
                  state: undefined
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

      </SheetContent>
    </Sheet>


  );
}


export default CreateProduct
