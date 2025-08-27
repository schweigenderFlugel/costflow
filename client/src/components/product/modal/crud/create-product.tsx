"use client"
import ProductForm from "@/components/product/form/product-form";
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCreateProductDialog } from "@/hooks/use-product-dialog";
import { FormDataProduct } from "@/schemas/product-schema";
import { useEffect, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import { Product } from "@/types/items/product";
import { itemToasts } from "@/components/item-toasts";
import { useDataMutation } from "@/hooks/use-data-mutation";
import ProductCreated from "@/components/product/modal/crud/already/product-created";


const CreateProduct = () => {
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false)
  const [currentProduct, setCurrentProduct] = useState<null | Product>(null)
  const { isOpen, setIsOpen, close } = useCreateProductDialog()

  // Optimized mutation with useDataMutation
  const createProductMutation = useDataMutation({
    queryType: "product",
    mutationFn: async (values: FormDataProduct) => {
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
        input: `/api/product`,
        method: "POST",
        body: JSON.stringify(productDTO)
      });

      // Handle error responses
      if (data.error || !data.message?.includes("successfully")) {
        let posibleMessage = data.detail || data.error || data.description || data.message
        if (Array.isArray(posibleMessage)) {
          posibleMessage = (posibleMessage.map((detail) => detail.msg)).join(". \n")
        }
        throw new Error(posibleMessage || "Error al crear el producto");
      }

      return data;
    },
    onSuccess: (data, variables) => {
      setCurrentProduct(variables as Product);
      setAlreadyCreated(true);
      itemToasts.createSuccess({ description: variables.name, type: "producto" });
    },
    onError: (error) => {
      console.error(error);
      itemToasts.error({
        description: "Error al crear producto",
        message: error.message,
        type: "producto"
      });
    }
  });

  const handleCreate = (values: FormDataProduct) => {
    createProductMutation.mutate(values);
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

  useEffect(() => {
    if (currentProduct) setCurrentProduct(null)
  }, [currentProduct])

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
                errorMessage={createProductMutation.error?.message}
                isPending={createProductMutation.isPending}
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
