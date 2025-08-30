"use client"
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import ProductForm from "@/components/product/form/product-form";
import ProductFormSkeleton from "@/components/skeletons/product-form-skeleton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUpdateProductDialog } from "@/hooks/use-product-dialog";
import { FormDataProduct } from "@/schemas/product-schema";
import { useState } from "react";
import { dtoProduct } from "@/components/product/dto/dto-product";
import ProductUpdated from "@/components/product/modal/crud/already/product-updated";
import useProductMutations from "@/hooks/mutations/use-product-mutations";

const UpdateProduct = () => {
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [updatedProductData, setUpdatedProductData] = useState<FormDataProduct | null>(null)
  const { isOpen, setIsOpen, product, setProduct, isLoadingProduct } = useUpdateProductDialog()
  const { updateProduct } = useProductMutations()


  if (product === null) return null;

  const handleUpdate = (values: FormDataProduct) => {
    updateProduct.mutate({
      productId: product.id,
      ...values
    },
      {
        onSuccess: () => {
          setUpdatedProductData(values)
          setAlreadyUpdated(true)
        }
      });
  };
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyUpdated(false)
      setUpdatedProductData(null)
    }
    setIsOpen(open)
  }

  const handleClose = () => {
    setIsOpen(false)
    setProduct(null)
    setAlreadyUpdated(false)
    setUpdatedProductData(null)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-1 justify-start sm:max-w-2xl">

        <SheetHeader className={alreadyUpdated ? "sr-only" : "px-0"}>
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
                errorMessage={updateProduct.error?.message}
                isPending={updateProduct.isPending}
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
