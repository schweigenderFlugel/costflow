import { CubeIcon as CubeIconSolid } from "@heroicons/react/24/solid";
import { CubeIcon } from "@heroicons/react/24/outline";

export interface InfoCardInterface {
  iconBg: string;
  iconColor: string;
  Icon: typeof CubeIcon;
  SolidIcon: typeof CubeIconSolid;
}
