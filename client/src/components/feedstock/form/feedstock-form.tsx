"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { feedstockSchema } from "@/schemas/feedstock-schema";
import { useMeasureUnitLogic } from "@/hooks/form/use-measure-unit-logic";
import { FeedstockFormProps } from "@/interfaces/interface-feedstock-form-props";
import { FormDataFeedstock } from "@/types/type-feedstock";
import { CurrencyField } from "@/components/shared/form-fields/currency-field";
import { UnitCostField } from "@/components/shared/form-fields/unit-cost-field";
import { MeasureUnitField } from "@/components/shared/form-fields/measure-unit-field";
import { StateMatterField } from "@/components/shared/form-fields/state-matter-field";
import { ProviderField } from "@/components/shared/form-fields/provider-field";
import { NameField } from "@/components/shared/form-fields/name-field";
import { SkuField } from "@/components/shared/form-fields/sku-field";

const FeedstockForm = ({
  defaultValues,
  onSubmit,
  formId,
}: FeedstockFormProps) => {
  const form = useForm<FormDataFeedstock>({
    resolver: zodResolver(feedstockSchema),
    defaultValues,
  });

  const { selectedState, getAvailableMeasureUnits, handleStateChange } =
    useMeasureUnitLogic({
      watch: form.watch,
      setValue: form.setValue,
    });

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        id={formId}
        className="flex flex-col gap-5 px-1.5 py-3"
      >
        <SkuField
          control={form.control}
          placeholder="Código referencial del insumo"
        />

        <NameField control={form.control} placeholder="Nombre del insumo" />

        <ProviderField control={form.control} />

        <StateMatterField
          control={form.control}
          onStateChange={handleStateChange}
        />

        <MeasureUnitField
          control={form.control}
          availableUnits={getAvailableMeasureUnits()}
          disabled={!selectedState}
          className="overflow-hidden"
        />
        <div className="grid grid-cols-2 gap-1">
          <UnitCostField
            control={form.control}
            placeholder="Costo unitario del insumo"
          />

          <CurrencyField control={form.control} />
        </div>
      </form>
    </Form>
  );
};

export default FeedstockForm;
