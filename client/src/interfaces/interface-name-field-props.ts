import { Control, FieldValues, Path } from "react-hook-form";

export interface NameFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
}
