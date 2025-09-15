import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextFieldProps } from "@/interfaces/interface-text-field-props";
import { FieldValues } from "react-hook-form";

export function TextField<T extends FieldValues>({
  name,
  label,
  type = "text",
  control,
  errors,
  className,
  placeholder,
}: TextFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              {...field}
              value={field.value ?? ""}
              className={className}
              placeholder={placeholder}
            />
          </FormControl>
          {errors?.[name] && (
            <p className="text-red-500 text-sm">
              {String(errors[name]?.message ?? "")}
            </p>
          )}
        </FormItem>
      )}
    />
  );
}
