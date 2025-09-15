import { FormDataProduct } from "@/types/type-product";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";

export interface IndirectCostSelectorProps {
  control: Control<FormDataProduct>;
  formRegister: UseFormRegister<FormDataProduct>;
  formErrors: FieldErrors<FormDataProduct>;
}
