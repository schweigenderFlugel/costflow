"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { productSchema } from "@/schemas/product-schema";
import { useMeasureUnitLogic } from "@/hooks/form/use-measure-unit-logic";
import { ProductFormProps } from "@/interfaces/interface-product-form-props";
import { FormDataProduct } from "@/types/type-product";
import { IndirectCostSelector } from "@/components/shared/form-fields/indirect-cost-selector";
import { FeedstockSelector } from "@/components/shared/form-fields/feedstock-selector";
import { DescriptionField } from "@/components/shared/form-fields/description-field";
import { QuantityField } from "@/components/shared/form-fields/quantity-field";
import { MeasureUnitField } from "@/components/shared/form-fields/measure-unit-field";
import { StateMatterField } from "@/components/shared/form-fields/state-matter-field";
import { NameField } from "@/components/shared/form-fields/name-field";
import { SkuField } from "@/components/shared/form-fields/sku-field";

const ProductForm = ({ defaultValues, onSubmit, formId }: ProductFormProps) => {
  const form = useForm<FormDataProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...defaultValues,
      feedstocks: defaultValues.feedstocks,
      indirect_costs: defaultValues.indirect_costs,
    },
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
        className={`grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 px-2 sm:px-4 py-5`}
      >
        <div className="flex flex-col col-span-1 gap-y-4">
          <SkuField
            control={form.control}
            placeholder="Código SKU del producto"
          />

          <NameField
            control={form.control}
            label="Nombre del producto"
            placeholder="Nombre del producto"
          />

          <StateMatterField
            control={form.control}
            onStateChange={handleStateChange}
          />

          <MeasureUnitField
            control={form.control}
            availableUnits={getAvailableMeasureUnits()}
            disabled={!selectedState}
            className="truncate"
            placeholderDisabled="Primero selecciona el estado de la materia"
          />

          <QuantityField
            control={form.control}
            label="Cantidad del producto"
            placeholder="Cantidad del producto"
          />

          <QuantityField
            name="labour_time"
            control={form.control}
            label="Tiempo de trabajo"
            step="1"
            placeholder="Minutos para fabricarlo"
          />

          <DescriptionField
            control={form.control}
            placeholder="Descripción del producto"
            className=""
          />
        </div>

        {/* Búsqueda y selección de insumos */}
        <FeedstockSelector
          control={form.control}
          formRegister={form.register}
          formErrors={form.formState.errors}
        />

        {/* Búsqueda y selección de costos indirectos */}
        <IndirectCostSelector
          control={form.control}
          formRegister={form.register}
          formErrors={form.formState.errors}
        />
      </form>
    </Form>
  );
};

export default ProductForm;
