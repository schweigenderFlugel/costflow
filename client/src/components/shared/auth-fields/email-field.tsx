import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

interface EmailFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
}

export function EmailField<T extends { email: string } & FieldValues>({
  control,
  errors,
}: EmailFieldProps<T>) {
  return (
    <FormField
      name={"email" as Path<T>}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Correo electrónico</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Ingresá tu correo electrónico"
              className="py-5 bg-white text-black "
              {...field}
            />
          </FormControl>
          {errors?.email && (
            <p className="text-red-500 text-sm">
              {String(errors.email?.message ?? "")}
            </p>
          )}
        </FormItem>
      )}
    />
  );
}
