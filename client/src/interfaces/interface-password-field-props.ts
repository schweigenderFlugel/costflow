import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>; // obligatorio
  label?: string; // opcional
  placeholder?: string;
}
