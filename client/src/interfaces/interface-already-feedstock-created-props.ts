import { Feedstock } from "@/interfaces/interface-feedstock";
import { ObjFeedstock } from "@/interfaces/interface-obj-feedstock";

export interface AlreadyFeedstockCreatedProps {
  feedstock: ObjFeedstock | Feedstock | null;
  handleClose: () => void;
  handleReturn: () => void;
}
