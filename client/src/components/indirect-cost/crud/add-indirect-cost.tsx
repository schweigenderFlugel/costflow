"use client";

import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
import { useIndirectCostMutations } from "@/hooks/mutations/use-indirect-cost-mutations";
import IndirectCostForm from "@/components/indirect-cost/form/indirect-cost-form";
import { useCreateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog";
import { Button } from "@/components/ui/button";



const defaultValues = {
  type: "",
  customType: "",
  amount: 0,
  date: new Date()
}

const AddIndirectCost = () => {
  const { setIsOpen, isOpen } = useCreateIndirectCostDialog()
  const { createIndirectCost } = useIndirectCostMutations()

  const handleSubmit = (values: FormDataIndirectCost) => {
    createIndirectCost.mutate(values, {
      onSuccess: () => {
        setIsOpen(false)
      }
    });
  };

  const handleCancel = () => {
    setIsOpen(false)
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="space-y-1 text-center">
        <Button
          className="font-medium text-lg"
          type="button"
          onClick={() => { setIsOpen(true) }}
        >
          Agregar costo indirecto
        </Button>
        <div className="text-muted-foreground text-left px-2">
          <p>
            Costos no relacionados directamente al producto terminado.
          </p>
          <p className="leading-4 text-sm">
            Ej: Alquiler, sueldos de empleados, consumo de luz, gas, fletes de la empresa.
          </p>
        </div>
      </div>
      {
        isOpen &&
        <div>
          <IndirectCostForm
            onSubmit={handleSubmit}
            isPending={createIndirectCost.isPending}
            formId="create-indirect-cost"
            submitText="Crear"
            submitingText="Creando..."
            onClose={handleCancel}
            defaultValues={defaultValues}
          />
          {createIndirectCost.error && (
            <p className="text-md font-medium text-red-500 break-words">{createIndirectCost.error.message}</p>
          )}
        </div>
      }

    </div>
  );
};

export default AddIndirectCost;
