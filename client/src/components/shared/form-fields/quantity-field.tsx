import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuantityFieldProps } from "@/interfaces/interface-quantity-field-props";
import { FieldValues, Path } from "react-hook-form";

export function QuantityField<T extends FieldValues>({
  control,
  name = "quantity" as Path<T>,
  label = "Cantidad",
  placeholder = "Cantidad",
  step = "1",
}: QuantityFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              step={step}
              placeholder={placeholder}
              value={field.value || ""}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
