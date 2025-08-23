"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { productSchema, FormDataProduct } from "@/schemas/product-schema";
import { useMeasureUnitLogic } from "@/hooks/form/use-measure-unit-logic";
import {
  SkuField,
  NameField,
  QuantityField,
  StateMatterField,
  MeasureUnitField,
  DescriptionField,
  FeedstockSelector
} from "@/components/shared/form-fields";

interface ProductFormProps {
  defaultValues: Partial<FormDataProduct>;
  onSubmit: (values: FormDataProduct) => Promise<void> | void;
  formId: string;
}

const ProductForm = ({
  defaultValues,
  onSubmit,
  formId
}: ProductFormProps) => {
  const form = useForm<FormDataProduct>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...defaultValues,
      feedstocks: defaultValues.feedstocks || []
    },
  });

  const { selectedState, getAvailableMeasureUnits, handleStateChange } = useMeasureUnitLogic({
    watch: form.watch,
    setValue: form.setValue
  });

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        id={formId}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-2 sm:px-4">

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

        </div>
      </form>
    </Form>
  );
}

export default ProductForm
