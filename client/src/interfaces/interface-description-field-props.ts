import { Control, FieldValues, Path } from "react-hook-form";

export interface DescriptionFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  className?: string;
}
