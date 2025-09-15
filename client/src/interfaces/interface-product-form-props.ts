import { FormDataProduct } from "@/types/type-product";

export interface ProductFormProps {
  defaultValues: Partial<FormDataProduct>;
  onSubmit: (values: FormDataProduct) => Promise<void> | void;
  formId: string;
}
