import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  className?: string;
  placeholder?: string;
}
