import { FormDataProduct } from "@/schemas/product-schema";

export interface ProductFormProps {
  defaultValues: Partial<FormDataProduct>;
  onSubmit: (values: FormDataProduct) => Promise<void> | void;
  formId: string;
}
