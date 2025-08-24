"use client";

import { useState, useTransition } from "react";
// import { fetcher } from "@/utils/fetcher";
// import { itemToasts } from "@/components/item-toasts";
import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
// import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import IndirectCostForm, { COST_TYPES } from "@/components/indirect-cost/form/indirect-cost-form";
import { useUpdateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";



const UpdateIndirectCost = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>("Esta función aún no está disponible");
  const { isOpen, setIsOpen, indirectCost } = useUpdateIndirectCostDialog()
  // const { toggle: tableToggle } = useUpdateDataTable("indirect_cost")
  const [isPending, startTransition] = useTransition();

  if (indirectCost === null) return null;

  const handleSubmit = async (values: FormDataIndirectCost) => {
    // setErrorMessage(undefined);

    // Prepare the final type value
    const finalType = values.type === "Otros" ? values.customType : values.type;
    // const submitData = {
    //   type: finalType,
    //   amount: values.amount
    // };
    let isSuccess: boolean = false;
    // startTransition(async () => {
    //   try {
    //     const data = await fetcher({
    //       input: `/api/indirect_cost/${indirectCost.id}`,
    //       method: "PUT",
    //       body: JSON.stringify(submitData)
    //     });

    //     if (data.error || !data.message?.includes("successfully")) {
    //       let errorMessage = data.error || data.description || data.message || data.detail;

    //       if (Array.isArray(errorMessage)) {
    //         errorMessage = errorMessage.map((detail: any) => detail.msg || detail).join(". ");
    //       }

    //       console.error("Error creating indirect cost:", data);
    //       setErrorMessage(errorMessage || "Error al crear el costo indirecto");

    //       itemToasts.error({
    //         description: finalType || values.type,
    //         type: "costo indirecto" as any,
    //         message: errorMessage || "Error al crear el costo indirecto"
    //       });
    //     } else {
    //       itemToasts.createSuccess({
    //         description: `${finalType} - $${values.amount}`,
    //         type: "costo indirecto" as any
    //       });
    //       tableToggle()
    //       isSuccess = true;
    //     }
    //   } catch (error) {
    //     console.error("Network error:", error);
    //     const message = "Error de conexión. Inténtalo nuevamente.";
    //     setErrorMessage(message);

    //     itemToasts.error({
    //       description: finalType || values.type,
    //       type: "costo indirecto" as any,
    //       message
    //     });
    //   }
    // });
    startTransition(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
    });
    return isSuccess;
  };

  const handleCancel = () => {
    setErrorMessage(undefined);
    setIsOpen(false)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>

      <DialogContent className="flex flex-col gap-10 w-full sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-medium text-lg">
            Editar costo indirecto
          </DialogTitle>

          <DialogDescription>
            Modificá los datos del costo indirecto seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div>
          <IndirectCostForm
            onSubmit={handleSubmit}
            isPending={isPending}
            formId="create-indirect-cost"
            submitText="Guardar cambios"
            submitingText="Guardando..."
            onClose={handleCancel}
            initialIsCustomType={!(COST_TYPES.includes(indirectCost.type as typeof COST_TYPES[number]))}
            defaultValues={{
              type: COST_TYPES.includes(indirectCost.type as typeof COST_TYPES[number]) ? indirectCost.type : COST_TYPES[10],
              customType: COST_TYPES.includes(indirectCost.type as typeof COST_TYPES[number]) ? "" : indirectCost.type,
              amount: indirectCost.amount
            }}
          />
        </div>

        <DialogFooter>
          {errorMessage && (
            <p className="text-md font-medium text-red-500 break-words">{errorMessage}</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};

export default UpdateIndirectCost;
