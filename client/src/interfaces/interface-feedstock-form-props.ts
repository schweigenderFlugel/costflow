import { FormDataFeedstock } from "@/types/type-feedstock";

export interface FeedstockFormProps {
  defaultValues: Partial<FormDataFeedstock>;
  onSubmit: (values: FormDataFeedstock) => Promise<void> | void;
  formId: string;
}
