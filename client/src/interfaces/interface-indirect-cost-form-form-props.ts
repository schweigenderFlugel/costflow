import { FormDataIndirectCost } from "@/schemas/indirect-cost-schema";
import { ReactNode } from "react";

export interface IndirectCostFormFormProps {
  defaultValues: Partial<FormDataIndirectCost>;
  onSubmit: (values: FormDataIndirectCost) => Promise<void | boolean> | void;
  onClose?: () => Promise<void> | void;
  formId: string;
  isPending: boolean;
  submitingText: string;
  submitText: string;
  initialIsCustomType?: boolean;
  errorMessage?: ReactNode;
}
