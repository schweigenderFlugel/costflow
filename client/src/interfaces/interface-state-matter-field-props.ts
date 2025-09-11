import { StateMatter } from "@/types/measure/measure-unit";
import { Control, FieldValues, Path } from "react-hook-form";

export interface StateMatterFieldProps<T extends FieldValues> {
  control: Control<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  onStateChange?: (value: StateMatter) => void;
  disabled?: boolean;
}
