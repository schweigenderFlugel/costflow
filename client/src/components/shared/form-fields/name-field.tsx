import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NameFieldProps } from "@/interfaces/interface-name-field-props";
import { FieldValues, Path } from "react-hook-form";

export function NameField<T extends FieldValues>({
  control,
  name = "name" as Path<T>,
  label = "Nombre",
  placeholder = "Nombre",
}: NameFieldProps<T>) {
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
