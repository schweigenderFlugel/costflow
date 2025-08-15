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
import { MeasureUnit, Currency } from "@/types/items/feedstock";
import { feedstockSchema, FormDataFeedstock } from "@/schemas/feedstock-schema";
import DateField from "@/components/date-field";
import { translateMeasureUnit } from "@/utils/translate/feedstock";

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
  })

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        id={formId}
      >
        <div className="grid grid-cols-12 gap-x-3 gap-y-4 items-start">
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input placeholder="Enter SKU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
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
            name="quantity"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Cantidad del insumo"
                    value={field.value as number}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="measure_unit"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Unidad de medida</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value as string}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar unidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(MeasureUnit).map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {translateMeasureUnit(unit)}
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
              <FormItem className="col-span-6">
                <FormLabel>Monto unitario</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Monto unitario del insumo"
                    value={field.value as number}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              <FormItem className="col-span-6">
                <FormLabel>Moneda</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value as string}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Currency).map((cur) => (
                      <SelectItem key={cur} value={cur}>
                        {cur}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <DateField
            className="col-span-12 sm:col-span-6"
            formControl={form.control}
          />

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>Proveedor <span className="text-xs text-muted-foreground">(Opcional)</span></FormLabel>
                <FormControl>
                  <Input placeholder="Nombre o alias del proveedor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>


      </form>
    </Form>
  );
}


export default FormFeedstock
