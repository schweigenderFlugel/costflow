"use client";
import FeedstockForm from "@/components/feedstock/form/feedstock-form";
import FormFeedstockFooter from "@/components/feedstock/form/form-feedstock-footer";
import { useCreateFeedstockDialog } from "@/hooks/use-feedstock-dialog";
import { FormDataFeedstock } from "@/schemas/feedstock-schema";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFeedstockMutations } from "@/hooks/mutations/use-feedstock-mutations";
import FeedstockCreated from "@/components/feedstock/modal/crud/already/feedstock-created";
import { Feedstock } from "@/interfaces/interface-feedstock";

const CreateFeedstock = () => {
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false);
  const [currentFeedstock, setCurrentFeedstock] = useState<null | Feedstock>(
    null
  );
  const { isOpen, setIsOpen, close } = useCreateFeedstockDialog();
  const { createFeedstock } = useFeedstockMutations();

  const handleCreate = (values: FormDataFeedstock) => {
    createFeedstock.mutate(values, {
      onSuccess: () => {
        setCurrentFeedstock(values);
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
    if (currentFeedstock) setCurrentFeedstock(null);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="py-6 px-4 gap-1 justify-start">
        <SheetHeader className={alreadyCreated ? "sr-only" : " px-0"}>
          <SheetTitle className="text-xl">Crear insumo</SheetTitle>
          <SheetDescription className="text-left">
            Acá vas a cargar y mantener la lista de{" "}
            <strong>todos los insumos y materia prima</strong> que necesitás
            para crear tus productos.
          </SheetDescription>
        </SheetHeader>

        {alreadyCreated ? (
          <FeedstockCreated
            feedstock={currentFeedstock}
            handleClose={handleClose}
            handleReturn={() => setAlreadyCreated(false)}
          />
        ) : (
          <>
            <FeedstockForm
              defaultValues={{
                sku: "",
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
              errorMessage={createFeedstock.error?.message}
              isPending={createFeedstock.isPending}
              submitLabel="Agregar insumo"
              submitingLabel="Agregando..."
              formId="create-feedstock-form"
              onClose={close}
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CreateFeedstock;
