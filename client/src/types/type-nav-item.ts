import { HomeIcon as HomeIconActive } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/outline";

export type NavItem = {
  title: string;
  href: string;
  icon?: typeof HomeIcon;
  activeIcon?: typeof HomeIconActive;
};
