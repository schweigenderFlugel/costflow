"use client";

import { useEffect, useState, useTransition } from "react";
import { fetcher } from "@/utils/fetcher";
import { itemToasts } from "@/components/item-toasts";
import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import IndirectCostForm, { COST_TYPES } from "@/components/indirect-cost/form/indirect-cost-form";
import { useUpdateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog";
import { Dialog, DialogFooter, DialogHeader, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import DetailIndirectCost from "@/components/indirect-cost/crud/detail-indirect-cost";
import { IndirectCostInput } from "@/types/items/indirect-cost";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";



const UpdateIndirectCost = () => {
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false)
  const [indirectCostDetail, setIndirectCostDetail] = useState<IndirectCostInput | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { isOpen, setIsOpen, indirectCost } = useUpdateIndirectCostDialog()
  const { toggle: tableToggle } = useUpdateDataTable("indirect_cost")
  const [isPending, startTransition] = useTransition();


  useEffect(() => {
    if (errorMessage && alreadyUpdated) {
      setErrorMessage(undefined)
      setAlreadyUpdated(false)
      setIndirectCostDetail(null)
    }
  }, [alreadyUpdated, errorMessage])

  if (indirectCost === null) return null;

  const handleSubmit = async (
    values: FormDataIndirectCost
  ) => {
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
          input: `/api/indirect_cost/${indirectCost.id}`,
          method: "PUT",
          body: JSON.stringify(submitData)
        });

        if (data.error || !data.message?.includes("successfully")) {
          let errorMessage = data.error || data.description || data.message || data.detail;

          if (Array.isArray(errorMessage)) {
            errorMessage = errorMessage.map((detail) => detail.msg || detail).join(". ");
          }

          console.error("Error updating indirect cost:", data);
          setErrorMessage(errorMessage || "Error al actualizar el costo indirecto");

          itemToasts.error({
            description: finalType || values.type,
            type: "costo indirecto",
            message: errorMessage || "Error al actualizar el costo indirecto"
          });
        } else {
          itemToasts.updateSuccess({
            description: `${finalType} - $${values.amount}`,
            type: "costo indirecto"
          });
          tableToggle()
          isSuccess = true;
          setIndirectCostDetail(values)
          setAlreadyUpdated(true)
        }
      } catch (error) {
        console.error("Network error:", error);
        const message = "Error de conexión. Inténtalo nuevamente.";
        setErrorMessage(message);

        itemToasts.error({
          description: finalType || values.type,
          type: "costo indirecto",
          message
        });
      }
    });
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
        <DialogHeader className={alreadyUpdated ? "sr-only" : ""}>
          <DialogTitle className="font-medium text-lg">
            Editar costo indirecto
          </DialogTitle>

          <DialogDescription>
            Modificá los datos del costo indirecto seleccionado.
          </DialogDescription>
        </DialogHeader>
        {
          !(alreadyUpdated && indirectCostDetail)
            ? <IndirectCostForm
              onSubmit={handleSubmit}
              isPending={isPending}
              formId="update-indirect-cost"
              submitText="Guardar cambios"
              submitingText="Guardando..."
              onClose={handleCancel}
              initialIsCustomType={!(COST_TYPES.includes(indirectCost.type as typeof COST_TYPES[number]))}
              defaultValues={{
                type: COST_TYPES.includes(indirectCost.type as typeof COST_TYPES[number]) ? indirectCost.type : COST_TYPES[10],
                customType: COST_TYPES.includes(indirectCost.type as typeof COST_TYPES[number]) ? "" : indirectCost.type,
                amount: indirectCost.amount,
                date: new Date(indirectCost.date)
              }}
            />
            :
            <div className="flex flex-col gap-6 my-auto px-0 sm:px-6">

              <div className="flex items-center flex-col gap-1">
                <CheckCheck className="size-24 text-muted-foreground" />
                <p className="text-lg font-semibold text-center">Cambios guardados</p>
                <p className="text-md text-muted-foreground">
                  La información del costo se actualizó correctamente.
                </p>
              </div>

              <DetailIndirectCost indirectCost={indirectCostDetail} />

              <Button type="button" disabled={isPending} variant={"outline"} onClick={() => setIsOpen(false)} className="rounded-xs cursor-pointer mx-auto w-3/4">
                Cerrar
              </Button>

            </div>
        }
        {errorMessage && (
          <DialogFooter>
            <p className="text-md font-medium text-red-500 break-words">{errorMessage}</p>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>

  );
};

export default UpdateIndirectCost;
