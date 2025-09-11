import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { FormDataProduct } from "@/schemas/product-schema";

export interface FeedstockSelectorProps {
  control: Control<FormDataProduct>;
  formRegister: UseFormRegister<FormDataProduct>;
  formErrors: FieldErrors<FormDataProduct>;
}
