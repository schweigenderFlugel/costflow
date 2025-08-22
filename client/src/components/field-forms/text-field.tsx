import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  className?: string;
  placeholder?: string;
}

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
