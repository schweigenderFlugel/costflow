"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  StateMatter,
  SolidMeasure,
  LiquidMeasure,
  GasMeasure,
  MeasureUnit
} from "@/types/measure/measure-unit";
import { Currency } from "@/types/measure/currency";
import { feedstockSchema, FormDataFeedstock } from "@/schemas/feedstock-schema";
import {
  translateMeasureUnit,
  translateStateMatter
} from "@/utils/translate/shared-translate";

interface FormFeedstock {
  defaultValues: Partial<FormDataFeedstock>;
  onSubmit: (values: FormDataFeedstock) => Promise<void> | void;
  formId: string;
}

const FormFeedstock = ({
  defaultValues,
  onSubmit,
  formId
}: FormFeedstock) => {
  const form = useForm<FormDataFeedstock>({
    resolver: zodResolver(feedstockSchema),
    defaultValues,
  });

  // Obtener el estado actual seleccionado para filtrar las unidades de medida
  const selectedState = form.watch("state");

  // Función para obtener las unidades de medida disponibles según el estado
  const getAvailableMeasureUnits = () => {
    switch (selectedState) {
      case StateMatter.SOLID:
        return Object.values(SolidMeasure);
      case StateMatter.LIQUID:
        return Object.values(LiquidMeasure);
      case StateMatter.GAS:
        return Object.values(GasMeasure);
      default:
        return [];
    }
  };

  // Reset measure_unit when state changes
  const handleStateChange = (value: StateMatter) => {
    form.setValue("state", value);
    form.setValue("measure_unit", "" as MeasureUnit); // Reset measure unit
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        id={formId}
        className="flex flex-col gap-5 px-1.5"
      >

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del insumo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proveedor <span className="text-xs text-muted-foreground">(Opcional)</span></FormLabel>
              <FormControl>
                <Input placeholder="Nombre o alias del proveedor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado de la materia</FormLabel>
              <Select
                onValueChange={handleStateChange}
                value={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(StateMatter).map((state) => (
                    <SelectItem key={state} value={state}>
                      {translateStateMatter(state)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="measure_unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidad de medida</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedState}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder={
                      selectedState
                        ? "Seleccionar unidad"
                        : "Primero selecciona el estado de la materia"
                    } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getAvailableMeasureUnits().map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {translateMeasureUnit(unit as unknown as MeasureUnit)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit_cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Costo unitario</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Costo unitario del insumo"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moneda</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(Currency).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  );
}


export default FormFeedstock
