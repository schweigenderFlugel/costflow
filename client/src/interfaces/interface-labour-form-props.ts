export interface LabourFormProps {
  onCancel: () => void;
  initialValues?: {
    salary: number | undefined;
    hours: number | undefined;
    date: Date;
  };
  isDisabled?: boolean;
  type?: "update" | "create";
}
