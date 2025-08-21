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
  name?: Path<T>;
}

export function PasswordField<T extends { password: string } & FieldValues>({
  control,
  errors,
  name = "password" as Path<T>,
}: PasswordFieldProps<T>) {
  const [seePassword, setSeePassword] = useState(false);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="password" className="text-xl">Contraseña</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id="password"
                type={seePassword ? "text" : "password"}
                placeholder="Ingresá tu contraseña"
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
