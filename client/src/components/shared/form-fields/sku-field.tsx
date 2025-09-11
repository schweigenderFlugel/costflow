import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SkuFieldProps } from "@/interfaces/interface-sku-field-props";
import { FieldValues, Path } from "react-hook-form";

export function SkuField<T extends FieldValues>({
  control,
  name = "sku" as Path<T>,
  label = "SKU",
  placeholder = "Código referencial",
}: SkuFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
