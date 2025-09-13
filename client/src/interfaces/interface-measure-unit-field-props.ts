import { Control, FieldValues, Path } from "react-hook-form";

export interface MeasureUnitFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  placeholderDisabled?: string;
  availableUnits: string[];
  disabled?: boolean;
  className?: string;
}
