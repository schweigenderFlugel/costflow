"use client";

import { useState, useTransition } from "react";
import { fetcher } from "@/utils/fetcher";
// import { getToken } from "@/utils/get-token";
import { itemToasts } from "@/components/item-toasts";
import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import IndirectCostForm from "@/components/indirect-cost/form/indirect-cost-form";



const defaultValues = {
  type: "",
  customType: "",
  amount: 0,
}

const AddIndirectCost = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { toggle: tableToggle } = useUpdateDataTable("indirect_cost")
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: FormDataIndirectCost) => {
    setErrorMessage(undefined);

    // Prepare the final type value
    const finalType = values.type === "Otros" ? values.customType : values.type;
    const submitData = {
      type: finalType,
      amount: values.amount
    };
    let isSuccess: boolean = false;
    startTransition(async () => {
      try {
        const data = await fetcher({
          input: `/api/indirect_cost`,
          method: "POST",
          body: JSON.stringify(submitData)
        });

        if (data.error || !data.message?.includes("successfully")) {
          let errorMessage = data.error || data.description || data.message || data.detail;

          if (Array.isArray(errorMessage)) {
            errorMessage = errorMessage.map((detail: any) => detail.msg || detail).join(". ");
          }

          console.error("Error creating indirect cost:", data);
          setErrorMessage(errorMessage || "Error al crear el costo indirecto");

          itemToasts.error({
            description: finalType || values.type,
            type: "costo indirecto" as any,
            message: errorMessage || "Error al crear el costo indirecto"
          });
        } else {
          itemToasts.createSuccess({
            description: `${finalType} - $${values.amount}`,
            type: "costo indirecto" as any
          });
          tableToggle()
          isSuccess = true;
        }
      } catch (error) {
        console.error("Network error:", error);
        const message = "Error de conexión. Inténtalo nuevamente.";
        setErrorMessage(message);

        itemToasts.error({
          description: finalType || values.type,
          type: "costo indirecto" as any,
          message
        });
      }
    });
    return isSuccess;
  };

  const handleCancel = () => {
    setErrorMessage(undefined);

  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="space-y-3">
        <h3 className="font-medium text-lg rounded-lg bg-primary text-background px-2.5 py-1.5 w-fit">
          Agregar costo indirecto
        </h3>
        <div>
          <p className="text-muted-foreground text-base px-2">
            Costos no relacionados directamente al producto terminado.
          </p>
          <p className="text-muted-foreground text-sm px-2">
            Ej: Alquiler, sueldos de empleados, consumo de luz, gas, fletes de la empresa.
          </p>
        </div>
      </div>

      <IndirectCostForm
        onSubmit={handleSubmit}
        isPending={isPending}
        formId="create-indirect-cost"
        submitText="Crear"
        submitingText="Creando..."
        onClose={handleCancel}
        defaultValues={defaultValues}
      />

      {errorMessage && (
        <p className="text-md font-medium text-red-500 break-words">{errorMessage}</p>
      )}


    </div>
  );
};

export default AddIndirectCost;
