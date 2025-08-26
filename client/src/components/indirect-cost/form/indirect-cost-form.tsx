import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataIndirectCost, indirectCostSchema } from "@/schemas/indirect-cost-schema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SpinLoader from "@/components/shared/spin-loader";
import DateField from "@/components/date-field";

// Predefined cost types (you can modify these as needed)
export const COST_TYPES = [
  "Electricidad",
  "Gas",
  "Agua",
  "Alquiler",
  "Seguros",
  "Mantenimiento",
  "Limpieza",
  "Seguridad",
  "Telefonía",
  "Internet",
  "Otros"
] as const;


interface IndirectCostFormFormProps {
  defaultValues: Partial<FormDataIndirectCost>;
  onSubmit: (values: FormDataIndirectCost) => Promise<void | boolean> | void;
  onClose?: () => Promise<void> | void;
  formId: string;
  isPending: boolean;
  submitingText: string;
  submitText: string;
  initialIsCustomType?: boolean
}


const IndirectCostForm = ({ defaultValues, onSubmit, formId, isPending, onClose, submitingText, submitText, initialIsCustomType = false }: IndirectCostFormFormProps) => {
  const [isCustomType, setIsCustomType] = useState(initialIsCustomType);

  const form = useForm<FormDataIndirectCost>({
    resolver: zodResolver(indirectCostSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(
    async (values: FormDataIndirectCost) => {
      const isSuccess = await onSubmit(values)
      if (isSuccess) {
        setIsCustomType(false)
        form.reset()
      }
    }
  )


  const handleCancel = () => {
    form.reset()
    setIsCustomType(false);
    onClose?.();
  }
  return (
    <div className="space-y-10">
      <Form {...form}>
        <form
          autoComplete="off"
          id={formId}
          onSubmit={handleSubmit}
          className="px-1.5 grid grid-cols-2 gap-x-2 gap-y-5"
        >

          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem className={isCustomType ? "col-span-1" : "col-span-2"}>
                <FormLabel>Tipo de costo indirecto</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setIsCustomType(value === "Otros");
                      // Clear custom type when switching away from "Otros"
                      if (value !== "Otros") {
                        form.setValue("customType", "");
                      }
                    }}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={isCustomType ? "Selecciona el tipo de costo indirecto" : "Selecciona tipo de costo"} />
                    </SelectTrigger>
                    <SelectContent>
                      {COST_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isCustomType && (
            <FormField
              name="customType"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Especificar tipo de costo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingresa otro costo"
                      {...field}
                      value={field.value || ""}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Ingresa el monto del costo"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? 0 : parseFloat(value));
                    }}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DateField formControl={form.control} />

        </form>
      </Form>

      <div className="grid grid-cols-2 gap-4 w-full">
        <Button
          type="button"
          disabled={isPending}
          variant="outline"
          onClick={handleCancel}
          className="rounded-xs cursor-pointer min-w-0"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          form={formId}
          disabled={isPending}
          className="rounded-xs cursor-pointer min-w-0"
        >
          {isPending && <SpinLoader isPending={isPending} />}
          {isPending ? submitingText : submitText}
        </Button>
      </div>
    </div>
  )
}

export default IndirectCostForm;
