import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { DescriptionFieldProps } from "@/interfaces/interface-description-field-props";
import { FieldValues, Path } from "react-hook-form";

export function DescriptionField<T extends FieldValues>({
  control,
  name = "description" as Path<T>,
  label = "Descripción",
  placeholder = "Descripción",
  optional = true,
  className = "col-span-12",
}: DescriptionFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {optional && (
              <span className="text-xs text-muted-foreground"> (Opcional)</span>
            )}
          </FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} className="py-3" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
