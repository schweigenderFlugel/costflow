import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface UnitCostFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  min?: number;
  step?: string;
}

export function UnitCostField<T extends FieldValues>({
  control,
  name = "unit_cost" as Path<T>,
  label = "Costo unitario",
  placeholder = "Costo unitario",
  min = 0,
  step = "0.01"
}: UnitCostFieldProps<T>) {
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
              min={min}
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
