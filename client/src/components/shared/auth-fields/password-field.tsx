import { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { PasswordFieldProps } from "@/interfaces/interface-password-field-props";

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
        <FormItem className="max-w-xs">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id={name}
                type={seePassword ? "text" : "password"}
                placeholder={placeholder}
                className="py-5 bg-white text-black"
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
