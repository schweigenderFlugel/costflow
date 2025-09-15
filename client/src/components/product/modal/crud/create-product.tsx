"use client";
import ProductForm from "@/components/product/form/product-form";
import FormProductFooter from "@/components/feedstock/form/form-feedstock-footer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateProductDialog } from "@/hooks/use-product-dialog";
import { useEffect, useState } from "react";
import ProductCreated from "@/components/product/modal/crud/already/product-created";
import useProductMutations from "@/hooks/mutations/use-product-mutations";
import { FormDataProduct } from "@/types/type-product";

const CreateProduct = () => {
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<null | FormDataProduct>(
    null
  );
  const { isOpen, setIsOpen, close } = useCreateProductDialog();
  const { createProduct } = useProductMutations();

  const handleCreate = (values: FormDataProduct) => {
    createProduct.mutate(values, {
      onSuccess: () => {
        setCurrentProduct(values);
        setAlreadyCreated(true);
      },
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setAlreadyCreated(false);
    }
    setIsOpen(open);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAlreadyCreated(false);
  };

  useEffect(() => {
    if (currentProduct) setCurrentProduct(null);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-1 justify-start sm:max-w-4xl">
        <SheetHeader className={alreadyCreated ? "sr-only" : "px-0"}>
          <SheetTitle className="text-xl">Agregar producto</SheetTitle>
          <SheetDescription className="text-left">
            Acá vas a cargar y mantener la lista de <strong>productos</strong>.
          </SheetDescription>
        </SheetHeader>

        {alreadyCreated ? (
          <ProductCreated
            product={currentProduct}
            handleClose={handleClose}
            handleReturn={() => setAlreadyCreated(false)}
          />
        ) : (
          <>
            <ProductForm
              defaultValues={{
                name: "",
                description: "",
                feedstocks: [],
                indirect_costs: [],
                measure_unit: undefined,
                quantity: 1,
                sku: "",
                state: undefined,
                labour_time: 1,
              }}
              onSubmit={handleCreate}
              formId="create-product-form"
            />

            <FormProductFooter
              errorMessage={createProduct.error?.message}
              isPending={createProduct.isPending}
              submitLabel="Agregar producto"
              submitingLabel="Agregando..."
              formId="create-product-form"
              onClose={close}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CreateProduct;
