import { Control, FieldValues, Path } from "react-hook-form";

export interface CurrencyFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}
