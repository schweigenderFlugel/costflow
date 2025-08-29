import {
  HomeIcon as HomeIconActive,
  CubeIcon as CubeIconActive,
  BeakerIcon as BeakerIconActive,
  CalculatorIcon as CalculatorIconActive,
  Cog6ToothIcon as Cog6ToothIconActive
} from '@heroicons/react/24/solid'
import {
  HomeIcon,
  CubeIcon,
  BeakerIcon,
  CalculatorIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export type NavItem = {
  title: string;
  href: string;
  icon?: typeof HomeIcon;
  activeIcon?: typeof HomeIconActive;
};

export const websiteName: NavItem = {
  title: "cotzia",
  href: "/",
  icon: undefined,
};

export const mainNavigation: NavItem[] = [
  { title: "inicio", href: "/inicio", icon: HomeIcon, activeIcon: HomeIconActive },
  { title: "insumos", href: "/insumos", icon: CubeIcon, activeIcon: CubeIconActive },
  { title: "productos", href: "/productos", icon: BeakerIcon, activeIcon: BeakerIconActive },
  { title: "simulador", href: "/simulador", icon: CalculatorIcon, activeIcon: CalculatorIconActive },
  { title: "configuración", href: "/configuracion", icon: Cog6ToothIcon, activeIcon: Cog6ToothIconActive },
];
