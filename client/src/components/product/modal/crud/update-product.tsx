"use client"
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import ProductForm from "@/components/product/form/product-form";
import ProductFormSkeleton from "@/components/skeletons/product-form-skeleton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUpdateProductDialog } from "@/hooks/use-product-dialog";
import { FormDataProduct } from "@/schemas/product-schema";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState, useTransition } from "react";
import { itemToasts } from "@/components/item-toasts";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { dtoProduct } from "@/components/product/dto/dto-product";
import ProductUpdated from "@/components/product/modal/crud/already/product-updated";

const UpdateProduct = () => {
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [updatedProductData, setUpdatedProductData] = useState<FormDataProduct | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { isOpen, setIsOpen, product, setProduct, isLoadingProduct } = useUpdateProductDialog()
  const [isPending, startTransition] = useTransition()
  const { toggle: updateTable } = useUpdateDataTable("product")

  // Mover el useEffect antes del early return para evitar problemas de hooks
  useEffect(() => {
    if (errorMessage && alreadyUpdated) {
      setErrorMessage(undefined)
    }
  }, [alreadyUpdated, errorMessage])

  if (product === null) return null;

  const handleUpdate = async (values: FormDataProduct) => {
    startTransition(async () => {
      const productDTO = {
        ...values,
        feedstocks: values.feedstocks.map(fs => ({
          feedstock_id: fs.feedstock_id,
          quantity_required: fs.quantity_required
        }))
      }

      const data = await fetcher({ input: `/api/product/${product.id}`, method: "PUT", body: JSON.stringify(productDTO) })
      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage = data.error || data.description || data.message || data.detail
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map((detail) => detail.msg)).join(". \n")
        }
        console.error(data)
        setErrorMessage(posibleMessage)
      } else {
        setUpdatedProductData(values);
        setAlreadyUpdated(true)
        itemToasts.updateSuccess({ description: values.name, type: "producto" })
        updateTable()
      }
    })
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyUpdated(false)
      setUpdatedProductData(null)
      setErrorMessage(undefined)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setProduct(null)
    setAlreadyUpdated(false)
    setUpdatedProductData(null)
    setErrorMessage(undefined)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-10 justify-start sm:max-w-xl">

        <SheetHeader className={alreadyUpdated ? "sr-only" : "p-0"}>
          <SheetTitle className="text-xl">Editar producto</SheetTitle>
          <SheetDescription className="text-left">
            Actualizá la información de un producto ya cargado, modificando su nombre, cantidad, insumos o cualquier otro dato relevante para mantener tus registros siempre correctos y actualizados.
          </SheetDescription>
        </SheetHeader>

        {
          alreadyUpdated
            ?
            <ProductUpdated
              product={updatedProductData || product}
              handleReturn={() => { setAlreadyUpdated(false) }}
              handleClose={handleClose}
            />

            :
            <>
              {isLoadingProduct ? (
                <ProductFormSkeleton />
              ) : (
                <ProductForm
                  defaultValues={updatedProductData || dtoProduct(product)}
                  onSubmit={handleUpdate}
                  formId="update-product-form"
                />
              )}

              <FormProductFooter
                errorMessage={errorMessage}
                isPending={isPending}
                submitLabel="Guardar cambios"
                submitingLabel="Actualizando..."
                formId="update-product-form"
                onClose={handleClose}
              />
            </>
        }
      </SheetContent>
    </Sheet>

  );
}

export default UpdateProduct
