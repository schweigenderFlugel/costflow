"use client"
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import ProductForm from "@/components/product/form/product-form";
import ProductFormSkeleton from "@/components/skeletons/product-form-skeleton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUpdateProductDialog } from "@/hooks/use-product-dialog";
import { FormDataProduct } from "@/schemas/product-schema";
import { fetcher } from "@/utils/fetcher";
import { useState } from "react";
import { itemToasts } from "@/components/item-toasts";
import { useDataMutation } from "@/hooks/use-data-mutation";
import { dtoProduct } from "@/components/product/dto/dto-product";
import ProductUpdated from "@/components/product/modal/crud/already/product-updated";

const UpdateProduct = () => {
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [updatedProductData, setUpdatedProductData] = useState<FormDataProduct | null>(null)
  const { isOpen, setIsOpen, product, setProduct, isLoadingProduct } = useUpdateProductDialog()

  // Optimized mutation with useDataMutation
  const updateProductMutation = useDataMutation({
    queryType: "product",
    mutationFn: async (values: FormDataProduct) => {
      if (!product) throw new Error("No se encontró el producto a actualizar");

      const productDTO = {
        ...values,
        labour_time: 1,
        indirect_costs: [
          {
            id: "",
            usage: 0
          }
        ],
        feedstocks: values.feedstocks.map(fs => ({
          id: fs.id,
          quantity_required: fs.quantity_required
        }))
      }

      const data = await fetcher({
        input: `/api/product/${product.id}`,
        method: "PUT",
        body: JSON.stringify(productDTO)
      });

      // Handle error responses
      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage = data.detail || data.error || data.description || data.message
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map((detail) => detail.msg)).join(". \n")
        }
        throw new Error(posibleMessage || "Error al actualizar el producto");
      }

      return data;
    },
    onSuccess: (data, variables) => {
      setUpdatedProductData(variables);
      setAlreadyUpdated(true);
      itemToasts.updateSuccess({ description: variables.name, type: "producto" });
    },
    onError: (error) => {
      console.error(error);
      itemToasts.error({
        description: "Error al actualizar producto",
        message: error.message,
        type: "producto"
      });
    }
  });

  const handleUpdate = (values: FormDataProduct) => {
    updateProductMutation.mutate(values);
  };

  if (product === null) return null;

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
                errorMessage={updateProductMutation.error?.message}
                isPending={updateProductMutation.isPending}
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
