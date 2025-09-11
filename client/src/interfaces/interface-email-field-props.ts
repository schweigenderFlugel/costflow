import { Control, FieldErrors, FieldValues } from "react-hook-form";

export interface EmailFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
}
