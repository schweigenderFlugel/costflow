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
import { MeasureUnit } from "@/types/items/feedstock";
import { productSchema, FormDataProduct } from "@/schemas/product-schema";
import { translateMeasureUnit } from "@/utils/translate/feedstock";
import { Textarea } from "@/components/ui/textarea";

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
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="product_feedstock"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>Insumo del producto ?</FormLabel>
                <FormControl>
                  <Input placeholder="Id del insumo?" {...field} />
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
                    placeholder="Cantidad del producto"
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
            name="subtotal"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Subtotal</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Subtotal del producto?"
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
            name="indirect_cost"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Costo indirecto?</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Costo indirecto del producto?"
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
            name="resale_percentage"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Porcentaje de reventa?</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Porcentaje de reventa del producto?"
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
            name="public_percentage"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Porcentaje público?</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Porcentaje público del producto?"
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
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Descripción <span className="text-xs text-muted-foreground">(Opcional)</span></FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción del producto" {...field} />
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


export default ProductForm
