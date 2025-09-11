"use client";

import { useState } from "react";
import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
import { useIndirectCostMutations } from "@/hooks/mutations/use-indirect-cost-mutations";
import IndirectCostForm, {
  COST_TYPES,
} from "@/components/indirect-cost/form/indirect-cost-form";
import { useUpdateIndirectCostDialog } from "@/hooks/use-indirect-cost-dialog";
import {
  Sheet,
  SheetFooter,
  SheetHeader,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import DetailIndirectCost from "@/components/indirect-cost/crud/detail-indirect-cost";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IndirectCostInput } from "@/interfaces/interface-indirect-costs";

const UpdateIndirectCost = () => {
  const [alreadyUpdated, setAlreadyUpdated] = useState<boolean>(false);
  const [indirectCostDetail, setIndirectCostDetail] =
    useState<IndirectCostInput | null>(null);
  const { isOpen, setIsOpen, indirectCost } = useUpdateIndirectCostDialog();
  const { updateIndirectCost } = useIndirectCostMutations();

  if (indirectCost === null) return null;

  const handleSubmit = (values: FormDataIndirectCost) => {
    updateIndirectCost.mutate(
      { ...values, indirectCostId: indirectCost.id },
      {
        onSuccess: () => {
          setIndirectCostDetail(values);
          setAlreadyUpdated(true);
        },
      }
    );
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="py-6 px-4 gap-1 justify-start sm:max-w-md">
        <SheetHeader className={alreadyUpdated ? "sr-only" : ""}>
          <SheetTitle className="font-medium text-lg">
            Editar costo indirecto
          </SheetTitle>

          <SheetDescription>
            Modificá los datos del costo indirecto seleccionado.
          </SheetDescription>
        </SheetHeader>
        {!(alreadyUpdated && indirectCostDetail) ? (
          <IndirectCostForm
            onSubmit={handleSubmit}
            isPending={updateIndirectCost.isPending}
            formId="update-indirect-cost"
            submitText="Guardar cambios"
            submitingText="Guardando..."
            onClose={handleCancel}
            initialIsCustomType={
              !COST_TYPES.includes(
                indirectCost.type as (typeof COST_TYPES)[number]
              )
            }
            defaultValues={{
              type: COST_TYPES.includes(
                indirectCost.type as (typeof COST_TYPES)[number]
              )
                ? indirectCost.type
                : COST_TYPES[10],
              customType: COST_TYPES.includes(
                indirectCost.type as (typeof COST_TYPES)[number]
              )
                ? ""
                : indirectCost.type,
              amount: indirectCost.amount,
              date: new Date(indirectCost.date),
              total_usage: indirectCost.total_usage,
            }}
            errorMessage={
              updateIndirectCost.error && (
                <SheetFooter>
                  <p className="text-md font-medium text-red-500 break-words">
                    {updateIndirectCost.error.message}
                  </p>
                </SheetFooter>
              )
            }
          />
        ) : (
          <div className="flex flex-col gap-6 my-auto px-0 sm:px-6">
            <div className="flex items-center flex-col gap-1">
              <CheckCheck className="size-24 text-muted-foreground" />
              <p className="text-lg font-semibold text-center">
                Cambios guardados
              </p>
              <p className="text-md text-muted-foreground">
                La información del costo se actualizó correctamente.
              </p>
            </div>

            <DetailIndirectCost indirectCost={indirectCostDetail} />

            <Button
              type="button"
              disabled={updateIndirectCost.isPending}
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

export default UpdateIndirectCost;
