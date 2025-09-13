import { ReactNode } from "react";

export type PageHeaderSectionProps = {
  title: string;
  description: string;
  triggerInfo?: boolean;
  children?: ReactNode;
};
