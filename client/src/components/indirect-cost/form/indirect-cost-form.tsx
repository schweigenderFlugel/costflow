import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { indirectCostSchema } from "@/schemas/indirect-cost-schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SpinLoader from "@/components/shared/spin-loader";
import DateField from "@/components/shared/form-fields/date-field";
import { UnitCostField } from "@/components/shared/form-fields";
import { IndirectCostFormFormProps } from "@/interfaces/interface-indirect-cost-form-form-props";
import { FormDataIndirectCost } from "@/types/type-form-data-indirect-cost";

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
  "Otros",
] as const;

const IndirectCostForm = ({
  defaultValues,
  onSubmit,
  formId,
  isPending,
  onClose,
  submitingText,
  submitText,
  initialIsCustomType = false,
  errorMessage,
}: IndirectCostFormFormProps) => {
  const [isCustomType, setIsCustomType] = useState(initialIsCustomType);

  const form = useForm<FormDataIndirectCost>({
    resolver: zodResolver(indirectCostSchema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(
    async (values: FormDataIndirectCost) => {
      const isSuccess = await onSubmit(values);
      if (isSuccess) {
        setIsCustomType(false);
        form.reset();
      }
    }
  );

  const handleCancel = () => {
    form.reset();
    setIsCustomType(false);
    onClose?.();
  };
  return (
    <div className="space-y-12">
      <Form {...form}>
        <form
          autoComplete="off"
          id={formId}
          onSubmit={handleSubmit}
          className="px-1.5 flex flex-col gap-y-5 py-3"
        >
          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
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
                      <SelectValue
                        placeholder={
                          isCustomType
                            ? "Selecciona el tipo de costo indirecto"
                            : "Selecciona tipo de costo"
                        }
                      />
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

          <UnitCostField
            name="total_usage"
            control={form.control}
            placeholder="Ingrese el uso total"
            label="Uso total"
          />

          <DateField
            formControl={form.control}
            formatStr={"'Corresponde a' MMMM 'del año' yyyy"}
          />
        </form>
      </Form>
      {errorMessage && errorMessage}
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
  );
};

export default IndirectCostForm;
