import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";

interface DescriptionFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  className?: string;
}

export function DescriptionField<T extends FieldValues>({
  control,
  name = "description" as Path<T>,
  label = "Descripción",
  placeholder = "Descripción",
  optional = true,
  className = "col-span-12"
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
