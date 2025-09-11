import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { FormDataProduct } from "@/schemas/product-schema";

export interface IndirectCostSelectorProps {
  control: Control<FormDataProduct>;
  formRegister: UseFormRegister<FormDataProduct>;
  formErrors: FieldErrors<FormDataProduct>;
}
