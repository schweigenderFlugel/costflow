import { Control, FieldValues, Path } from "react-hook-form";

export interface SkuFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  showGenerateButton?: boolean;
  onGenerateSku?: () => string;
}
