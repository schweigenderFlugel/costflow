"use client";

import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
import { useIndirectCostMutations } from "@/hooks/mutations/use-indirect-cost-mutations";
import IndirectCostForm from "@/components/indirect-cost/form/indirect-cost-form";
import { useCreateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DetailIndirectCost from "@/components/indirect-cost/crud/detail-indirect-cost";
import { CheckCheck } from "lucide-react";
import { IndirectCostInput } from "@/interfaces/interface-indirect-costs";

const defaultValues = {
  type: "",
  customType: "",
  amount: 0,
  date: new Date(),
};

const AddIndirectCost = () => {
  const { setIsOpen, isOpen } = useCreateIndirectCostDialog();
  const { createIndirectCost } = useIndirectCostMutations();
  const [alreadyCreated, setAlreadyCreated] = useState<boolean>(false);
  const [indirectCostDetail, setIndirectCostDetail] =
    useState<IndirectCostInput | null>(null);

  const handleSubmit = (values: FormDataIndirectCost) => {
    createIndirectCost.mutate(values, {
      onSuccess: () => {
        // setIsOpen(false)
        setAlreadyCreated(true);
        setIndirectCostDetail(values);
      },
    });
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (indirectCostDetail) setIndirectCostDetail(null);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="py-6 px-4 gap-1 justify-start sm:max-w-md">
        <SheetHeader className={alreadyCreated ? "sr-only" : "px-0"}>
          <SheetTitle className="font-medium text-lg">
            Agregar costo indirecto
          </SheetTitle>

          <SheetDescription asChild>
            <div>
              <p>Costos no relacionados directamente al producto terminado.</p>
              <p className="inline-block text-muted-foreground">
                Ejemplo: Alquiler, sueldos de empleados, consumo de luz, gas,
                fletes de la empresa.
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>

        {!(alreadyCreated && indirectCostDetail) ? (
          <IndirectCostForm
            onSubmit={handleSubmit}
            isPending={createIndirectCost.isPending}
            formId="create-indirect-cost"
            submitText="Crear"
            submitingText="Creando..."
            onClose={handleCancel}
            defaultValues={defaultValues}
            errorMessage={
              createIndirectCost.error && (
                <p className="text-md font-medium text-red-500 break-words">
                  {createIndirectCost.error.message}
                </p>
              )
            }
          />
        ) : (
          <div className="flex flex-col gap-6 my-auto px-0 sm:px-6">
            <div className="flex items-center flex-col gap-1">
              <CheckCheck className="size-24 text-muted-foreground" />
              <p className="text-lg font-semibold text-center">
                Costo Indirecto creado
              </p>
              <p className="text-md text-muted-foreground">
                La información del costo se guardó correctamente.
              </p>
            </div>

            <DetailIndirectCost indirectCost={indirectCostDetail} />

            <Button
              type="button"
              disabled={createIndirectCost.isPending}
              variant={"outline"}
              onClick={() => setIsOpen(false)}
              className="rounded-xs cursor-pointer mx-auto w-3/4"
            >
              Cerrar
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddIndirectCost;
