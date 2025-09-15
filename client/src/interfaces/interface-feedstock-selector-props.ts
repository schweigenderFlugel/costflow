import { FormDataProduct } from "@/types/type-product";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";

export interface FeedstockSelectorProps {
  control: Control<FormDataProduct>;
  formRegister: UseFormRegister<FormDataProduct>;
  formErrors: FieldErrors<FormDataProduct>;
}
