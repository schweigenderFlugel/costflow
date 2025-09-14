import PageCalculator from "@/components/calculator/page-calculator";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata.calculator();

export default function Page() {
  return <PageCalculator />;
}
