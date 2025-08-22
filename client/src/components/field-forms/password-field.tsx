import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // obligatorio
  label?: string; // opcional
  placeholder?: string;
}

export function PasswordField<T extends FieldValues>({
  control,
  errors,
  name,
  label = "Contraseña",
  placeholder = "Ingresá tu contraseña",
}: PasswordFieldProps<T>) {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name} className="text-xl">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id={name}
                type={seePassword ? "text" : "password"}
                placeholder={placeholder}
                className="placeholder:italic py-5 xl:py-6 bg-white text-black"
                {...field}
              />
              <button
                type="button"
                onClick={() => setSeePassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={
                  seePassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {seePassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
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
