import { FeedstockCalculation } from "@/types/feedstock-type";

export interface FeedstockTableProps {
  feedstocks: FeedstockCalculation[];
  setFeedstocks: React.Dispatch<React.SetStateAction<FeedstockCalculation[]>>;
  className?: string;
}
