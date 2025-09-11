import { FormDataFeedstock } from "@/schemas/feedstock-schema";

export interface FeedstockFormProps {
  defaultValues: Partial<FormDataFeedstock>;
  onSubmit: (values: FormDataFeedstock) => Promise<void> | void;
  formId: string;
}
